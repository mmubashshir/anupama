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
    <div className="group flex flex-col gap-8 border-b border-gray-200 bg-white pb-4 hover:cursor-pointer md:gap-0 md:border-0">
      {/* Image */}
      <div className="relative">
        <Image
          src={image}
          alt="Main news image"
          width={700}
          height={300}
          className="aspect-[3/2] w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20 transition-opacity duration-300 group-hover:bg-black/10" />
      </div>

      <div className="z-10 ml-auto flex w-full flex-col gap-2 bg-white md:-mt-16 md:w-[90%] md:p-4 md:text-left">
        <span className="text-base text-black">{category}</span>
        <h2 className="mt-1 text-lg font-extrabold underline-offset-4 group-hover:underline md:text-2xl">
          {headline}
        </h2>
        <WPContentRenderer
          className="mt-2 text-sm text-gray-500"
          content={writerName}
        />
      </div>
    </div>
  );
}

export default StoryCard;
