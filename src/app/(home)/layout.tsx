// app/(home)/layout.tsx
import Header from '~/components/header';

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-6xl xl:px-0">
      <Header />
      {children}
    </div>
  );
}
