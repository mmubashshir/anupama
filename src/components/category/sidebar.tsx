'use client';

import { type CATEGORY } from '~/enum/categories';
import { Clock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { getPlaceholderImage } from '~/utils/get-placeholder-image';

interface SidebarProps {
  recentPosts: {
    id: string;
    slug: string | null;
    title: string | null;
    date: string | null;
    featuredImage?: { node: { sourceUrl: string } } | null;
  }[];
  category: CATEGORY;
}

export default function Sidebar({ recentPosts, category }: SidebarProps) {
  return (
    <div className="w-full lg:w-1/3">
      <div className="sticky top-8">
        <div className="space-y-8">
          {/* Recent Posts */}
          <div className="border border-gray-200 p-4">
            <h3 className="mb-4 inline-block border-b-2 border-red-500 pb-2 text-xl font-bold">
              ಇತ್ತೀಚಿನ ಸುದ್ದಿಗಳು
            </h3>
            <div className="space-y-4">
              {recentPosts.map((post, index) => (
                <Link
                  key={post.id}
                  href={`/${category}/${post.slug}`}
                  className={`group flex gap-4 transition ${
                    index !== recentPosts.length - 1
                      ? 'border-b border-gray-200 pb-4'
                      : ''
                  }`}
                >
                  <Image
                    src={
                      post.featuredImage?.node.sourceUrl ??
                      getPlaceholderImage()
                    }
                    alt={post.title ?? 'Post image'}
                    width={80}
                    height={80}
                    className="h-20 w-20 flex-shrink-0 object-cover"
                  />

                  <div>
                    <p className="line-clamp-3 text-sm font-medium">
                      {post.title}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      {post.date
                        ? new Date(post.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })
                        : 'Unknown date'}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Popular Tags */}
          {/* <div className="border border-gray-200 p-8">
            <h3 className="mb-4 inline-block border-b-2 border-red-500 pb-2 text-xl font-bold">
              Popular tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {[
                '2 columns posts',
                'art work',
                'booking sponsor',
                'breaking news',
                'environment',
                'food',
                'lifestyle',
                'travel',
              ].map((tag) => (
                <Link
                  key={tag}
                  href="null"
                  className="border border-gray-200 p-1 px-3 text-sm text-gray-500 hover:text-red-500"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
