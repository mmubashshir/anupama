import Image from 'next/image';

import { getPlaceholderImage } from '~/utils/get-placeholder-image';

interface NewsCardProps {
  category: string;
  title: string;
  imageUrl?: string;
  authorName?: string;
}

export default function NewsCard({
  category,
  title,
  imageUrl,
  authorName,
}: NewsCardProps) {
  return (
    <div className="group border-b border-gray-200 last:border-b-0">
      <div className="flex cursor-pointer gap-2">
        <div className="flex-1">
          <span className="text-sm text-black">{category}</span>
          <h3 className="mt-1 line-clamp-2 text-lg font-extrabold decoration-1 underline-offset-4 group-hover:underline md:text-xl">
            {title}
          </h3>
          {authorName ? (
            <p className="mt-1 text-sm text-gray-500">~{authorName}</p>
          ) : null}
        </div>
        <div className="relative">
          <Image
            src={imageUrl ?? getPlaceholderImage()}
            alt={title}
            width={120}
            height={120}
            className="h-25 w-25 object-cover group-hover:brightness-[1.1]"
          />
        </div>
      </div>
    </div>
  );
}
