import { BASE_URL } from '~/constants';
import { CATEGORY } from '~/enum/categories';
import { type Metadata } from 'next';

import Advertisement from '~/components/advertisement';
import Articles from '~/components/articles';
import DailyNews from '~/components/daily-news';
import Header from '~/components/header';
import HealthAndMedicine from '~/components/health-medicine';
import Hero from '~/components/hero';
import Social from '~/components/social';
import Stories from '~/components/stories';
import VideoNews from '~/components/video-news';

import { getLatestMagazinePdfUrl } from '~/utils/get-latest-magazine';

export const revalidate = 60; // Revalidate every 1 minute

export async function generateMetadata(): Promise<Metadata> {
  const { ogImageUrl } = await getLatestMagazinePdfUrl();

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
          url: ogImageUrl ?? `${BASE_URL}/anupama-hero.png`,
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
          url: ogImageUrl ?? `${BASE_URL}/anupama-hero.png`,
          alt: `Anupama Women's Monthly Twitter Card`,
        },
      ],
    },
  };
}

export default function Home() {
  return (
    <>
      <Advertisement category={CATEGORY.HomeTopAd} />
      <Hero />
      <DailyNews />
      <VideoNews />
      <Advertisement category={CATEGORY.HomeMiddleAd} />
      <Articles />
      <Social />
      <HealthAndMedicine />
      <Stories />
      <Advertisement category={CATEGORY.HomeBottomAd} />
    </>
  );
}
