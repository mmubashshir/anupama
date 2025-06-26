import Image from 'next/image';

import WPContentRenderer from '~/components/wp-content-renderer';

import { fetchLimitedPosts } from '~/services/posts';

import NewsCard from './components/news-card';

export const dynamic = 'force-dynamic';

export default async function DailyNews() {
  const { posts } = await fetchLimitedPosts({
    limit: 5,
    filter: {
      categoryName: 'daily-news',
    },
  });

  const allPosts = posts?.nodes ?? [];

  if (allPosts.length === 0) {
    return (
      <div className="text-center text-6xl text-red-500">
        Some error occurred
      </div>
    );
  }

  const [mainPost, ...otherPosts] = allPosts;

  return (
    <main className="mx-auto max-w-6xl px-4 py-6">
      <h1 className="mt-4 mb-8 text-4xl font-extrabold md:text-5xl">
        ಸುದ್ದಿಗಳು
      </h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Main Featured Article */}
        <div className="group flex flex-col gap-4 border-b border-gray-200 bg-white pb-4 hover:cursor-pointer md:gap-0 md:border-0 lg:col-span-2">
          {/* Image */}
          {mainPost.featuredImage?.node.sourceUrl ? (
            <Image
              src={mainPost.featuredImage.node.sourceUrl}
              alt={mainPost.title ?? 'News image'}
              width={700}
              height={300}
              className="aspect-[3/2] w-full object-cover"
            />
          ) : (
            <Image
              src="/fallback.jpg"
              alt="News image"
              width={700}
              height={300}
              className="aspect-[3/2] w-full object-cover"
            />
          )}

          {/* Overlay below image */}
          <div className="z-10 ml-auto flex flex-col gap-2 bg-white md:-mt-16 md:w-[90%] md:p-4 md:text-left">
            <span className="text-sm text-black">
              {mainPost.categories?.nodes[0]?.name ?? 'ದಿನನಿತ್ಯದ ಸುದ್ದಿ'}
            </span>
            <h2 className="mt-1 text-lg font-extrabold decoration-1 underline-offset-4 group-hover:underline md:text-2xl">
              {mainPost.title}
            </h2>
            <p
              className="line-clamp-3 text-sm md:text-base"
              dangerouslySetInnerHTML={{ __html: mainPost.excerpt ?? '' }}
            />
            <WPContentRenderer
              content={mainPost.author?.node.name ?? 'donald'}
              className="mt-2 text-sm text-gray-500"
            />
          </div>
        </div>

        {/* Sidebar News Items */}
        <div className="space-y-6">
          {otherPosts.map((post) => (
            <NewsCard
              key={post.id}
              category={post.categories?.nodes[0]?.name ?? 'ದಿನನಿತ್ಯದ ಸುದ್ದಿ'}
              title={post.title ?? ''}
              imageUrl={post.featuredImage?.node.sourceUrl ?? '/fallback.jpg'}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
