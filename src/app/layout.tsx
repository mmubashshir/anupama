import { Baloo_Tamma_2 } from 'next/font/google';

import type { Metadata } from 'next';

import './globals.css';

import { BASE_URL } from '~/constants';

import Footer from '~/components/footer';

const balooTamma = Baloo_Tamma_2({
  variable: '--font-primary',
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
        url: `/tac-hero-og.jpg`,
      },
    ],
  },
  twitter: {
    title: 'Anupama Monthly',
    card: 'summary_large_image',
    description: `ಅನುಪಮ ಮಹಿಳಾ ಮಾಸಿಕ ಪತ್ರಿಕೆಯು, ಕರ್ನಾಟಕದ ಏಕೈಕ ಮಹಿಳಾ ಪತ್ರಿಕೆಯಾಗಿದ್ದು, ಇದು ಕೌಟುಂಬಿಕ ಮಾಸ ಪತ್ರಿಕೆ. ಮಾನವ ಸೌಹಾರ್ದ, ಸಾಮಾಜಿಕ ಶಾಂತಿ ಅನುಪಮ'ದ ಗುರಿ.`,
    images: [
      {
        url: `/tac-hero-og.jpg`,
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
          href="/favicon-96x96.png"
          rel="icon"
          sizes="96x96"
          type="image/png"
        />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
        <link href="/favicon.ico" rel="shortcut icon" />
        <link
          href="/apple-touch-icon.png"
          rel="apple-touch-icon"
          sizes="180x180"
        />
        <link href="/site.webmanifest" rel="manifest" />
      </head>
      <body className={`${balooTamma.variable} antialiased`}>
        {children}
        <Footer />
      </body>
    </html>
  );
}
