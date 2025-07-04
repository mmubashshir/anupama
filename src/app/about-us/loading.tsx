// app/<route>/loading.tsx
export default function Loading() {
  return (
    <div className="animate-pulse">
      {/* ───────────────────── Navbar skeleton ───────────────────── */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="h-6 w-24 rounded bg-gray-300" /> {/* logo */}
          <div className="flex gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-4 w-16 rounded bg-gray-300" />
            ))}
          </div>
        </div>
      </header>

      {/* ───────────────────── “About us” section ───────────────────── */}
      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* title */}
        <div className="h-8 w-40 rounded bg-gray-300" />

        <div className="mt-6 grid gap-8 md:grid-cols-2">
          {/* cover image */}
          <div className="h-80 w-full rounded bg-gray-300" />
          {/* paragraphs */}
          <div className="space-y-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-4 w-full rounded bg-gray-300" />
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────── Authors section ───────────────────── */}
      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* title */}
        <div className="h-8 w-32 rounded bg-gray-300" />

        <div className="mt-8 grid gap-8 sm:grid-cols-3 lg:grid-cols-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center space-y-3">
              <div className="h-20 w-20 rounded-full bg-gray-300" />
              <div className="h-4 w-24 rounded bg-gray-300" />
              <div className="h-3 w-20 rounded bg-gray-300" />
            </div>
          ))}
        </div>
      </section>

      {/* ───────────────────── Footer skeleton ───────────────────── */}
      <footer className="bg-gray-100">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-5 lg:px-8">
          {/* left column (logo + details) */}
          <div className="space-y-3">
            <div className="h-6 w-24 rounded bg-gray-300" />
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-3 w-40 rounded bg-gray-300" />
            ))}
          </div>

          {/* 4 nav columns */}
          {Array.from({ length: 4 }).map((_, col) => (
            <div key={col} className="space-y-3">
              <div className="h-4 w-24 rounded bg-gray-300" />
              {Array.from({ length: 5 }).map((__, row) => (
                <div key={row} className="h-3 w-20 rounded bg-gray-300" />
              ))}
            </div>
          ))}
        </div>

        {/* copyright bar */}
        <div className="border-t border-gray-200 py-4 text-center">
          <div className="mx-auto h-3 w-64 rounded bg-gray-300" />
        </div>
      </footer>
    </div>
  );
}
