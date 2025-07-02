/* app/[category]/loading.tsx */
export default function CategoryListingSkeleton() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-20 md:py-16">
      <div className="flex animate-pulse flex-col gap-8 lg:flex-row">
        <div className="flex w-full flex-col gap-12 lg:w-2/3">
          {[...Array<number>(3)].map((_, i) => (
            <div key={i} className="flex flex-col">
              {/* Featured image */}
              <div className="h-56 w-full rounded-lg bg-gray-200 sm:h-72 md:h-80" />

              <div className="mt-6 h-7 w-5/6 rounded-md bg-gray-200" />

              <div className="mt-4 flex flex-wrap gap-6">
                {[...Array<number>(2)].map((__, j) => (
                  <div key={j} className="h-4 w-24 rounded-md bg-gray-200" />
                ))}
              </div>

              <div className="mt-6 space-y-3">
                {[...Array<number>(5)].map((__, k) => (
                  <div
                    key={k}
                    className={`h-4 rounded-md bg-gray-200 ${
                      k % 2 ? 'w-5/6' : 'w-full'
                    }`}
                  />
                ))}
              </div>

              {/* “Read more” button */}
              <div className="mt-4 h-10 w-40 rounded-md bg-gray-200" />

              {/* Divider between posts */}
              {i !== 2 && <div className="mt-12 border-b border-gray-200" />}
            </div>
          ))}

          {/* Pagination placeholders */}
          <div className="mt-8 flex justify-center gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-10 w-10 rounded-md bg-gray-200" />
            ))}
          </div>
        </div>

        <div className="w-full space-y-8 lg:w-1/3">
          {/* Sidebar header */}
          <div className="h-6 w-1/3 rounded-md bg-gray-200" />

          {/* Recent‑post cards (three) */}
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="h-16 w-20 shrink-0 rounded-md bg-gray-200" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-3/4 rounded-md bg-gray-200" />
                <div className="h-4 w-1/2 rounded-md bg-gray-200" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
