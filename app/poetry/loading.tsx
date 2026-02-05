export default function PoetryLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#8B4513]/10 to-beige">
      {/* Hero skeleton */}
      <div className="h-[70vh] bg-[#8B4513]/5 flex items-center justify-center">
        <div className="text-center">
          <div className="h-16 w-80 bg-[#8B4513]/10 rounded mx-auto skeleton mb-4" />
          <div className="h-6 w-64 bg-[#8B4513]/10 rounded mx-auto skeleton" />
        </div>
      </div>

      {/* Book showcase skeleton */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Book image skeleton */}
          <div className="h-96 bg-[#8B4513]/10 rounded-2xl skeleton" />

          {/* Book info skeleton */}
          <div className="space-y-6">
            <div className="h-10 w-64 bg-[#8B4513]/10 rounded skeleton" />
            <div className="space-y-2">
              <div className="h-4 w-full bg-[#8B4513]/10 rounded skeleton" />
              <div className="h-4 w-5/6 bg-[#8B4513]/10 rounded skeleton" />
              <div className="h-4 w-4/6 bg-[#8B4513]/10 rounded skeleton" />
            </div>
            <div className="h-12 w-48 bg-cherry/20 rounded-full skeleton" />
          </div>
        </div>
      </div>

      {/* Reviews skeleton */}
      <div className="py-16 bg-white/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="h-10 w-48 bg-navy/10 rounded skeleton mb-8" />
          <div className="flex gap-8 overflow-hidden">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex-shrink-0 w-80">
                <div className="h-64 bg-navy/10 rounded-2xl skeleton mb-4" />
                <div className="h-4 w-3/4 bg-navy/10 rounded skeleton" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
