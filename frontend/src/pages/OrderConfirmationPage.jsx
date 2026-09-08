import { useEffect } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { formatINR } from '../lib/format'

export default function OrderConfirmationPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const order = location.state

  // Guards against someone landing here directly (refresh, bookmark, back button
  // after navigating away) with no order data to show.
  useEffect(() => {
    if (!order) {
      navigate('/', { replace: true })
    }
  }, [order, navigate])

  if (!order) return null

  const { productName, productImage, variantLabel, plan } = order
  const totalPayable = plan.monthlyAmount * plan.tenureMonths

  return (
    <div className="px-4 sm:px-6 py-10">
      <div className="max-w-md mx-auto bg-panel rounded-lg border border-line p-6">
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-12 h-12 rounded-full bg-accent-soft flex items-center justify-center mb-3">
            <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-ink">Plan confirmed</h1>
          <p className="text-ink/60 mt-1">Here's a summary of what you selected.</p>
        </div>

        <div className="flex items-center gap-4 pb-5 border-b border-line">
          <img src={productImage} alt={productName} className="w-16 h-16 object-cover rounded-md bg-paper" />
          <div>
            <p className="font-semibold text-ink">{productName}</p>
            <p className="text-sm text-ink/50">{variantLabel}</p>
          </div>
        </div>

        <div className="py-5 flex flex-col gap-3 tabular">
          <div className="flex justify-between text-sm">
            <span className="text-ink/60">Monthly payment</span>
            <span className="font-semibold text-ink">{formatINR(plan.monthlyAmount)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-ink/60">Tenure</span>
            <span className="text-ink">{plan.tenureMonths} months</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-ink/60">Interest rate</span>
            <span className="text-ink">{plan.interestRate}%</span>
          </div>
          {plan.cashbackAmount > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-ink/60">Cashback</span>
              <span className="text-accent">{formatINR(plan.cashbackAmount)}</span>
            </div>
          )}
          <div className="flex justify-between pt-3 border-t border-line">
            <span className="font-semibold text-ink">Total payable</span>
            <span className="font-bold text-ink">{formatINR(totalPayable)}</span>
          </div>
        </div>

        <Link
          to="/"
          className="mt-2 block text-center w-full bg-accent text-white font-semibold py-3 rounded-md hover:bg-accent-dark transition-colors"
        >
          Continue shopping
        </Link>
      </div>
    </div>
  )
}