import Articles from '~/components/articles';
import DailyNews from '~/components/daily-news';
import Header from '~/components/header';
import HealthAndMedicine from '~/components/health-medicine';
import Hero from '~/components/hero';
import Social from '~/components/social';
import Stories from '~/components/stories';

import VideoNews from '../video-news/page';

export const revalidate = 240; // Revalidate every 4 minutes

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
