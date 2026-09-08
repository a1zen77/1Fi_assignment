export default function ProductPageSkeleton() {
  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 animate-pulse">
      <div className="bg-panel rounded-lg border border-line p-6">
        <div className="h-3 w-10 bg-line rounded mb-3" />
        <div className="h-7 w-48 bg-line rounded mb-2" />
        <div className="h-4 w-16 bg-line rounded mb-6" />
        <div className="w-full aspect-square bg-line rounded-md mb-6" />
        <div className="flex gap-3">
          <div className="w-9 h-9 rounded-full bg-line" />
          <div className="w-9 h-9 rounded-full bg-line" />
          <div className="w-9 h-9 rounded-full bg-line" />
        </div>
      </div>
      <div className="bg-panel rounded-lg border border-line p-6">
        <div className="h-8 w-36 bg-line rounded mb-2" />
        <div className="h-4 w-52 bg-line rounded mb-6" />
        <div className="flex flex-col gap-0 divide-y divide-line">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-16 bg-line/40 my-1 rounded" />
          ))}
        </div>
      </div>
    </div>
  )
}