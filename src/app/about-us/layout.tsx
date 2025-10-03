import BlogNav from '~/components/blog-nav';
import { Container } from '~/components/container';

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Container as="main">{children}</Container>
    </>
  );
}
