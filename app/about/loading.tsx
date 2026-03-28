export default function AboutLoading() {
  return (
    <div className="min-h-screen bg-beige">
      {/* Hero skeleton */}
      <div className="h-[60vh] bg-navy-deep/5 animate-pulse" />

      {/* Content skeleton */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Text skeleton */}
          <div className="space-y-4">
            <div className="h-8 w-48 bg-navy/10 rounded skeleton" />
            <div className="h-4 w-full bg-navy/10 rounded skeleton" />
            <div className="h-4 w-5/6 bg-navy/10 rounded skeleton" />
            <div className="h-4 w-4/6 bg-navy/10 rounded skeleton" />
          </div>

          {/* Image skeleton */}
          <div className="h-80 bg-navy/10 rounded-2xl skeleton" />
        </div>
      </div>
    </div>
  );
}
