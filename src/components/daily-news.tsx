import { CATEGORY } from '~/enum/categories';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

import NewsCard from '~/components/daily-news/news-card';

import { getPlaceholderImage } from '~/utils/get-placeholder-image';

import { fetchLimitedPosts } from '~/services/posts';

import { Container } from './container';
import FeaturedCard from './featured-card';

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
    <Container className="bg-white p-4 sm:px-6 lg:px-8">
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

        <FeaturedCard
          category={mainPost.categories?.nodes[0]?.name ?? ''}
          title={mainPost.title ?? ''}
          imageUrl={
            mainPost.featuredImage?.node.sourceUrl ?? getPlaceholderImage()
          }
          excerpt={mainPost.excerpt ?? ''}
          authorName={
            mainPost.authorinfo?.writtenBy ??
            mainPost.author?.node.name ??
            'Unknown'
          }
          href={`/${CATEGORY.DailyNews}/${mainPost.slug}`}
        />

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
                authorName={
                  post.authorinfo?.writtenBy ??
                  post.author?.node.name ??
                  'Unknown'
                }
              />
            </Link>
          ))}
        </div>
      </div>
    </Container>
  );
}
