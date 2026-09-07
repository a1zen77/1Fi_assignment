import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'

dotenv.config()

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const BUCKET = 'product-images'
const IMAGES_DIR = path.resolve('assets/images')

// Maps a local file to the product (by slug) + variant (by color) it belongs to
const MANIFEST = [
  { file: 'iphone-17-pro-cosmic-orange.jpg',     slug: 'iphone-17-pro',     color: 'Cosmic Orange' },
  { file: 'iphone-17-pro-silver.jpg',            slug: 'iphone-17-pro',     color: 'Silver' },
  { file: 'iphone-17-pro-deep-blue.jpg',         slug: 'iphone-17-pro',     color: 'Deep Blue' },
  { file: 'galaxy-s24-ultra-titanium-black.jpg', slug: 'galaxy-s24-ultra', color: 'Titanium Black' },
  { file: 'galaxy-s24-ultra-titanium-gray.jpg',  slug: 'galaxy-s24-ultra', color: 'Titanium Gray' },
  { file: 'pixel-9-pro-obsidian.jpg',            slug: 'pixel-9-pro',      color: 'Obsidian' },
  { file: 'pixel-9-pro-porcelain.jpg',           slug: 'pixel-9-pro',      color: 'Porcelain' },
]

async function uploadAndLink({ file, slug, color }) {
  const localPath = path.join(IMAGES_DIR, file)
  if (!fs.existsSync(localPath)) {
    console.warn(`Skipping missing file: ${file}`)
    return
  }

  const fileBuffer = fs.readFileSync(localPath)
  const storagePath = `${slug}/${file}`

  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(storagePath, fileBuffer, {
      contentType: `image/${path.extname(file).slice(1)}`,
      upsert: true, // re-running the script overwrites rather than erroring
    })
  if (uploadError) throw uploadError

  const { data: publicUrlData } = supabase.storage.from(BUCKET).getPublicUrl(storagePath)
  const publicUrl = publicUrlData.publicUrl

  const { data: product, error: productError } = await supabase
    .from('products')
    .select('id')
    .eq('slug', slug)
    .single()
  if (productError) throw productError

  const { error: updateError } = await supabase
    .from('product_variants')
    .update({ image_url: publicUrl })
    .eq('product_id', product.id)
    .eq('color', color)
  if (updateError) throw updateError

  console.log(`Linked ${file} -> ${slug} / ${color}`)
}

async function run() {
  for (const entry of MANIFEST) {
    await uploadAndLink(entry)
  }
}

run()
  .then(() => {
    console.log('Image upload + linking complete.')
    process.exit(0)
  })
  .catch((err) => {
    console.error('Failed:', err)
    process.exit(1)
  })