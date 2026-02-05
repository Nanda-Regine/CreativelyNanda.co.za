export default function ProjectsLoading() {
  return (
    <div className="min-h-screen bg-beige py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header skeleton */}
        <div className="mb-16">
          <div className="h-12 w-64 bg-navy/10 rounded skeleton mb-4" />
          <div className="h-4 w-96 bg-navy/10 rounded skeleton" />
        </div>

        {/* Projects grid skeleton */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-soft">
              <div className="h-48 bg-navy/10 skeleton" />
              <div className="p-6 space-y-3">
                <div className="h-6 w-3/4 bg-navy/10 rounded skeleton" />
                <div className="h-4 w-full bg-navy/10 rounded skeleton" />
                <div className="h-4 w-2/3 bg-navy/10 rounded skeleton" />
                <div className="flex gap-2 pt-2">
                  <div className="h-6 w-16 bg-navy/10 rounded-full skeleton" />
                  <div className="h-6 w-20 bg-navy/10 rounded-full skeleton" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
