import { BASE_URL } from '~/constants';
import { Metadata } from 'next';

import Articles from '~/components/articles';
import DailyNews from '~/components/daily-news';
import Header from '~/components/header';
import HealthAndMedicine from '~/components/health-medicine';
import Hero from '~/components/hero';
import Social from '~/components/social';
import Stories from '~/components/stories';

import { getLatestMagazinePdfUrl } from '~/utils/get-latest-magazine';

import VideoNews from '../video-news/page';

export const revalidate = 60; // Revalidate every 1 minute

export async function generateMetadata(): Promise<Metadata> {
  const { coverImageUrl } = await getLatestMagazinePdfUrl();

  return {
    title: 'Anupama Monthly',
    description:
      'ಅನುಪಮ ಮಹಿಳಾ ಮಾಸಿಕ ಪತ್ರಿಕೆಯು, ಕರ್ನಾಟಕದ ಏಕೈಕ ಮಹಿಳಾ ಪತ್ರಿಕೆಯಾಗಿದ್ದು, ಇದು ಕೌಟುಂಬಿಕ ಮಾಸ ಪತ್ರಿಕೆ. ಮಾನವ ಸೌಹಾರ್ದ, ಸಾಮಾಜಿಕ ಶಾಂತಿ ಅನುಪಮದ ಗುರಿ.',
    openGraph: {
      title: 'Anupama Monthly',
      description:
        'ಅನುಪಮ ಮಹಿಳಾ ಮಾಸಿಕ ಪತ್ರಿಕೆಯು, ಕರ್ನಾಟಕದ ಏಕೈಕ ಮಹಿಳಾ ಪತ್ರಿಕೆಯಾಗಿದ್ದು, ಇದು ಕೌಟುಂಬಿಕ ಮಾಸ ಪತ್ರಿಕೆ. ಮಾನವ ಸೌಹಾರ್ದ, ಸಾಮಾಜಿಕ ಶಾಂತಿ ಅನುಪಮದ ಗುರಿ.',
      url: BASE_URL,
      siteName: 'Anupama Monthly',
      locale: 'kn_IN',
      type: 'website',
      images: [
        {
          url: coverImageUrl ?? `${BASE_URL}/anupama-hero.png`,
          width: 1200,
          height: 630,
          alt: `Anupama Women's Monthly Cover`,
          type: 'image/jpeg',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Anupama Monthly',
      description:
        'ಅನುಪಮ ಮಹಿಳಾ ಮಾಸಿಕ ಪತ್ರಿಕೆಯು, ಕರ್ನಾಟಕದ ಏಕೈಕ ಮಹಿಳಾ ಪತ್ರಿಕೆಯಾಗಿದ್ದು, ಇದು ಕೌಟುಂಬಿಕ ಮಾಸ ಪತ್ರಿಕೆ.',
      images: [
        {
          url: coverImageUrl ?? `${BASE_URL}/anupama-hero.png`,
          alt: `Anupama Women's Monthly Twitter Card`,
        },
      ],
    },
  };
}

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <DailyNews />
      <VideoNews />
      <Articles />
      <Social />
      <HealthAndMedicine />
      <Stories />
    </>
  );
}
