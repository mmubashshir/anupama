import Image from 'next/image';

interface HealthCardProps {
  name: string;
  description: string;
  imageUrl: string;
}

export default function HealthCard({
  name,
  description,
  imageUrl,
}: HealthCardProps) {
  return (
    <div className="border border-gray-200 bg-white p-6 shadow-sm transition-shadow duration-200 hover:shadow-md">
      <div className="flex items-start space-x-4">
        {/* Profile Image */}
        <div className="flex-shrink-0">
          <div className="h-16 w-16 overflow-hidden bg-gray-100 sm:h-20 sm:w-20">
            <Image
              src={imageUrl || '/placeholder.svg'}
              alt={name}
              width={80}
              height={80}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <h3 className="mb-2 text-lg font-semibold text-gray-900 sm:text-xl">
            {name}
          </h3>
          <p className="text-sm leading-relaxed text-gray-600 sm:text-base">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
