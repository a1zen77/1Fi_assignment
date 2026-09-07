import { useEffect, useState } from 'react'
import { useParams, useSearchParams, Link } from 'react-router-dom'
import { fetchProductBySlug } from '../lib/api'
import { formatINR } from '../lib/format'
import VariantSwatch from '../components/VariantSwatch'
import EmiPlanOption from '../components/EmiPlanOption'
import ProductPageSkeleton from '../components/ProductPageSkeleton'

export default function ProductPage() {
  const { slug } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()

  const [product, setProduct] = useState(null)
  const [status, setStatus] = useState('loading') // 'loading' | 'ready' | 'not-found' | 'error'
  const [selectedPlanId, setSelectedPlanId] = useState(null)
  const [confirmation, setConfirmation] = useState(null)
  const [retryKey, setRetryKey] = useState(0)

  useEffect(() => {
    setStatus('loading')
    setProduct(null)
    setConfirmation(null)

    fetchProductBySlug(slug)
      .then((data) => {
        if (!data) {
          setStatus('not-found')
          return
        }
        data.product_variants.forEach((v) => {
          v.emi_plans.sort((a, b) => a.tenure_months - b.tenure_months)
        })
        setProduct(data)
        setStatus('ready')
      })
      .catch(() => setStatus('error'))
  }, [slug, retryKey])

  if (status === 'loading') {
    return (
      <div className="px-4 py-10">
        <ProductPageSkeleton />
      </div>
    )
  }

  if (status === 'not-found') {
    return (
      <div className="flex flex-col items-center justify-center gap-3 text-center text-gray-600 py-24 px-4">
        <p className="text-lg font-medium">We couldn't find that product.</p>
        <Link to="/" className="px-4 py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-800 transition-colors">
          Back to all products
        </Link>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="flex flex-col items-center justify-center gap-3 text-center text-red-500 py-24 px-4">
        <p>Something went wrong loading this product. Is the backend running?</p>
        <button
          onClick={() => setRetryKey((k) => k + 1)}
          className="px-4 py-2 rounded-lg border border-red-300 text-red-600 hover:bg-red-50 transition-colors"
        >
          Try again
        </button>
      </div>
    )
  }

  const variantIdFromUrl = searchParams.get('variant')
  const selectedVariant =
    product.product_variants.find((v) => v.id === variantIdFromUrl) ||
    product.product_variants.find((v) => v.is_default) ||
    product.product_variants[0]

  const activePlanId = selectedPlanId || selectedVariant.emi_plans[0].id

  function handleVariantSelect(variant) {
    setSearchParams({ variant: variant.id })
    setSelectedPlanId(variant.emi_plans[0].id)
    setConfirmation(null)
  }

  function handleProceed() {
    const plan = selectedVariant.emi_plans.find((p) => p.id === activePlanId)
    setConfirmation(
      `Proceeding with ${product.name} (${selectedVariant.variant_label}) at ${formatINR(plan.monthly_amount)} x ${plan.tenure_months} months.`
    )
  }

  return (
    <div className="px-4 sm:px-6 py-10">
      <div className="max-w-4xl mx-auto mb-4">
        <Link to="/" className="text-sm text-gray-500 hover:text-gray-800 transition-colors">
          ← All products
        </Link>
      </div>
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: product card */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <p className="text-xs font-semibold text-red-500 tracking-wide">NEW</p>
          <h1 className="text-2xl font-bold text-gray-900 mt-1">{product.name}</h1>
          <p className="text-gray-500">{selectedVariant.storage}</p>

          <img
            src={selectedVariant.image_url}
            alt={`${product.name} — ${selectedVariant.variant_label}`}
            className="w-full aspect-square object-cover rounded-xl my-6 bg-gray-100"
          />

          <p className="text-sm text-gray-500 mb-2">
            Available in {product.product_variants.length} finishes
          </p>
          <div className="flex gap-3">
            {product.product_variants.map((variant) => (
              <VariantSwatch
                key={variant.id}
                variant={variant}
                isSelected={variant.id === selectedVariant.id}
                onSelect={handleVariantSelect}
              />
            ))}
          </div>
        </div>

        {/* Right: pricing + EMI plans */}
        <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col">
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-gray-900">{formatINR(selectedVariant.price)}</span>
            <span className="text-lg text-gray-400 line-through">{formatINR(selectedVariant.mrp)}</span>
          </div>
          <p className="text-gray-500 mt-1 mb-5">EMI plans backed by mutual funds</p>

          <div className="flex flex-col gap-3 md:max-h-[420px] md:overflow-y-auto pr-1">
            {selectedVariant.emi_plans.map((plan) => (
              <EmiPlanOption
                key={plan.id}
                plan={plan}
                isSelected={plan.id === activePlanId}
                onSelect={setSelectedPlanId}
              />
            ))}
          </div>

          <button
            onClick={handleProceed}
            className="mt-6 w-full bg-gray-900 text-white font-semibold py-3 rounded-xl hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
          >
            Proceed with selected plan
          </button>

          {confirmation && (
            <p className="mt-3 text-sm text-green-600 text-center" role="status">{confirmation}</p>
          )}
        </div>
      </div>
    </div>
  )
}