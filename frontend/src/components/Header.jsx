import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="bg-panel border-b border-line sticky top-0 z-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-baseline gap-2">
        <Link to="/" className="text-lg font-bold text-ink">
          Shop on EMI
        </Link>
        <span className="text-sm text-ink/50 hidden sm:inline">
          plans backed by mutual funds
        </span>
      </div>
    </header>
  )
}