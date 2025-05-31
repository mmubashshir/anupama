// src/app/blog/layout.tsx
import BlogNav from '~/app/video-news/components/blog-nav';

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BlogNav />
      <main className="mx-auto max-w-6xl">{children}</main>
    </>
  );
}
