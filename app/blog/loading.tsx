export default function BlogLoading() {
  return (
    <div className="min-h-screen bg-navy py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Heading skeleton */}
        <div className="mb-12">
          <div className="h-16 w-48 bg-beige/10 rounded-xl skeleton mb-4" />
          <div className="h-5 w-80 bg-beige/10 rounded skeleton" />
        </div>

        {/* Category tabs skeleton */}
        <div className="flex gap-3 mb-10">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-10 w-24 bg-beige/10 rounded-full skeleton" />
          ))}
        </div>

        {/* Articles grid skeleton */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-2xl overflow-hidden bg-white/5">
              <div className="aspect-video bg-beige/10 skeleton" />
              <div className="p-6 space-y-3">
                <div className="h-5 w-1/3 bg-cherry/20 rounded skeleton" />
                <div className="h-6 w-full bg-beige/10 rounded skeleton" />
                <div className="h-4 w-5/6 bg-beige/10 rounded skeleton" />
                <div className="h-4 w-4/6 bg-beige/10 rounded skeleton" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
