import express from 'express'
import { supabase } from '../lib/supabaseClient.js'

const router = express.Router()

// GET /api/products — lightweight list for a browse/home page
router.get('/', async (req, res) => {
  const { data, error } = await supabase
    .from('products')
    .select(`
      id, slug, name, brand, description,
      product_variants ( variant_label, price, mrp, image_url, is_default )
    `)
    .order('created_at', { ascending: true })

  if (error) {
    console.error(error)
    return res.status(500).json({ error: 'Failed to fetch products' })
  }

  // Trim each product down to its default (or first) variant for the card view
  const products = data.map((product) => {
    const { product_variants, ...rest } = product
    const defaultVariant =
      product_variants.find((v) => v.is_default) || product_variants[0]
    return { ...rest, defaultVariant }
  })

  res.json(products)
})

// GET /api/products/:slug — full detail: all variants, each with its EMI plans
router.get('/:slug', async (req, res) => {
  const { slug } = req.params

  const { data, error } = await supabase
    .from('products')
    .select(`
      id, slug, name, brand, description,
      product_variants (
        id, variant_label, color, storage, mrp, price, image_url, is_default,
        emi_plans ( id, tenure_months, monthly_amount, interest_rate, cashback_amount )
      )
    `)
    .eq('slug', slug)
    .order('tenure_months', { referencedTable: 'product_variants.emi_plans', ascending: true })
    .single()

  if (error) {
    if (error.code === 'PGRST116') {
      // Supabase's "no rows found" code for .single()
      return res.status(404).json({ error: 'Product not found' })
    }
    console.error(error)
    return res.status(500).json({ error: 'Failed to fetch product' })
  }

  res.json(data)
})

export default router