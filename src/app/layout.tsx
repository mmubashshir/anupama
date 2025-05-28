import type React from 'react';

function Layout({ children }: Readonly<React.PropsWithChildren>) {
  return <>{children}</>;
}

export default Layout;
