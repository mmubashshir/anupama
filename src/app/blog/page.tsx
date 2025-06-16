import { blogPosts } from '~/constants/blog-posts';
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Tag,
  User,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import WPContentRenderer from '~/components/wp-content-renderer';

import { getPlaceholderImage } from '~/utils/get-placeholder-image';

import { fetchLimitedPosts } from '~/services/posts';

export default async function Blog() {
  const { posts } = await fetchLimitedPosts({ limit: 1 });

  if (!posts?.nodes) {
    return (
      <div className="text-center text-6xl text-red-500">
        Some error occured
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 md:px-20 md:py-16">
      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Main Content */}
        <div className="w-full lg:w-2/3">
          <div className="space-y-12">
            {posts.nodes.map((post) => (
              <article key={post.title} className="pb-8">
                <div className="mb-4 overflow-hidden">
                  <Image
                    src={
                      post.featuredImage?.node.sourceUrl ??
                      getPlaceholderImage()
                    }
                    alt={post.title ?? ''}
                    width={800}
                    height={400}
                    className="h-auto w-full object-cover"
                  />
                </div>

                <h2 className="mb-2 text-3xl font-bold">{post.title} </h2>

                <div className="mb-4 flex flex-wrap gap-4 text-gray-500">
                  <div className="flex items-center gap-1">
                    <User className="h-5 w-5 text-red-500" />
                    <span>{post.author?.node.name}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-5 w-5 text-red-500" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Tag className="h-5 w-5 text-red-500" />
                    <span>
                      {post.categories?.nodes.map((itm) => itm.name).join(', ')}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="h-5 w-5 text-red-500" />
                    <span>{post.commentCount} Comments</span>
                  </div>
                </div>

                <WPContentRenderer
                  content={post.content}
                  className="mb-4 whitespace-pre-line"
                />
              </article>
            ))}
          </div>

          {/* Leave a Comment */}
          <div className="mt-16 border-t-1 border-gray-200 pt-8">
            <h3 className="mb-6 text-xl font-bold">Leave A Comment</h3>
            <form className="space-y-4">
              <textarea
                className="w-full resize-none border border-gray-300 p-3 text-sm focus:ring-1 focus:ring-red-400 focus:outline-none"
                rows={5}
                placeholder="Type your comment here..."
              />

              <input
                type="text"
                className="w-full border border-gray-300 p-3 text-sm focus:ring-1 focus:ring-red-400 focus:outline-none"
                placeholder="Your Name..."
              />

              <input
                type="email"
                className="w-full border border-gray-300 p-3 text-sm focus:ring-1 focus:ring-red-400 focus:outline-none"
                placeholder="Your Email..."
              />

              <input
                type="url"
                className="w-full border border-gray-300 p-3 text-sm focus:ring-1 focus:ring-red-400 focus:outline-none"
                placeholder="Your Website..."
              />

              <label className="flex items-center space-x-2 text-sm text-gray-600">
                <input
                  type="checkbox"
                  className="cursor-pointer accent-red-500"
                />
                <span>
                  Save my name, email, and website in this browser for the next
                  time I comment.
                </span>
              </label>

              <Link
                href="#"
                className="bg-red-600 px-4 py-1 text-white transition hover:bg-red-700"
              >
                Post Comment
              </Link>
            </form>
          </div>

          {/* Post Navigation */}
          <div className="mt-20 flex flex-col justify-between gap-8 pt-4 md:flex-row">
            {/* Previous Post */}
            <a
              href="/previous-post-slug"
              className="group flex items-center space-x-4"
            >
              <div className="grid h-12 w-12 place-items-center border border-gray-200">
                <span className="text-xl text-gray-500 transition-transform group-hover:-translate-x-1">
                  <ChevronLeft />
                </span>
              </div>
              <div>
                <p className="text-sm text-red-600 uppercase">Previous Post</p>
                <h4 className="leading-snug font-semibold text-black">
                  Amazing View! Catch the sunrise
                </h4>
              </div>
            </a>

            {/* Next Post */}
            <a
              href="/next-post-slug"
              className="group flex items-center justify-end space-x-4 text-right"
            >
              <div>
                <p className="text-sm text-red-600 uppercase">Next Post</p>
                <h4 className="leading-snug font-semibold text-black">
                  Bhutan! The happiest country on the world
                </h4>
              </div>
              <div className="grid h-12 w-12 place-items-center border border-gray-200">
                <span className="text-xl text-gray-500 transition-transform group-hover:translate-x-1">
                  <ChevronRight />
                </span>
              </div>
            </a>
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
