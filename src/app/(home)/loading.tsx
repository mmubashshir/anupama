export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl bg-white p-4 px-6">
      <div className="animate-pulse">
        {/* Header */}
        <header className="mb-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-6 w-6 bg-gray-200 dark:bg-gray-800" />
            <div className="space-y-1">
              <div className="h-4 w-24 bg-gray-200 dark:bg-gray-800" />
              <div className="h-3 w-20 bg-gray-200 dark:bg-gray-800" />
            </div>
          </div>
          <div className="-lg h-8 w-40 bg-gray-200 dark:bg-gray-800" />
          <div className="h-6 w-28" /> {/* Spacer */}
        </header>

        {/* Navigation */}
        <nav className="mb-6 border-y border-gray-200 py-3 dark:border-gray-800">
          <div className="flex items-center space-x-6">
            <div className="h-6 w-6 bg-gray-200 dark:bg-gray-800" />
            <div className="h-4 w-16 bg-gray-200 dark:bg-gray-800" />
            <div className="h-4 w-20 bg-gray-200 dark:bg-gray-800" />
            <div className="h-4 w-12 bg-gray-200 dark:bg-gray-800" />
            <div className="h-4 w-16 bg-gray-200 dark:bg-gray-800" />
            <div className="h-4 w-24 bg-gray-200 dark:bg-gray-800" />
          </div>
        </nav>

        <section className="mb-10 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Featured card – left, spans 2 columns on desktop */}
          <div className="lg:col-span-2">
            <div className="-lg aspect-[16/9] w-full bg-gray-200 dark:bg-gray-800" />
            <div className="mt-4 space-y-3">
              <div className="h-3 w-1/4 bg-gray-200 dark:bg-gray-800" />
              <div className="h-6 w-full bg-gray-200 dark:bg-gray-800" />
              <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-800" />
            </div>
          </div>

          {/* Magazine cover card – right column */}
          <div className="flex flex-col items-center">
            <div className="-lg h-96 w-full bg-gray-200 dark:bg-gray-800" />
            <div className="mt-3 h-5 w-4/5 bg-gray-200 dark:bg-gray-800" />
          </div>
        </section>

        {/* Page Title */}
        <div className="-lg mb-6 h-10 w-48 bg-gray-200 dark:bg-gray-800" />

        {/* Main Content */}
        <main className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Featured Article */}
          <div className="lg:col-span-2">
            <div className="-lg h-80 w-full bg-gray-200 dark:bg-gray-800" />
            <div className="mt-4 space-y-3">
              <div className="h-4 w-1/4 bg-gray-200 dark:bg-gray-800" />
              <div className="h-7 w-full bg-gray-200 dark:bg-gray-800" />
              <div className="h-7 w-3/4 bg-gray-200 dark:bg-gray-800" />
            </div>
          </div>

          {/* Sidebar */}
          <aside>
            <div className="mb-4 flex items-center justify-between">
              <div className="h-5 w-24 bg-gray-200 dark:bg-gray-800" />
              <div className="h-4 w-16 bg-gray-200 dark:bg-gray-800" />
            </div>
            <div className="space-y-5">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-start space-x-4">
                  <div className="flex-1 space-y-2">
                    <div className="h-3 w-1/3 bg-gray-200 dark:bg-gray-800" />
                    <div className="h-5 w-full bg-gray-200 dark:bg-gray-800" />
                    <div className="h-5 w-5/6 bg-gray-200 dark:bg-gray-800" />
                  </div>
                  <div className="-lg h-20 w-20 shrink-0 bg-gray-200 dark:bg-gray-800" />
                </div>
              ))}
            </div>
          </aside>
        </main>
      </div>
    </div>
  );
}
