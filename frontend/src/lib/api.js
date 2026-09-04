const BASE_URL = import.meta.env.VITE_API_BASE_URL
const TIMEOUT_MS = 8000

async function fetchWithTimeout(url) {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS)
  try {
    return await fetch(url, { signal: controller.signal })
  } finally {
    clearTimeout(timeoutId)
  }
}

export async function fetchProducts() {
  const res = await fetchWithTimeout(`${BASE_URL}/api/products`)
  if (!res.ok) throw new Error('Failed to fetch products')
  return res.json()
}

export async function fetchProductBySlug(slug) {
  const res = await fetchWithTimeout(`${BASE_URL}/api/products/${slug}`)
  if (res.status === 404) return null
  if (!res.ok) throw new Error('Failed to fetch product')
  return res.json()
}