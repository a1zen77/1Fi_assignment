import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchProducts } from '../lib/api'
import { formatINR } from '../lib/format'
import ProductCardSkeleton from '../components/ProductCardSkeleton'

export default function HomePage() {
  const [products, setProducts] = useState([])
  const [status, setStatus] = useState('loading') // 'loading' | 'ready' | 'error'
  const [retryKey, setRetryKey] = useState(0)

  useEffect(() => {
    setStatus('loading')
    fetchProducts()
      .then((data) => {
        setProducts(data)
        setStatus('ready')
      })
      .catch(() => setStatus('error'))
  }, [retryKey])

  return (
    <div className="px-4 sm:px-6 py-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-8 max-w-5xl mx-auto">Shop on EMI</h1>

      {status === 'error' ? (
        <div className="max-w-5xl mx-auto flex flex-col items-center gap-3 text-center text-red-500 py-16">
          <p>Couldn't load products. Is the backend running?</p>
          <button
            onClick={() => setRetryKey((k) => k + 1)}
            className="px-4 py-2 rounded-lg border border-red-300 text-red-600 hover:bg-red-50 transition-colors"
          >
            Try again
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {status === 'loading'
            ? Array.from({ length: 3 }).map((_, i) => <ProductCardSkeleton key={i} />)
            : products.map((product) => (
                <Link
                  key={product.id}
                  to={`/products/${product.slug}`}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow focus:outline-none focus:ring-2 focus:ring-gray-400"
                >
                  <img
                    src={product.defaultVariant.image_url}
                    alt={product.name}
                    className="w-full aspect-square object-cover rounded-xl mb-4 bg-gray-100"
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
      )}
    </div>
  )
}