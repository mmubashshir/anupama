import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { getLatestMagazinePdfUrl } from '~/utils/get-latest-magazine';

import { fetchPopularPosts } from '~/services/popular-posts';
import { fetchLimitedPosts } from '~/services/posts';

import ArticleCard from './articles/article-card';
import { Container } from './container';
import FeaturedCard from './featured-card';
import MagazineView from './magazine-viewer/magazine-view';

export default async function Hero() {
  const [featuredRaw, trendingPostsRaw, latestMagazine] = await Promise.all([
    fetchLimitedPosts({ first: 1, filter: { tag: 'featured-post' } }),
    fetchPopularPosts(),
    getLatestMagazinePdfUrl(),
  ]);

  const featured = featuredRaw.posts?.nodes[0];

  const featuredPost = {
    href:
      featured?.slug && featured.categories?.nodes[0]?.slug
        ? `/${featured.categories.nodes[0].slug}/${featured.slug}`
        : '#',
    imageUrl: featured?.featuredImage?.node.sourceUrl ?? '',
    category: featured?.categories?.nodes[0]?.name ?? '',
    title: featured?.title ?? '',
    excerpt: featured?.excerpt ?? '',
    authorName:
      featured?.authorinfo?.writtenBy ??
      featured?.author?.node.name ??
      'Unknown',
  };

  const trendingPosts = Array.isArray(trendingPostsRaw)
    ? trendingPostsRaw
        .filter(
          (
            p,
          ): p is typeof p & {
            categories: { nodes: [{ slug: string; name: string }] };
            slug: string;
          } =>
            Boolean(p.categories) &&
            Array.isArray(p.categories?.nodes) &&
            p.categories.nodes.length > 0 &&
            Boolean(p.categories.nodes[0]?.slug),
        )
        .slice(0, 3)
    : [];

  return (
    <Container className="mt-15 flex flex-col p-4 sm:px-6 md:mt-4 lg:px-8">
      {/* Featured */}
      <h1 className="mb-4 text-3xl font-extrabold md:mb-7 md:text-5xl">
        ಮುಖ್ಯ ಸುದ್ದಿ
      </h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="md:col-span-1 lg:col-span-2">
          <FeaturedCard {...featuredPost} showBorder={false} />
        </div>

        {/* Magazine on Desktop */}
        <div className="col-span-1 hidden flex-col gap-10 lg:flex lg:flex-row">
          <div className="border-t border-l border-dashed border-black lg:mb-10 lg:ml-10 lg:border-solid lg:border-gray-200" />
          {latestMagazine.pdfUrl !== undefined && (
            <MagazineView pdfUrl={latestMagazine.pdfUrl}>
              <MagazineCard
                coverImageUrl={
                  latestMagazine.coverImageUrl ?? '/anupama-magazine.jpg'
                }
              />
            </MagazineView>
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="hidden border-t border-dashed border-black lg:block" />

      {/* Trending */}
      <div className="pt-4 pb-8 lg:pt-8">
        <h1 className="mb-7 text-3xl font-extrabold md:text-5xl">
          ಟ್ರೆಂಡಿಂಗ್ ಸುದ್ದಿ
        </h1>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {trendingPosts.map((post) => (
            <React.Fragment key={post.slug}>
              {/* Mobile: TrendingPostsCard */}
              <div className="block lg:hidden">
                <TrendingPostsCard
                  url={`/${post.categories.nodes[0].slug}/${post.slug}`}
                  title={post.title ?? ''}
                  category={post.categories.nodes[0].name}
                  imageUrl={post.featuredImage?.node.sourceUrl ?? ''}
                  author={
                    post.authorinfo?.writtenBy ??
                    post.author?.node.name ??
                    'Unknown'
                  }
                />
              </div>

              {/* Desktop: ArticleCard */}
              <div className="hidden lg:block">
                <Link
                  href={`/${post.categories.nodes[0].slug}/${post.slug}`}
                  prefetch
                >
                  <ArticleCard
                    key={post.categories.nodes[0].name}
                    image={post.featuredImage?.node.sourceUrl ?? ''}
                    category={post.categories.nodes[0].name}
                    categorySlug={post.categories.nodes[0].name}
                    headline={post.title ?? ''}
                    author={
                      post.authorinfo?.writtenBy ??
                      post.author?.node.name ??
                      'Unknown'
                    }
                    slug={post.slug}
                    date={new Date()}
                  />
                </Link>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Magazine on Mobile (after Trending) */}
      {latestMagazine.pdfUrl !== undefined && (
        <div className="block lg:hidden">
          <div className="my-8 border-t border-dashed border-black md:hidden" />
          <MagazineView pdfUrl={latestMagazine.pdfUrl}>
            <MobileMagazineCard
              coverImageUrl={
                latestMagazine.coverImageUrl ?? '/anupama-magazine.jpg'
              }
            />
          </MagazineView>
        </div>
      )}
    </Container>
  );
}

function MagazineCard({
  coverImageUrl = '/anupama-magazine.jpg',
}: {
  coverImageUrl: string;
}) {
  return (
    <Link className="group hidden lg:block" href="#">
      <div className="flex flex-col gap-y-4">
        <Image
          src={coverImageUrl}
          alt="anupama-magazine"
          width={300}
          height={434}
          className="mx-auto w-[300px] object-contain group-hover:brightness-[1.1]"
          priority
        />
        <div className="flex justify-between">
          <span className="text-xl font-extrabold decoration-1 underline-offset-4 group-hover:underline">
            ಇತ್ತೀಚಿನ ಮಾಸಪತ್ರಿಕೆ
          </span>
          <ArrowUpRight className="ml-1 inline h-6 w-6" />
        </div>
      </div>
    </Link>
  );
}

function MobileMagazineCard({
  coverImageUrl = '/anupama-magazine.jpg',
}: {
  coverImageUrl: string;
}) {
  return (
    <Link className="group block lg:hidden" href="#">
      <div className="flex flex-row-reverse items-center gap-x-4">
        <Image
          src={coverImageUrl}
          alt="Anupama Magazine Cover"
          width={136}
          height={186}
          className="mx-auto h-auto w-auto object-contain"
          priority
        />
        <div className="text-xl font-extrabold underline-offset-4 group-hover:underline">
          ಇತ್ತೀಚಿನ{' '}
          <ArrowUpRight className="mb-1 ml-1 inline h-6 w-6 align-text-bottom" />{' '}
          ಮಾಸಪತ್ರಿಕೆ
        </div>
      </div>
    </Link>
  );
}

function TrendingPostsCard({
  url,
  title,
  imageUrl,
  category,
}: {
  url: string;
  title: string;
  imageUrl: string;
  category: string;
  author: string;
}) {
  return (
    <Link href={url} className="group">
      <div className="flex gap-x-5">
        <Image
          src={imageUrl}
          alt={title}
          width={147}
          height={147}
          className="aspect-[3/2] h-[100px] w-auto object-cover group-hover:brightness-110 md:h-[147px]"
        />

        <div className="flex flex-col gap-1 md:gap-3">
          <h3 className="text-sm font-semibold text-gray-500">{category}</h3>
          <p className="line-clamp-3 text-lg font-extrabold decoration-1 underline-offset-4 group-hover:underline md:line-clamp-3">
            {title}
          </p>
        </div>
      </div>
    </Link>
  );
}
