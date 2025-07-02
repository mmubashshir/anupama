import Articles from '~/components/articles';
import DailyNews from '~/components/daily-news';
import Header from '~/components/header';
import HealthAndMedicine from '~/components/health-medicine';
import Social from '~/components/social';
import Stories from '~/components/stories';

import VideoNews from '../video-news/page';

export const revalidate = 120;

export default function Home() {
  return (
    <>
      <Header />
      <DailyNews />
      <VideoNews />
      <Articles />
      <Social />
      <HealthAndMedicine />
      <Stories />
    </>
  );
}
