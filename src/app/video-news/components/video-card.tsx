import { Play } from 'lucide-react';
import Image from 'next/image';

interface VideoCardProps {
  title: string;
  imageUrl: string;
}

export default function VideoCard({ title, imageUrl }: VideoCardProps) {
  return (
    <div className="border-b border-gray-200 py-4 last:border-b-0">
      <div className="group flex cursor-pointer flex-row-reverse items-start gap-3">
        {/* Image with overlay */}
        <div className="relative flex-shrink-0">
          <Image
            src={imageUrl || '/placeholder.svg'}
            alt={title}
            width={120}
            height={80}
            className="h-[80px] w-[120px] object-cover"
          />
          <div className="absolute inset-0 bg-black/20 transition-opacity duration-300 group-hover:bg-black/10" />

          {/* Play icon */}
          <div className="absolute top-2 right-2">
            <div className="rounded-full bg-red-500 p-2 opacity-90 shadow-md">
              <Play className="h-4 w-4 text-black" fill="black" />
            </div>
          </div>
        </div>

        {/* Text */}
        <div className="text-left">
          <span className="text-sm font-medium">ವಿಡಿಯೋ</span>
          <h3 className="mt-1 text-lg leading-tight font-extrabold decoration-1 underline-offset-4 group-hover:underline md:text-xl">
            {title}
          </h3>
        </div>
      </div>
    </div>
  );
}
