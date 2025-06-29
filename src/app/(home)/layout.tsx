import DailyNews from '~/components/daily-news';
import Header from '~/components/header';
import HealthAndMedicine from '~/components/health-medicine';
import Social from '~/components/social';

import Articles from '../articles/page';
import Stories from '../stories/page';
import VideoNews from '../video-news/page';

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <DailyNews />
      <VideoNews />
      <Articles />
      <Social />
      <HealthAndMedicine />
      <Stories />
      {/* <TopStories /> */}
      <main>{children}</main>
    </>
  );
}
