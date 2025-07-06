import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { getLatestMagazinePdfUrl } from '~/utils/get-latest-magazine';

import { fetchPopularPosts } from '~/services/popular-posts';
import { fetchLimitedPosts } from '~/services/posts';

import FeaturedCard from './featured-card';
import MagazineView from './magazine-viewer/magazine-view';

export default async function Hero() {
  const [featuredRaw, trendingPostsRaw, pdfUrl] = await Promise.all([
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
    authorName: featured?.author?.node.name ?? '',
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
    <div className="mx-auto max-w-6xl p-4 pt-10 sm:px-6 lg:px-8">
      {/* Featured */}
      <div className="grid grid-cols-1 lg:grid-cols-3">
        <div className="col-span-2">
          <FeaturedCard {...featuredPost} />
        </div>
        <div className="col-span-1 flex flex-col gap-10 lg:flex-row">
          <div className="border-t border-l border-dashed border-black lg:mb-10 lg:ml-10 lg:border-solid lg:border-gray-200" />
          <MagazineView pdfUrl={pdfUrl}>
            <MagazineCard />
            <MobileMagazineCard />
          </MagazineView>
        </div>
      </div>

      {/* Divider */}
      <div className="hidden border-t border-dashed border-black lg:block" />

      {/* Trending */}
      <div className="py-8">
        <h1 className="mb-7 text-3xl font-extrabold md:text-5xl">
          ಟ್ರೆಂಡಿಂಗ್ ಸುದ್ದಿ
        </h1>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {trendingPosts.map((post) => (
            <TrendingPostsCard
              key={post.slug}
              url={`/${post.categories.nodes[0].slug}/${post.slug}`}
              title={post.title ?? ''}
              category={post.categories.nodes[0].name}
              imageUrl={post.featuredImage?.node.sourceUrl ?? ''}
              author={post.author?.node.name ?? ''}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function MagazineCard() {
  return (
    <Link className="group hidden lg:block" href="#">
      <div className="flex flex-col gap-y-4">
        <Image
          src="/anupama-magazine.jpg"
          alt="anupama-magazine"
          width={300}
          height={434}
          className="mx-auto w-[300px] object-contain"
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

function MobileMagazineCard() {
  return (
    <Link className="group block lg:hidden" href="#">
      <div className="flex flex-row-reverse items-center gap-x-4">
        <Image
          src="/anupama-magazine.jpg"
          alt="anupama-magazine"
          width={136}
          height={186}
          className="mx-auto w-auto object-contain"
        />
        <div className="text-4xl font-extrabold decoration-1 underline-offset-4 group-hover:underline lg:text-xl">
          ಇತ್ತೀಚಿನ <ArrowUpRight className="mb-2 ml-1 inline h-6 w-6" />{' '}
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
  author,
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
          className="aspect-square object-cover"
        />
        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-semibold text-gray-500">{category}</h3>
          <p className="line-clamp-3 text-lg font-extrabold decoration-1 underline-offset-4 group-hover:underline">
            {title}
          </p>
          <p className="text-sm text-gray-500">~{author}</p>
        </div>
      </div>
    </Link>
  );
}
