'use client';

import { blogPosts } from '~/constants/blog-posts';
import { categoryPosts } from '~/constants/category-posts';
import { Calendar, ChevronRight, MessageCircle, Tag, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Blog() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-20 md:py-16">
      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="w-full lg:w-2/3">
          {/* Blog Posts */}
          <div className="flex flex-col gap-12">
            {categoryPosts.map((post) => (
              <div key={post.id} className="flex flex-col">
                <div className="overflow-hidden rounded-lg">
                  <Image
                    src={post.featuredImage}
                    alt={post.title}
                    width={400}
                    height={250}
                    className="h-full w-full object-cover transition duration-400 hover:scale-110 hover:brightness-75"
                  />
                </div>
                <Link href="#" className="duration-300 hover:text-red-500">
                  <h2 className="mt-6 text-3xl font-bold">{post.title}</h2>
                </Link>
                <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <User size={16} />
                    <Link href="#" className="duration-300 hover:text-red-500">
                      <span>{post.author}</span>
                    </Link>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar size={16} />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle size={16} />
                    <span>{post.comments} Comments</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Tag size={16} />
                    <Link href="#" className="duration-300 hover:text-red-500">
                      <span>{post.categories.join(', ')}</span>
                    </Link>
                  </div>
                </div>
                <p className="text-md mt-6 line-clamp-5 text-gray-600">
                  {post.excerpt}
                </p>
                <div className="mt-4">
                  <Link
                    href={`/blog/${blogPosts[0].slug}`}
                    className="inline-flex w-fit items-center gap-2 border border-gray-300 px-8 py-3 text-gray-500 transition-colors duration-300 hover:bg-red-500 hover:text-white"
                  >
                    Continue Reading <ChevronRight size={16} />
                  </Link>
                </div>
                {/* Divider */}
                <div className="mt-12 border-b border-gray-200" />
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-1/3">
          <div className="sticky top-8">
            <div className="space-y-8">
              {/* Recent Posts */}
              <div className="rounded-md border-1 border-gray-200 p-8">
                <h3 className="mb-4 inline-block border-b-2 border-red-500 pb-2 text-xl font-bold">
                  Recent posts
                </h3>
                <div className="space-y-4">
                  {blogPosts.map((post, index) => (
                    <div
                      key={post.id}
                      className={`flex gap-4 ${index !== blogPosts.length - 1 ? 'border-b border-gray-200 pb-4' : ''}`}
                    >
                      <Image
                        src={post.featuredImage}
                        alt={post.title}
                        width={70}
                        height={70}
                        className="rounded-md object-cover"
                      />
                      <div>
                        <Link
                          href={`/blog/${post.slug}`}
                          className="text-sm font-medium"
                        >
                          {post.title}
                          <p className="mt-1 text-xs text-gray-500 hover:text-red-500">
                            {post.date}
                          </p>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Popular Tags */}
              <div className="rounded-md border-1 border-gray-200 p-8">
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
                      href="#"
                      className="rounded-md border-1 border-gray-200 p-1 px-3 text-sm text-gray-500 hover:text-red-500"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
