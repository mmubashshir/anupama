export default function BlogPostSkeleton() {
  return (
    <div className="mx-auto max-w-6xl bg-white p-4 sm:px-6 lg:px-8">
      <div className="flex animate-pulse flex-col gap-8 lg:flex-row">
        <div className="w-full space-y-12 lg:w-2/3">
          <article className="pb-8">
            <div className="h-56 w-full bg-gray-200 sm:h-80 md:h-[400px]" />

            <div className="mt-6 space-y-3">
              <div className="h-7 w-5/6 bg-gray-200" />
              <div className="h-7 w-2/3 bg-gray-200" />
            </div>

            {/* Meta */}
            <div className="mt-4 flex flex-wrap gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-4 w-24 bg-gray-200" />
              ))}
            </div>

            {/* Body */}
            <div className="mt-6 space-y-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className={`h-4 bg-gray-200 ${i % 3 === 2 ? 'w-5/6' : 'w-full'}`}
                />
              ))}
            </div>
          </article>

          <div className="h-6 w-1/4 bg-gray-200" />

          {/* Individual comments */}
          <div className="space-y-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="space-y-3 border-b border-gray-200 pb-4 last:border-b-0"
              >
                <div className="h-4 w-1/3 bg-gray-200" />
                <div className="h-4 w-full bg-gray-200" />
              </div>
            ))}
          </div>

          <div className="mt-10 space-y-4">
            <div className="h-6 w-1/3 bg-gray-200" />
            <div className="h-10 w-full bg-gray-200" />
            <div className="h-24 w-full bg-gray-200" />
            <div className="h-10 w-32 bg-gray-200" />
          </div>

          <div className="mt-16 flex flex-col justify-between gap-8 pt-8 md:flex-row">
            {/* Previous • left‑aligned */}
            <div className="flex w-full items-center md:w-1/2">
              <div className="grid h-22 w-22 place-items-center bg-gray-200" />
              <div className="ml-4 space-y-2">
                <div className="h-4 w-20 bg-gray-200" />
                <div className="h-5 w-48 bg-gray-200" />
              </div>
            </div>

            {/* Next • right‑aligned */}
            <div className="flex w-full items-center justify-end text-right md:w-1/2">
              <div className="mr-4 space-y-2">
                <div className="ml-auto h-4 w-20 bg-gray-200" />
                <div className="ml-auto h-5 w-48 bg-gray-200" />
              </div>
              <div className="grid h-22 w-22 place-items-center bg-gray-200" />
            </div>
          </div>
        </div>

        <div className="w-full space-y-8 lg:w-1/3">
          {/* Recent posts header */}
          <div className="h-6 w-1/3 bg-gray-200" />

          {/* Recent posts list */}
          <div className="space-y-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="h-16 w-20 shrink-0 bg-gray-200" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-3/4 bg-gray-200" />
                  <div className="h-4 w-1/2 bg-gray-200" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
