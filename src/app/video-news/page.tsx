import Image from 'next/image';

import WPVideoRenderer from '~/components/wp-video-renderer';

import { fetchLimitedPosts } from '~/services/posts';

import VideoCard from './components/video-card';

export default async function VideoNews() {
  let videoPosts = await fetchLimitedPosts({
    limit: 4,
    filter: {
      categoryName: 'video-news',
    },
  });

  let latestVideo = videoPosts.posts?.nodes[0] ?? null;
  let otherVideos = videoPosts.posts?.nodes
    .slice(1, 5)
    .flatMap((video) => video);

  return (
    <main className="w-full bg-gray-100/90">
      <div className="mx-auto max-w-6xl px-4 py-6">
        <h1 className="my-4 px-4 text-2xl font-extrabold md:text-3xl">
          ವಿಡಿಯೋ ಸುದ್ದಿ
        </h1>

        <div className="grid grid-cols-1 gap-6 px-4 lg:grid-cols-3">
          {/* Main Featured Article */}
          <div className="overflow-hidden lg:col-span-2">
            <div className="relative bg-white inset-shadow-2xs">
              {/* Image section with hover + play button */}
              <div className="group relative cursor-pointer px-8 pt-8">
                <WPVideoRenderer
                  className="video-container"
                  content={latestVideo!.content}
                />
              </div>

              {/* Text section below */}
              <div className="group cursor-pointer p-4 text-center md:p-6">
                <span className="text-sm text-black">ವೀಡಿಯೊ</span>
                <h2 className="text-lg font-extrabold decoration-1 underline-offset-4 group-hover:underline md:text-2xl">
                  {latestVideo!.title}
                </h2>
                <p className="mt-3 text-gray-700"></p>
              </div>
            </div>
          </div>

          {/* Other Video Suggestions */}
          <div className="space-y-4">
            {otherVideos?.length != 0 &&
              otherVideos!.flatMap((videoPost) => (
                <VideoCard
                  key={videoPost.id}
                  title={videoPost.title ?? ''}
                  videoContent={videoPost.content ?? ''}
                />
              ))}
          </div>
        </div>
      </div>
    </main>
  );
}
