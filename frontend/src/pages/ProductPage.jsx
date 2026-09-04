import { useParams } from 'react-router-dom'

export default function ProductPage() {
  const { slug } = useParams()
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-500">Product page for: <span className="font-mono">{slug}</span></p>
    </div>
  )
}