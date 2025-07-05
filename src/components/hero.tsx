import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { fetchPopularPosts } from '~/services/popular-posts';
import { fetchLimitedPosts } from '~/services/posts';

import FeaturedCard from './featured-card';

export const revalidate = 60;

const Hero = async () => {
  const [featuredRaw, trendingPostsRaw] = await Promise.all([
    fetchLimitedPosts({ first: 1, filter: { tag: 'featured-post' } }),
    fetchPopularPosts(),
  ]);

  const featured = featuredRaw.posts?.nodes?.[0];

  const featuredPost = {
    href:
      featured?.slug && featured?.categories?.nodes?.[0]?.slug
        ? `/${featured.categories.nodes[0].slug}/${featured.slug}`
        : '#',
    imageUrl: featured?.featuredImage?.node.sourceUrl ?? '',
    category: featured?.categories?.nodes?.[0]?.name ?? '',
    title: featured?.title ?? '',
    excerpt: featured?.excerpt ?? '',
    authorName: featured?.author?.node?.name ?? '',
  };

  const trendingPosts = Array.isArray(trendingPostsRaw)
    ? trendingPostsRaw.slice(0, 3).filter(
        (post) => post.slug && post.categories?.nodes?.[0]?.slug, // Valid URL
      )
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
          <MagazineCard />
          <MobileMagazineCard />
        </div>
      </div>

      {/* Divider */}
      <div className="hidden border-t border-dashed border-black lg:block" />

      {/* Trending */}
      <div className="grid grid-cols-1 gap-7 py-12 lg:grid-cols-3">
        {trendingPosts.map((post) => (
          <TrendingPostsCard
            key={post.slug}
            url={`/${post.categories!.nodes[0].slug}/${post.slug}`}
            title={post.title ?? ''}
            category={post.categories!.nodes[0].name ?? ''}
            imageUrl={post.featuredImage?.node.sourceUrl ?? ''}
            author={post.author?.node?.name ?? ''}
          />
        ))}
      </div>
    </div>
  );
};

const MagazineCard = () => (
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

const MobileMagazineCard = () => (
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

const TrendingPostsCard = ({
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
}) => (
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

export default Hero;
