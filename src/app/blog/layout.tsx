// src/app/blog/layout.tsx
import BlogNav from '~/components/blog-nav';

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BlogNav />
      <main>{children}</main>
    </>
  );
}
