export default function ProductPageSkeleton() {
  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 animate-pulse">
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="h-3 w-10 bg-gray-200 rounded mb-3" />
        <div className="h-7 w-48 bg-gray-200 rounded mb-2" />
        <div className="h-4 w-16 bg-gray-200 rounded mb-6" />
        <div className="w-full aspect-square bg-gray-200 rounded-xl mb-6" />
        <div className="flex gap-3">
          <div className="w-9 h-9 rounded-full bg-gray-200" />
          <div className="w-9 h-9 rounded-full bg-gray-200" />
          <div className="w-9 h-9 rounded-full bg-gray-200" />
        </div>
      </div>
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="h-8 w-36 bg-gray-200 rounded mb-2" />
        <div className="h-4 w-52 bg-gray-200 rounded mb-6" />
        <div className="flex flex-col gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-16 bg-gray-200 rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  )
}