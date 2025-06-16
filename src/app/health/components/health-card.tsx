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
    <div className="bg-white py-6">
      <div className="group flex cursor-pointer items-start space-x-4">
        {/* Profile Image */}
        <div className="flex-shrink-0">
          <div className="relative h-25 w-25 overflow-hidden sm:h-22 sm:w-22">
            <Image
              src={imageUrl || '/placeholder.svg'}
              alt={name}
              width={80}
              height={80}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20 transition-opacity duration-300 group-hover:bg-black/10" />
          </div>
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <h3 className="mb-2 text-lg font-black decoration-1 underline-offset-4 group-hover:underline sm:text-xl">
            {name}
          </h3>
          <p className="text-sm leading-relaxed text-black sm:text-base">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
