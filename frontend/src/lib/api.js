const BASE_URL = import.meta.env.VITE_API_BASE_URL

export async function fetchProducts() {
  const res = await fetch(`${BASE_URL}/api/products`)
  if (!res.ok) throw new Error('Failed to fetch products')
  return res.json()
}

export async function fetchProductBySlug(slug) {
  const res = await fetch(`${BASE_URL}/api/products/${slug}`)
  if (res.status === 404) return null
  if (!res.ok) throw new Error('Failed to fetch product')
  return res.json()
}