import Image from 'next/image';
import Link from 'next/link';

import WPContentRenderer from '~/components/wp-content-renderer';

interface FeaturedCardProps {
  href: string;
  imageUrl: string;
  category: string;
  title: string;
  excerpt: string;
  authorName: string;
  showBorder?: boolean; // Optional prop
}

export default function FeaturedCard({
  href,
  imageUrl,
  category,
  title,
  excerpt,
  authorName,
  showBorder = true, // default to true
}: FeaturedCardProps) {
  return (
    <Link
      href={href}
      className={`group relative flex flex-col gap-4 bg-white pb-4 hover:cursor-pointer md:gap-0 md:border-0 lg:col-span-2 ${
        showBorder ? 'border-b border-gray-200' : ''
      }`}
    >
      <Image
        src={imageUrl}
        alt={title}
        width={700}
        height={300}
        className="z-0 aspect-[3/2] w-full object-cover group-hover:brightness-[1.1]"
      />

      <div className="z-10 ml-auto flex flex-col gap-1.5 bg-white md:-mt-16 md:w-[90%] md:p-4">
        <span className="text-sm font-semibold text-gray-500">{category}</span>
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
