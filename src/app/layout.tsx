import { Geist, Geist_Mono } from 'next/font/google';

import type { Metadata } from 'next';

import './globals.css';

import { BASE_URL } from '../constants';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: 'Anupama Monthly',
  description: `ಅನುಪಮ ಮಹಿಳಾ ಮಾಸಿಕ ಪತ್ರಿಕೆಯು, ಕರ್ನಾಟಕದ ಏಕೈಕ ಮಹಿಳಾ ಪತ್ರಿಕೆಯಾಗಿದ್ದು, ಇದು ಕೌಟುಂಬಿಕ ಮಾಸ ಪತ್ರಿಕೆ. ಮಾನವ ಸೌಹಾರ್ದ, ಸಾಮಾಜಿಕ ಶಾಂತಿ ಅನುಪಮ'ದ ಗುರಿ.`,
  keywords: [
    'Anupama monthly',
    `Women's magazine`,
    'Kannada magazine',
    `Women empowerment`,
    'womens writers',
  ],
  openGraph: {
    title: 'Anupama Monthly',
    description: `ಅನುಪಮ ಮಹಿಳಾ ಮಾಸಿಕ ಪತ್ರಿಕೆಯು, ಕರ್ನಾಟಕದ ಏಕೈಕ ಮಹಿಳಾ ಪತ್ರಿಕೆಯಾಗಿದ್ದು, ಇದು ಕೌಟುಂಬಿಕ ಮಾಸ ಪತ್ರಿಕೆ. ಮಾನವ ಸೌಹಾರ್ದ, ಸಾಮಾಜಿಕ ಶಾಂತಿ ಅನುಪಮ'ದ ಗುರಿ.`,
    url: '',
    siteName: 'Anupama Monthly',
    locale: 'kn_IN',
    type: 'website',
    images: [
      {
        url: `${''}/tac-hero-og.jpg`,
      },
    ],
  },
  twitter: {
    title: 'Anupama Monthly',
    card: 'summary_large_image',
    description: `ಅನುಪಮ ಮಹಿಳಾ ಮಾಸಿಕ ಪತ್ರಿಕೆಯು, ಕರ್ನಾಟಕದ ಏಕೈಕ ಮಹಿಳಾ ಪತ್ರಿಕೆಯಾಗಿದ್ದು, ಇದು ಕೌಟುಂಬಿಕ ಮಾಸ ಪತ್ರಿಕೆ. ಮಾನವ ಸೌಹಾರ್ದ, ಸಾಮಾಜಿಕ ಶಾಂತಿ ಅನುಪಮ'ದ ಗುರಿ.`,
    images: [
      {
        url: `${''}/tac-hero-og.jpg`,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          type="image/png"
          href="/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
