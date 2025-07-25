import { Baloo_Tamma_2 } from 'next/font/google';
import { Toaster } from 'react-hot-toast';

import type { Metadata } from 'next';

import './globals.css';

import { BASE_URL } from '~/constants';

import Footer from '~/components/footer';
import GoogleAnalyticsScript from '~/components/google-analytics-script';
import MicrosoftClarity from '~/components/microsoft-clarity';

const balooTamma = Baloo_Tamma_2({
  variable: '--font-primary',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: 'Anupama Monthly',
  description: `ಅನುಪಮ ಮಹಿಳಾ ಮಾಸಿಕ ಪತ್ರಿಕೆಯು, ಕರ್ನಾಟಕದ ಏಕೈಕ ಮಹಿಳಾ ಪತ್ರಿಕೆಯಾಗಿದ್ದು, ಇದು ಕೌಟುಂಬಿಕ ಮಾಸ ಪತ್ರಿಕೆ. ಮಾನವ ಸೌಹಾರ್ದ, ಸಾಮಾಜಿಕ ಶಾಂತಿ ಅನುಪಮದ ಗುರಿ.`,
  keywords: [
    'Anupama monthly',
    `Women's magazine`,
    'Kannada magazine',
    `Women empowerment`,
    'womens writers',
  ],
  openGraph: {
    title: 'Anupama Monthly',
    description: `ಅನುಪಮ ಮಹಿಳಾ ಮಾಸಿಕ ಪತ್ರಿಕೆಯು, ಕರ್ನಾಟಕದ ಏಕೈಕ ಮಹಿಳಾ ಪತ್ರಿಕೆಯಾಗಿದ್ದು, ಇದು ಕೌಟುಂಬಿಕ ಮಾಸ ಪತ್ರಿಕೆ. ಮಾನವ ಸೌಹಾರ್ದ, ಸಾಮಾಜಿಕ ಶಾಂತಿ ಅನುಪಮದ ಗುರಿ.`,
    url: BASE_URL,
    siteName: 'Anupama Monthly',
    locale: 'kn_IN',
    type: 'website',
    images: [
      {
        url: `${BASE_URL}/anupama-hero.png`,
        width: 1200,
        height: 630,
        alt: `Anupama Women's Monthly Hero Image`,
        type: 'image/png',
      },
    ],
  },
  twitter: {
    title: 'Anupama Monthly',
    card: 'summary_large_image',
    description: `ಅನುಪಮ ಮಹಿಳಾ ಮಾಸಿಕ ಪತ್ರಿಕೆಯು, ಕರ್ನಾಟಕದ ಏಕೈಕ ಮಹಿಳಾ ಪತ್ರಿಕೆಯಾಗಿದ್ದು, ಇದು ಕೌಟುಂಬಿಕ ಮಾಸ ಪತ್ರಿಕೆ. ಮಾನವ ಸೌಹಾರ್ದ, ಸಾಮಾಜಿಕ ಶಾಂತಿ ಅನುಪಮದ ಗುರಿ.`,
    images: [
      {
        url: `${BASE_URL}/anupama-hero.png`,
        alt: `Anupama Women's Monthly Twitter Card`,
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
        <Toaster />
      </body>
      <GoogleAnalyticsScript />
      <MicrosoftClarity />
    </html>
  );
}
