// app/(home)/layout.tsx
import Header from '~/components/header';

import Articles from '../articles/page';
import DailyNews from '../daily-news/page';
import Health from '../health/page';
import Social from '../social/page';
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
      <Health />
      <Stories />
      {/* <TopStories /> */}
      <main>{children}</main>
    </>
  );
}
