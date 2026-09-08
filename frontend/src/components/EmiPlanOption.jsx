import { formatINR } from '../lib/format'

export default function EmiPlanOption({ plan, isSelected, onSelect }) {
  const isZeroInterest = plan.interest_rate === 0
  return (
    <label
      className={`flex items-center justify-between gap-4 py-4 px-3 cursor-pointer transition-colors border-l-4 ${
        isSelected ? 'border-accent bg-accent-soft/40' : 'border-transparent hover:bg-paper'
      }`}
    >
      <div className="flex items-center gap-3">
        <input
          type="radio"
          name="emi-plan"
          checked={isSelected}
          onChange={() => onSelect(plan.id)}
          className="w-4 h-4 accent-accent"
        />
        <div>
          <p className="font-semibold text-ink tabular">
            {formatINR(plan.monthly_amount)} <span className="font-normal text-ink/60">x {plan.tenure_months} months</span>
          </p>
          {plan.cashback_amount > 0 && (
            <p className="text-sm text-accent mt-0.5">
              Additional cashback of {formatINR(plan.cashback_amount)}
            </p>
          )}
        </div>
      </div>
      <span
        className={`text-xs font-medium whitespace-nowrap px-2 py-1 rounded-full ${
          isZeroInterest ? 'bg-accent-soft text-accent' : 'bg-flag-soft text-flag'
        }`}
      >
        {isZeroInterest ? '0% interest' : `${plan.interest_rate}% interest`}
      </span>
    </label>
  )
}