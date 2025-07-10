'use client';

import Image from 'next/image';

import WPContentRenderer from '~/components/wp-content-renderer';

export interface StoryCardProps {
  image: string;
  category: string;
  headline: string;
  writerName: string;
}

function StoryCard({ image, category, headline, writerName }: StoryCardProps) {
  return (
    <div className="group flex flex-col bg-white pb-4 hover:cursor-pointer">
      {/* Image */}
      <div className="relative">
        <Image
          src={image}
          alt="Main news image"
          width={700}
          height={300}
          className="aspect-[3/2] w-full object-cover group-hover:brightness-[1.1]"
        />
      </div>

      <div className="z-10 ml-auto flex w-full flex-col bg-white md:-mt-16 md:w-[90%] md:p-4 md:text-left">
        <span className="text-sm font-semibold text-gray-500">{category}</span>
        <h2 className="mt-1 text-lg font-extrabold decoration-1 underline-offset-4 group-hover:underline md:text-2xl">
          {headline}
        </h2>
        <WPContentRenderer
          className="text-sm text-gray-500"
          content={`~${writerName}`}
        />
      </div>
    </div>
  );
}

export default StoryCard;
