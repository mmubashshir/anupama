export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl bg-white p-4 sm:px-6 lg:px-8">
      <div className="container mx-auto px-4 py-6">
        <div className="animate-pulse">
          {/* Header */}
          <header className="mb-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-6 w-6 rounded bg-gray-200 dark:bg-gray-800" />
              <div className="space-y-1">
                <div className="h-4 w-24 rounded bg-gray-200 dark:bg-gray-800" />
                <div className="h-3 w-20 rounded bg-gray-200 dark:bg-gray-800" />
              </div>
            </div>
            <div className="h-8 w-40 rounded-lg bg-gray-200 dark:bg-gray-800" />
            <div className="h-6 w-28" /> {/* Spacer */}
          </header>

          {/* Navigation */}
          <nav className="mb-6 border-y border-gray-200 py-3 dark:border-gray-800">
            <div className="flex items-center space-x-6">
              <div className="h-6 w-6 rounded bg-gray-200 dark:bg-gray-800" />
              <div className="h-4 w-16 rounded bg-gray-200 dark:bg-gray-800" />
              <div className="h-4 w-20 rounded bg-gray-200 dark:bg-gray-800" />
              <div className="h-4 w-12 rounded bg-gray-200 dark:bg-gray-800" />
              <div className="h-4 w-16 rounded bg-gray-200 dark:bg-gray-800" />
              <div className="h-4 w-24 rounded bg-gray-200 dark:bg-gray-800" />
            </div>
          </nav>

          <section className="mb-10 grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Featured card – left, spans 2 columns on desktop */}
            <div className="lg:col-span-2">
              <div className="aspect-[16/9] w-full rounded-lg bg-gray-200 dark:bg-gray-800" />
              <div className="mt-4 space-y-3">
                <div className="h-3 w-1/4 rounded bg-gray-200 dark:bg-gray-800" />
                <div className="h-6 w-full rounded bg-gray-200 dark:bg-gray-800" />
                <div className="h-6 w-3/4 rounded bg-gray-200 dark:bg-gray-800" />
              </div>
            </div>

            {/* Magazine cover card – right column */}
            <div className="flex flex-col items-center">
              <div className="h-96 w-full rounded-lg bg-gray-200 dark:bg-gray-800" />
              <div className="mt-3 h-5 w-4/5 rounded bg-gray-200 dark:bg-gray-800" />
            </div>
          </section>

          {/* Page Title */}
          <div className="mb-6 h-10 w-48 rounded-lg bg-gray-200 dark:bg-gray-800" />

          {/* Main Content */}
          <main className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Featured Article */}
            <div className="lg:col-span-2">
              <div className="h-80 w-full rounded-lg bg-gray-200 dark:bg-gray-800" />
              <div className="mt-4 space-y-3">
                <div className="h-4 w-1/4 rounded bg-gray-200 dark:bg-gray-800" />
                <div className="h-7 w-full rounded bg-gray-200 dark:bg-gray-800" />
                <div className="h-7 w-3/4 rounded bg-gray-200 dark:bg-gray-800" />
              </div>
            </div>

            {/* Sidebar */}
            <aside>
              <div className="mb-4 flex items-center justify-between">
                <div className="h-5 w-24 rounded bg-gray-200 dark:bg-gray-800" />
                <div className="h-4 w-16 rounded bg-gray-200 dark:bg-gray-800" />
              </div>
              <div className="space-y-5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-start space-x-4">
                    <div className="flex-1 space-y-2">
                      <div className="h-3 w-1/3 rounded bg-gray-200 dark:bg-gray-800" />
                      <div className="h-5 w-full rounded bg-gray-200 dark:bg-gray-800" />
                      <div className="h-5 w-5/6 rounded bg-gray-200 dark:bg-gray-800" />
                    </div>
                    <div className="h-20 w-20 shrink-0 rounded-lg bg-gray-200 dark:bg-gray-800" />
                  </div>
                ))}
              </div>
            </aside>
          </main>
        </div>
      </div>
    </div>
  );
}
