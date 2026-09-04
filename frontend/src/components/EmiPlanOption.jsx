import { formatINR } from '../lib/format'

export default function EmiPlanOption({ plan, isSelected, onSelect }) {
  return (
    <label
      className={`flex items-center justify-between gap-4 rounded-xl border p-4 cursor-pointer transition-colors ${
        isSelected ? 'border-gray-800 bg-gray-50' : 'border-gray-200 hover:border-gray-300'
      }`}
    >
      <div className="flex items-center gap-3">
        <input
          type="radio"
          name="emi-plan"
          checked={isSelected}
          onChange={() => onSelect(plan.id)}
          className="w-4 h-4 accent-gray-800"
        />
        <div>
          <p className="font-semibold text-gray-900">
            {formatINR(plan.monthly_amount)} <span className="font-normal text-gray-500">x {plan.tenure_months} months</span>
          </p>
          {plan.cashback_amount > 0 && (
            <p className="text-sm text-green-600 mt-0.5">
              Additional cashback of {formatINR(plan.cashback_amount)}
            </p>
          )}
        </div>
      </div>
      <span className="text-sm text-gray-500 whitespace-nowrap">
        {plan.interest_rate > 0 ? `${plan.interest_rate}% interest` : '0% interest'}
      </span>
    </label>
  )
}