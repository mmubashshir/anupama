// app/(home)/layout.tsx
import Header from '~/components/header';

import DailyNews from '../daily-news/page';
import Health from '../health/page';
import Social from '../social/page';
import Stories from '../stories/page';
import VideoNews from '../video-news/page';
import TopStories from './top-stories';

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
      <Social />
      <Health />
      <Stories />
      <TopStories />
      <main>{children}</main>
    </>
  );
}
