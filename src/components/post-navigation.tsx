'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface Post {
  slug: string;
  title: string;
}

interface PostNavigationProps {
  previousPost?: Post;
  nextPost?: Post;
  category: string;
}

export default function PostNavigation({
  previousPost,
  nextPost,
  category,
}: PostNavigationProps) {
  return (
    <div className="flex flex-col justify-between gap-8 py-10 md:flex-row">
      {/* Previous Post */}
      {previousPost ? (
        <Link
          href={`/${category}/${previousPost.slug}`}
          className="group flex w-full items-center md:w-1/2"
        >
          <div className="grid h-22 w-22 shrink-0 place-items-center border border-gray-200 bg-white">
            <ChevronLeft
              className="text-xl text-gray-500 transition-all duration-200 ease-in-out group-hover:scale-110 group-hover:text-red-500"
              stroke="currentColor"
            />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium tracking-wide text-red-500 uppercase">
              Previous Post
            </p>
            <h4 className="mt-1 text-lg leading-snug font-semibold text-gray-900">
              {previousPost.title}
            </h4>
          </div>
        </Link>
      ) : (
        <div className="flex-1" />
      )}

      {/* Next Post */}
      {nextPost ? (
        <Link
          href={`/${category}/${nextPost.slug}`}
          className="group flex w-full items-center justify-end text-right md:w-1/2"
        >
          <div className="mr-4">
            <p className="text-sm font-medium tracking-wide text-red-500 uppercase">
              Next Post
            </p>
            <h4 className="mt-1 text-lg leading-snug font-semibold text-gray-900">
              {nextPost.title}
            </h4>
          </div>
          <div className="grid h-22 w-22 shrink-0 place-items-center border border-gray-200 bg-white">
            <ChevronRight
              className="text-xl text-gray-500 transition-all duration-200 ease-in-out group-hover:scale-110 group-hover:text-red-500"
              stroke="currentColor"
            />
          </div>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
    </div>
  );
}
