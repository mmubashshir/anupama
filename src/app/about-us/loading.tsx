import { Container } from '~/components/container';

// app/<route>/loading.tsx
export default function Loading() {
  return (
    <div className="animate-pulse">
      {/* ───────────────────── Navbar skeleton ───────────────────── */}
      <header className="border-b border-gray-200 bg-white">
        <Container className="flex h-14 items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="h-6 w-24 bg-gray-300" /> {/* logo */}
          <div className="flex gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-4 w-16 bg-gray-300" />
            ))}
          </div>
        </Container>
      </header>

      {/* ───────────────────── “About us” section ───────────────────── */}
      <Container as="section" className="px-4 py-8 sm:px-6 lg:px-8">
        {/* title */}
        <div className="h-8 w-40 bg-gray-300" />

        <div className="mt-6 grid gap-8 md:grid-cols-2">
          {/* cover image */}
          <div className="h-80 w-full bg-gray-300" />
          {/* paragraphs */}
          <div className="space-y-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-4 w-full bg-gray-300" />
            ))}
          </div>
        </div>
      </Container>

      {/* ───────────────────── Authors section ───────────────────── */}
      <Container as="section" className="px-4 py-8 sm:px-6 lg:px-8">
        {/* title */}
        <div className="h-8 w-32 bg-gray-300" />

        <div className="mt-8 grid gap-8 sm:grid-cols-3 lg:grid-cols-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center space-y-3">
              <div className="-full h-20 w-20 bg-gray-300" />
              <div className="h-4 w-24 bg-gray-300" />
              <div className="h-3 w-20 bg-gray-300" />
            </div>
          ))}
        </div>
      </Container>

      {/* ───────────────────── Footer skeleton ───────────────────── */}
      <footer className="bg-gray-100">
        <Container className="grid gap-10 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-5 lg:px-8">
          {/* left column (logo + details) */}
          <div className="space-y-3">
            <div className="h-6 w-24 bg-gray-300" />
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-3 w-40 bg-gray-300" />
            ))}
          </div>

          {/* 4 nav columns */}
          {Array.from({ length: 4 }).map((_, col) => (
            <div key={col} className="space-y-3">
              <div className="h-4 w-24 bg-gray-300" />
              {Array.from({ length: 5 }).map((__, row) => (
                <div key={row} className="h-3 w-20 bg-gray-300" />
              ))}
            </div>
          ))}
        </Container>

        {/* copyright bar */}
        <div className="border-t border-gray-200 py-4 text-center">
          <div className="mx-auto h-3 w-64 bg-gray-300" />
        </div>
      </footer>
    </div>
  );
}
