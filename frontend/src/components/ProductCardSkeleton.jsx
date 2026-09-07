export default function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 animate-pulse">
      <div className="w-full aspect-square rounded-xl bg-gray-200 mb-4" />
      <div className="h-3 w-16 bg-gray-200 rounded mb-2" />
      <div className="h-5 w-40 bg-gray-200 rounded mb-3" />
      <div className="h-5 w-28 bg-gray-200 rounded" />
    </div>
  )
}