import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4">
        <Link to="/" className="text-lg font-bold text-gray-900">
          Shop on EMI
        </Link>
      </div>
    </header>
  )
}