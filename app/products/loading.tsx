export default function ProductsLoading() {
  return (
    <div className="min-h-screen bg-beige py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Heading skeleton */}
        <div className="mb-12">
          <div className="h-12 w-64 bg-navy/10 rounded-xl skeleton mb-4" />
          <div className="h-5 w-96 bg-navy/10 rounded skeleton" />
        </div>

        {/* Product grid skeleton */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-2xl overflow-hidden bg-white shadow-sm">
              <div className="aspect-[4/3] bg-navy/10 skeleton" />
              <div className="p-6 space-y-3">
                <div className="h-6 w-3/4 bg-navy/10 rounded skeleton" />
                <div className="h-4 w-full bg-navy/10 rounded skeleton" />
                <div className="h-4 w-5/6 bg-navy/10 rounded skeleton" />
                <div className="flex items-center justify-between pt-2">
                  <div className="h-7 w-20 bg-cherry/20 rounded skeleton" />
                  <div className="h-10 w-28 bg-navy/10 rounded-lg skeleton" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
