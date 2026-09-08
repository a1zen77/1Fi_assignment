import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchProducts } from '../lib/api'
import { formatINR } from '../lib/format'
import ProductCardSkeleton from '../components/ProductCardSkeleton'

export default function HomePage() {
  const [products, setProducts] = useState([])
  const [status, setStatus] = useState('loading')
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
      <div className="max-w-5xl mx-auto mb-8">
        <h1 className="text-2xl font-bold text-ink">Shop on EMI</h1>
        <p className="text-ink/60 mt-1">Pick a phone, pick a plan, pay a little every month.</p>
      </div>

      {status === 'error' ? (
        <div className="max-w-5xl mx-auto flex flex-col items-center gap-3 text-center py-16">
          <p className="text-ink/70">Couldn't load products. Is the backend running?</p>
          <button
            onClick={() => setRetryKey((k) => k + 1)}
            className="px-4 py-2 rounded-md border border-line text-ink hover:border-ink/40 transition-colors"
          >
            Try again
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {status === 'loading'
            ? Array.from({ length: 3 }).map((_, i) => <ProductCardSkeleton key={i} />)
            : products.map((product) => {
                const savings = product.defaultVariant.mrp - product.defaultVariant.price
                return (
                  <Link
                    key={product.id}
                    to={`/products/${product.slug}`}
                    className="bg-panel rounded-lg border border-line p-5 hover:border-ink/30 transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    <img
                      src={product.defaultVariant.image_url}
                      alt={product.name}
                      className="w-full aspect-square object-cover rounded-md mb-4 bg-paper"
                    />
                    <p className="text-sm text-ink/50">{product.brand}</p>
                    <h2 className="text-lg font-semibold text-ink">{product.name}</h2>
                    <div className="mt-2 flex items-baseline gap-2 tabular">
                      <span className="font-bold text-ink">{formatINR(product.defaultVariant.price)}</span>
                      <span className="text-sm text-ink/40 line-through">{formatINR(product.defaultVariant.mrp)}</span>
                    </div>
                    {savings > 0 && (
                      <span className="inline-block mt-2 text-xs font-medium text-accent bg-accent-soft px-2 py-0.5 rounded-full">
                        Save {formatINR(savings)}
                      </span>
                    )}
                  </Link>
                )
              })}
        </div>
      )}
    </div>
  )
}