import Image from 'next/image';

interface HealthcareProps {
  name: string;
  // category: string;
  imageUrl: string;
  author: string;
}

export default function HealthcareCard({
  name,
  // category,
  imageUrl,
  author,
}: HealthcareProps) {
  return (
    <div className="bg-white py-4">
      <div className="group flex cursor-pointer items-start gap-4 sm:gap-5">
        {/* Image */}
        <div className="relative aspect-[3/2] h-28 w-auto flex-shrink-0 overflow-hidden sm:h-32">
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
          <h3 className="line-clamp-3 text-lg font-black decoration-1 underline-offset-4 group-hover:underline sm:text-lg md:text-xl">
            {name}
          </h3>

          {author ? <div className="text-sm text-gray-500">~{author}</div> : ''}
        </div>
      </div>
    </div>
  );
}
