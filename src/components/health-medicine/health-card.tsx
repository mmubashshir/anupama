import Image from 'next/image';

import WPContentRenderer from '~/components/wp-content-renderer';

interface HealthcareProps {
  name: string;
  category: string;
  description: string;
  imageUrl: string;
}

export default function HealthcareCard({
  name,
  category,
  description,
  imageUrl,
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
            className="object-cover transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black/20 transition-opacity duration-300 group-hover:bg-black/10" />
        </div>

        {/* Text */}
        <div className="min-w-0 flex-1">
          <span className="text-xs text-black sm:text-sm">{category}</span>

          <h3 className="line-clamp-2 text-base font-black decoration-1 underline-offset-4 group-hover:underline sm:text-lg md:text-xl">
            {name}
          </h3>

          <div className="mt-1 line-clamp-2 text-sm text-gray-700 sm:text-base">
            <WPContentRenderer content={description} />
          </div>
        </div>
      </div>
    </div>
  );
}
