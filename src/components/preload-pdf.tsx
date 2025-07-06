'use client';

import Head from 'next/head';

export default function PreloadPdf({ href }: { href: string }) {
  return (
    <Head>
      <link
        rel="preload"
        href={href}
        as="fetch"
        type="application/pdf"
        crossOrigin="anonymous"
      />
    </Head>
  );
}
