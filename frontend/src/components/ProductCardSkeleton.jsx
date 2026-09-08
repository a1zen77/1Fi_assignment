export default function ProductCardSkeleton() {
  return (
    <div className="bg-panel rounded-lg border border-line p-5 animate-pulse">
      <div className="w-full aspect-square rounded-md bg-line mb-4" />
      <div className="h-3 w-16 bg-line rounded mb-2" />
      <div className="h-5 w-40 bg-line rounded mb-3" />
      <div className="h-5 w-28 bg-line rounded" />
    </div>
  )
}