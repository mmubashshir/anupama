import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="bg-background flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center px-4 py-12 text-center">
      <div className="max-w-md">
        <h1 className="text-foreground text-9xl font-bold tracking-tighter">
          404
        </h1>
        <p className="text-muted-foreground mt-4 text-2xl font-semibold">
          Oops, page not found!
        </p>
        <p className="text-muted-foreground mt-2">
          The page you are looking for might have been moved, renamed, or is
          temporarily unavailable.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-md bg-gray-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-700 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-200"
        >
          Go back to Homepage
        </Link>
      </div>
    </div>
  );
}
