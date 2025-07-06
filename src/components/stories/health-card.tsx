import Image from 'next/image';

interface HealthCardProps {
  name: string;
  description: string;
  imageUrl: string;
  author: string;
}

export default function HealthCard({
  name,
  description,
  imageUrl,
  author,
}: HealthCardProps) {
  return (
    <div className="border border-gray-200 bg-white p-6 shadow-sm transition-shadow duration-200 hover:shadow-md">
      <div className="flex items-start gap-4">
        {/* Profile Image */}
        <div className="relative h-32 w-32 flex-shrink-0 overflow-hidden sm:h-40 sm:w-40 md:h-48 md:w-48">
          <Image
            src={imageUrl}
            alt={name}
            fill
            sizes="(max-width: 640px) 128px,
                   (max-width: 768px) 160px,
                   192px"
            className="object-cover transition-transform duration-300 group-hover:brightness-[1.1]"
          />
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <h3 className="mb-2 text-lg font-semibold text-gray-900 sm:text-xl">
            {name}
          </h3>

          <p className="text-sm leading-relaxed text-gray-600 sm:text-base">
            {description}
          </p>

          {author ? (
            <div className="text-sm text-gray-500">~{author}</div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
