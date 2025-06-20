import BlogNav from '~/components/blog-nav';

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
