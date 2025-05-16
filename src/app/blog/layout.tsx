// src/app/blog/layout.tsx
import BlogNav from '~/app/blog/components/blog-nav';

import Footer from '~/components/main-footer';

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BlogNav />
      <main className="mx-auto max-w-6xl">{children}</main>
      <Footer />
    </>
  );
}
