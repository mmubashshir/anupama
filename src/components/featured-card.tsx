import Image from 'next/image';
import Link from 'next/link';

import WPContentRenderer from '~/components/wp-content-renderer';

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
  imageUrl,
  category,
  title,
  excerpt,
  authorName,
}: FeaturedCardProps) {
  return (
    <Link
      href={href}
      className="group flex flex-col gap-4 border-b border-gray-200 bg-white pb-4 hover:cursor-pointer md:gap-0 md:border-0 lg:col-span-2"
    >
      {/* image */}
      <Image
        src={imageUrl}
        alt={title}
        width={700}
        height={300}
        className="aspect-[3/2] w-full object-cover"
      />

      {/* text block */}
      <div className="ml-auto flex flex-col gap-1.5 bg-white md:-mt-16 md:w-[90%] md:p-4">
        <span className="text-sm">{category}</span>
        <h2 className="text-lg font-extrabold group-hover:underline md:text-2xl">
          {title}
        </h2>
        <WPContentRenderer
          content={excerpt}
          className="line-clamp-2 text-base"
        />
        <p className="text-sm text-gray-500">~{authorName}</p>
      </div>
    </Link>
  );
}
