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
      <div className="group flex cursor-pointer items-start space-x-3 sm:space-x-4">
        {/* Profile Image */}
        <div className="flex-shrink-0">
          <div className="relative h-22 w-22 overflow-hidden sm:h-24 sm:w-24 md:h-25 md:w-25">
            <Image
              src={imageUrl || '/placeholder.svg'}
              alt={name}
              fill
              sizes="(max-width: 640px) 80px, (max-width: 768px) 96px, 112px"
              className="object-cover transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/20 transition-opacity duration-300 group-hover:bg-black/10" />
          </div>
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <span className="text-xs text-black sm:text-sm">{category}</span>
          <h3 className="text-base font-black decoration-1 underline-offset-4 group-hover:underline sm:text-lg md:text-xl">
            {name}
          </h3>
          <div className="mt-1 text-sm sm:text-base">
            <WPContentRenderer content={description} />
          </div>
        </div>
      </div>
    </div>
  );
}
