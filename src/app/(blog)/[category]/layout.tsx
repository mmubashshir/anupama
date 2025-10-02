import { Container } from '~/components/container';

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Container className="mt-18 md:mt-4" as="main">
        {children}
      </Container>
    </>
  );
}
