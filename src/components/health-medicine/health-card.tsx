import Image from 'next/image';

interface HealthcareProps {
  name: string;
  category: string;
  imageUrl: string;
  author: string;
}

export default function HealthcareCard({
  name,
  category,
  imageUrl,
  author,
}: HealthcareProps) {
  return (
    <div className="bg-white py-4">
      <div className="group flex cursor-pointer items-start gap-4 sm:gap-5">
        {/* Image */}
        <div className="relative h-28 w-28 flex-shrink-0 overflow-hidden sm:h-32 sm:w-32">
          <Image
            src={imageUrl}
            alt={name}
            fill
            sizes="(max-width: 640px) 112px, (max-width: 768px) 128px, 128px"
            className="object-cover group-hover:brightness-[1.1]"
          />
        </div>

        {/* Text */}
        <div className="min-w-0 flex-1">
          <span className="text-sm font-semibold text-gray-500">
            {category}
          </span>

          <h3 className="line-clamp-3 text-base font-black decoration-1 underline-offset-4 group-hover:underline sm:text-lg md:text-xl">
            {name}
          </h3>

          {author ? <div className="text-sm text-gray-500">~{author}</div> : ''}
        </div>
      </div>
    </div>
  );
}
