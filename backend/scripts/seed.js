import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
dotenv.config()

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const EMI_TENURES = [
  { months: 3,  rate: 0 },
  { months: 6,  rate: 0 },
  { months: 12, rate: 0 },
  { months: 24, rate: 0 },
  { months: 36, rate: 10.5 },
  { months: 48, rate: 10.5 },
  { months: 60, rate: 10.5 },
]

function buildEmiPlans(price) {
  return EMI_TENURES.map(({ months, rate }) => {
    const totalPayable = rate === 0
      ? price
      : price * (1 + (rate / 100) * (months / 12))
    return {
      tenure_months: months,
      monthly_amount: Math.round(totalPayable / months),
      interest_rate: rate,
      cashback_amount: 7500,
    }
  })
}

// Using placeholder images for now (avoids hotlinking real product photography) —
// swap these for real image URLs later.
const placeholder = (label) =>
  `https://placehold.co/600x600/f5f5f5/333333/png?text=${encodeURIComponent(label)}`

const PRODUCTS = [
  {
    slug: 'iphone-17-pro',
    name: 'iPhone 17 Pro',
    brand: 'Apple',
    description: 'Apple iPhone 17 Pro with A19 Pro chip and titanium design.',
    variants: [
      { variant_label: '256GB · Cosmic Orange', color: 'Cosmic Orange', storage: '256GB', mrp: 134900, price: 127400, image_url: placeholder('iPhone 17 Pro Orange'), is_default: true },
      { variant_label: '256GB · Silver',         color: 'Silver',        storage: '256GB', mrp: 134900, price: 127400, image_url: placeholder('iPhone 17 Pro Silver') },
      { variant_label: '256GB · Deep Blue',       color: 'Deep Blue',     storage: '256GB', mrp: 134900, price: 127400, image_url: placeholder('iPhone 17 Pro Blue') },
    ],
  },
  {
    slug: 'galaxy-s24-ultra',
    name: 'Samsung Galaxy S24 Ultra',
    brand: 'Samsung',
    description: 'Samsung Galaxy S24 Ultra with Snapdragon 8 Gen 3 and S Pen.',
    variants: [
      { variant_label: '256GB · Titanium Black', color: 'Titanium Black', storage: '256GB', mrp: 129999, price: 119999, image_url: placeholder('Galaxy S24 Ultra Black'), is_default: true },
      { variant_label: '512GB · Titanium Gray',  color: 'Titanium Gray',  storage: '512GB', mrp: 144999, price: 134999, image_url: placeholder('Galaxy S24 Ultra Gray') },
    ],
  },
  {
    slug: 'pixel-9-pro',
    name: 'Google Pixel 9 Pro',
    brand: 'Google',
    description: 'Google Pixel 9 Pro with Tensor G4 and the best of Google AI.',
    variants: [
      { variant_label: '128GB · Obsidian',  color: 'Obsidian',  storage: '128GB', mrp: 99999,  price: 91999, image_url: placeholder('Pixel 9 Pro Obsidian'), is_default: true },
      { variant_label: '256GB · Porcelain', color: 'Porcelain', storage: '256GB', mrp: 109999, price: 99999, image_url: placeholder('Pixel 9 Pro Porcelain') },
    ],
  },
]

async function seed() {
  for (const product of PRODUCTS) {
    const { variants, ...productFields } = product

    const { data: productRow, error: productError } = await supabase
      .from('products')
      .insert(productFields)
      .select()
      .single()
    if (productError) throw productError

    for (const variant of variants) {
      const { data: variantRow, error: variantError } = await supabase
        .from('product_variants')
        .insert({ product_id: productRow.id, ...variant })
        .select()
        .single()
      if (variantError) throw variantError

      const plans = buildEmiPlans(variant.price).map((p) => ({
        ...p,
        variant_id: variantRow.id,
      }))
      const { error: plansError } = await supabase.from('emi_plans').insert(plans)
      if (plansError) throw plansError
    }

    console.log(`Seeded: ${product.name}`)
  }
}

seed()
  .then(() => {
    console.log('Seeding complete.')
    process.exit(0)
  })
  .catch((err) => {
    console.error('Seeding failed:', err)
    process.exit(1)
  })