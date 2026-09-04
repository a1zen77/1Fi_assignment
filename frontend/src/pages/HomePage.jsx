import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchProducts } from '../lib/api'
import { formatINR } from '../lib/format'

export default function HomePage() {
  const [products, setProducts] = useState([])
  const [status, setStatus] = useState('loading') // 'loading' | 'ready' | 'error'

  useEffect(() => {
    fetchProducts()
      .then((data) => {
        setProducts(data)
        setStatus('ready')
      })
      .catch(() => setStatus('error'))
  }, [])

  if (status === 'loading') {
    return <div className="min-h-screen flex items-center justify-center text-gray-500">Loading products…</div>
  }

  if (status === 'error') {
    return <div className="min-h-screen flex items-center justify-center text-red-500">Couldn't load products. Is the backend running?</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">Shop on EMI</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {products.map((product) => (
          <Link
            key={product.id}
            to={`/products/${product.slug}`}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow"
          >
            <img
              src={product.defaultVariant.image_url}
              alt={product.name}
              className="w-full aspect-square object-cover rounded-xl mb-4"
            />
            <p className="text-xs text-gray-400 uppercase">{product.brand}</p>
            <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-bold text-gray-900">{formatINR(product.defaultVariant.price)}</span>
              <span className="text-sm text-gray-400 line-through">{formatINR(product.defaultVariant.mrp)}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}