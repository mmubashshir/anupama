import React from 'react';
import { CATEGORY } from '~/enum/categories';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import {
  fetchAllPosts,
  fetchLimitedPosts,
  fetchPostBySlug,
} from '~/services/posts';

import FeaturedCard from './featured-card';

const Hero = async () => {
  const featuredRaw = await fetchLimitedPosts({
    first: 1,
    filter: {
      tag: 'featured-post',
    },
  });
  console.log('Featured post', featuredRaw);
  const featuredPost = {
    href: featuredRaw.posts?.nodes[0].slug ?? '',
    imageUrl: featuredRaw.posts?.nodes[0].featuredImage?.node.sourceUrl ?? '',
    category: featuredRaw.posts?.nodes[0].categories?.nodes[0].name ?? '',
    title: featuredRaw.posts?.nodes[0].title ?? '',
    excerpt: featuredRaw.posts?.nodes[0].excerpt ?? '',
    authorName: featuredRaw.posts?.nodes[0].author?.node.name ?? '',
  };

  return (
    <div className="mx-auto max-w-6xl p-4 pt-10 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-3">
        <div className="col-span-2 *:border-0">
          <FeaturedCard {...featuredPost} />
        </div>

        <div className="col-span-1 flex flex-col gap-10 lg:flex-row">
          <div className="border-t border-l border-dashed border-black lg:mb-10 lg:ml-10 lg:border-solid lg:border-gray-200"></div>
          <MagazineCard />
          <MobileMagazineCard />
        </div>
      </div>

      <div className="hidden border-t border-dashed border-black lg:block"></div>

      <div className="grid grid-cols-1 gap-7 py-12 lg:grid-cols-3">
        <TrendingPostsCard
          url={featuredPost.href}
          category={featuredPost.category}
          title={featuredPost.title}
          imageUrl={featuredPost.imageUrl}
        />
        <TrendingPostsCard
          url={featuredPost.href}
          category={featuredPost.category}
          title={featuredPost.title}
          imageUrl={featuredPost.imageUrl}
        />
        <TrendingPostsCard
          url={featuredPost.href}
          category={featuredPost.category}
          title={featuredPost.title}
          imageUrl={featuredPost.imageUrl}
        />
      </div>
    </div>
  );
};

const MagazineCard = () => {
  return (
    // TODO: PDF Link
    <Link className="group hidden lg:block" href={''}>
      <div className="flex flex-col gap-y-4">
        <Image
          src="/anupama-magazine.jpg"
          alt="anupama-magazine"
          width={300}
          height={434}
          className="mx-auto h-auto w-[300px] object-contain"
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
};

const MobileMagazineCard = () => {
  return (
    <Link className="group block lg:hidden" href={''}>
      <div className="flex flex-row-reverse items-center gap-x-4 lg:flex-col">
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
};

const TrendingPostsCard = ({
  url,
  title,
  imageUrl,
  category,
}: {
  url: string;
  title: string;
  imageUrl: string;
  category: string;
}) => {
  return (
    <Link href={url} className="group hover:cursor-pointer">
      <div className="flex gap-x-7">
        <Image
          src={imageUrl}
          alt={title}
          width={147}
          height={147}
          className="bord aspect-square object-cover"
        />
        <div className="flex flex-col gap-3">
          <h3>{category}</h3>
          <p className="text-lg font-extrabold decoration-1 underline-offset-4 group-hover:underline md:text-lg">
            {title}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Hero;
/* Lights */
