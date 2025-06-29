import { CATEGORY } from '~/enum/categories';
import Image from 'next/image';
import Link from 'next/link';

import NewsCard from '~/components/daily-news/news-card';
import WPContentRenderer from '~/components/wp-content-renderer';

import { getPlaceholderImage } from '~/utils/get-placeholder-image';

import { fetchLimitedPosts } from '~/services/posts';

export default async function DailyNews() {
  const { posts } = await fetchLimitedPosts({
    limit: 5,
    filter: {
      categoryName: CATEGORY.DailyNews,
    },
  });

  const dailyNewsPosts = posts?.nodes ?? [];

  if (!dailyNewsPosts.length) {
    return (
      <div className="text-center text-6xl text-red-500">
        Some error occurred
      </div>
    );
  }

  const [mainPost, ...otherPosts] = dailyNewsPosts;

  return (
    <main className="mx-auto max-w-6xl px-4 py-6">
      {/* Main heading */}
      <h1 className="mt-4 mb-8 px-4 text-4xl font-extrabold md:text-5xl">
        ಸುದ್ದಿಗಳು
      </h1>

      <div className="grid grid-cols-1 gap-8 px-4 lg:grid-cols-3">
        {/* Main Featured Article */}
        <div className="group flex flex-col gap-4 border-b border-gray-200 bg-white pb-4 hover:cursor-pointer md:gap-0 md:border-0 lg:col-span-2">
          {/* Image */}
          <Image
            src={
              mainPost.featuredImage?.node.sourceUrl ?? getPlaceholderImage()
            }
            alt={mainPost.title ?? 'News image'}
            width={700}
            height={300}
            className="aspect-[3/2] w-full object-cover"
          />

          {/* Overlay below image */}
          <Link href={`/${CATEGORY.DailyNews}/${mainPost.slug}`}>
            <div className="z-10 ml-auto flex flex-col gap-2 bg-white md:-mt-16 md:w-[90%] md:p-4 md:text-left">
              <span className="text-sm text-black">
                {mainPost.categories?.nodes[0]?.name ?? 'ದಿನನಿತ್ಯದ ಸುದ್ದಿ'}
              </span>
              <h2 className="mt-1 text-lg font-extrabold decoration-1 underline-offset-4 group-hover:underline md:text-2xl">
                {mainPost.title}
              </h2>
              <WPContentRenderer
                content={mainPost.excerpt}
                className="line-clamp-3 text-sm md:text-base"
              />
              <WPContentRenderer
                content={mainPost.author?.node.name ?? ''}
                className="mt-2 text-sm text-gray-500"
              />
            </div>
          </Link>
        </div>

        {/* Sidebar News Items */}
        <div className="space-y-6">
          {otherPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/${CATEGORY.DailyNews}/${mainPost.slug}`}
            >
              <NewsCard
                category={post.categories?.nodes[0]?.name ?? 'ದಿನನಿತ್ಯದ ಸುದ್ದಿ'}
                title={post.title ?? ''}
                imageUrl={
                  post.featuredImage?.node.sourceUrl ?? getPlaceholderImage()
                }
              />
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
