import { CATEGORY } from '~/enum/categories';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

import WPVideoRenderer from '~/components/wp-video-renderer';

import { fetchLimitedPosts } from '~/services/posts';

import VideoCard from './components/video-card';

export const revalidate = 60; // Revalidate every 1 minute

export default async function VideoNews() {
  const videoPosts = await fetchLimitedPosts({
    first: 4,
    filter: {
      categoryName: CATEGORY.VideoNews,
    },
  });

  const posts = videoPosts.posts?.nodes ?? [];

  const latestVideo = posts.length > 0 ? posts[0] : null;

  const otherVideos = posts.slice(1, 5);

  return (
    <div className="bg-gray-100/90 pt-2">
      <div className="mx-auto max-w-6xl p-4 py-10 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-extrabold md:text-5xl">ವೀಡಿಯೊ ಸುದ್ದಿ</h1>
          <Link
            href={`/${CATEGORY.VideoNews}`}
            className="group ml-auto flex items-center text-sm font-semibold decoration-1 underline-offset-4 hover:underline"
          >
            ಇನ್ನಷ್ಟು
            <ArrowUpRight className="mb-0.5 ml-1 inline h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 pt-6 lg:grid-cols-3">
          {/* Main Featured Article */}
          <div className="overflow-hidden lg:col-span-2">
            {latestVideo ? (
              <div className="relative bg-white inset-shadow-2xs">
                <div className="group relative cursor-pointer px-8 pt-8">
                  <WPVideoRenderer
                    className="video-container"
                    content={latestVideo.content}
                  />
                </div>

                <div className="group cursor-pointer p-4 text-center md:p-6">
                  <span className="text-sm text-black">ವೀಡಿಯೊ</span>
                  <h2 className="text-lg font-extrabold decoration-1 underline-offset-4 group-hover:underline md:text-2xl">
                    {latestVideo.title ?? ''}
                  </h2>
                </div>
              </div>
            ) : null}
          </div>

          {/* Other Video Suggestions */}
          <div className="space-y-4">
            {otherVideos.map((videoPost) => (
              <VideoCard
                key={videoPost.id}
                title={videoPost.title ?? ''}
                videoContent={videoPost.content ?? ''}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
