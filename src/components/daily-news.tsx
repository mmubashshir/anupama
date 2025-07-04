import { CATEGORY } from '~/enum/categories';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import NewsCard from '~/components/daily-news/news-card';
import WPContentRenderer from '~/components/wp-content-renderer';

import { getPlaceholderImage } from '~/utils/get-placeholder-image';

import { fetchLimitedPosts } from '~/services/posts';

export default async function DailyNews() {
  const { posts } = await fetchLimitedPosts({
    first: 5,
    filter: {
      categoryName: CATEGORY.DailyNews,
    },
  });

  const dailyNewsPosts = posts?.nodes ?? [];

  if (!dailyNewsPosts.length) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
        <h2 className="text-2xl font-semibold text-red-500">
          ದೋಷ ಸಂಭವಿಸಿದೆ, ದಯವಿಟ್ಟು ಸ್ವಲ್ಪ ಸಮಯದ ನಂತರ ಪ್ರಯತ್ನಿಸಿ.
        </h2>
        <Link
          href=""
          className="rounded-md bg-red-500 px-4 py-2 text-center text-white transition hover:bg-red-600"
        >
          Refresh
        </Link>
      </div>
    );
  }

  const [mainPost, ...otherPosts] = dailyNewsPosts;

  return (
    <div className="mx-auto max-w-6xl bg-white p-4 sm:px-6 lg:px-8">
      <div className="pb-4 lg:pt-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-extrabold md:text-5xl">ಸುದ್ದಿಗಳು</h1>
          <Link
            href={`/${CATEGORY.DailyNews}`}
            className="group ml-auto flex items-center text-sm font-semibold decoration-1 underline-offset-4 hover:underline"
          >
            ಇನ್ನಷ್ಟು
            <ArrowUpRight className="mb-0.5 ml-1 inline h-4 w-4" />
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Main Featured Article */}
        <div className="group flex flex-col gap-4 border-b border-gray-200 bg-white pb-4 hover:cursor-pointer md:gap-0 md:border-0 lg:col-span-2">
          {/* Image */}
          <Link href={`/${CATEGORY.DailyNews}/${mainPost.slug}`}>
            <Image
              src={
                mainPost.featuredImage?.node.sourceUrl ?? getPlaceholderImage()
              }
              alt={mainPost.title ?? 'News image'}
              width={700}
              height={300}
              className="aspect-[3/2] w-full object-cover"
            />
          </Link>

          <Link href={`/${CATEGORY.DailyNews}/${mainPost.slug}`}>
            <div className="ml-auto flex flex-col gap-1.5 bg-white md:-mt-16 md:w-[90%] md:p-4 md:text-left">
              <span className="text-sm text-black">
                {mainPost.categories?.nodes[0]?.name ?? 'ದಿನನಿತ್ಯದ ಸುದ್ದಿ'}
              </span>
              <h2 className="text-lg font-extrabold decoration-1 underline-offset-4 group-hover:underline md:text-2xl">
                {mainPost.title}
              </h2>
              <WPContentRenderer
                content={mainPost.excerpt}
                className="line-clamp-2 text-base md:text-base"
              />
              <WPContentRenderer
                content={`~${mainPost.author?.node.name ?? ''}`}
                className="text-sm text-gray-500"
              />
            </div>
          </Link>
        </div>

        {/* Sidebar News Items */}
        <div className="flex flex-col space-y-6 lg:space-y-8">
          {otherPosts.map((post) => (
            <Link key={post.slug} href={`/${CATEGORY.DailyNews}/${post.slug}`}>
              <NewsCard
                category={post.categories?.nodes[0]?.name ?? 'ದಿನನಿತ್ಯದ ಸುದ್ದಿ'}
                title={post.title ?? ''}
                imageUrl={
                  post.featuredImage?.node.sourceUrl ?? getPlaceholderImage()
                }
                authorName={post.author?.node.name ?? ''}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
