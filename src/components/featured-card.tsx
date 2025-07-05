import Image from 'next/image';
import Link from 'next/link';

import WPContentRenderer from '~/components/wp-content-renderer';

import { getPlaceholderImage } from '~/utils/get-placeholder-image';

interface FeaturedCardProps {
  href: string;
  imageUrl: string;
  category: string;
  title: string;
  excerpt: string;
  authorName?: string;
}

export default function FeaturedCard({
  href,
  imageUrl = getPlaceholderImage(),
  category,
  title = 'News image',
  excerpt,
  authorName,
}: FeaturedCardProps) {
  return (
    <div className="group flex flex-col gap-4 border-b border-gray-200 bg-white pb-4 hover:cursor-pointer md:gap-0 md:border-0 lg:col-span-2">
      <Link href={href}>
        <Image
          src={imageUrl}
          alt={title}
          width={700}
          height={300}
          className="aspect-[3/2] w-full object-cover"
        />
      </Link>

      <Link href={href}>
        <div className="ml-auto flex flex-col gap-1.5 bg-white md:-mt-16 md:w-[90%] md:p-4 md:text-left">
          <span className="text-sm text-black">{category}</span>
          <h2 className="text-lg font-extrabold decoration-1 underline-offset-4 group-hover:underline md:text-2xl">
            {title}
          </h2>
          <WPContentRenderer
            content={excerpt}
            className="line-clamp-2 text-base md:text-base"
          />
          <WPContentRenderer
            content={authorName ? `~${authorName}` : ''}
            className="text-sm text-gray-500"
          />
        </div>
      </Link>
    </div>
  );
}
