import Image from 'next/image';

interface NewsCardProps {
  category: string;
  title: string;
  imageUrl: string;
}

export default function NewsCard({ category, title, imageUrl }: NewsCardProps) {
  return (
    <div className="group border-b border-gray-200 pb-4 last:border-b-0">
      <div className="group flex cursor-pointer gap-3">
        <div className="flex-1">
          <span className="text-sm text-black">{category}</span>
          <h3 className="mt-1 line-clamp-3 text-lg leading-tight font-extrabold decoration-1 underline-offset-4 group-hover:underline md:text-xl">
            {title}
          </h3>
        </div>
        <div className="relative flex-shrink-0">
          <Image
            src={imageUrl || '/placeholder.svg'}
            alt={title}
            width={120}
            height={120}
            className="h-25 w-25 object-cover"
          />
        </div>
      </div>
    </div>
  );
}
