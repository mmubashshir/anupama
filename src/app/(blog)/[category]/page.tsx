import { POSTS_PER_PAGE } from '~/constants';
import { type CATEGORY } from '~/enum/categories';
import { ChevronRight, Clock, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import Sidebar from '~/components/category/sidebar';
import Pagination from '~/components/pagination';
import WPContentRenderer from '~/components/wp-content-renderer';

import { getPlaceholderImage } from '~/utils/get-placeholder-image';

import { fetchLimitedPosts } from '~/services/posts';

export const revalidate = 60; // Revalidate every 1 minute

export default async function CategoryListing({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams?: Promise<{ page?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const page = parseInt(resolvedSearchParams?.page ?? '1');

  const offset = (page - 1) * POSTS_PER_PAGE;
  const { category } = await params;

  const [categoryPostsResponse, recentPostsResponse] = await Promise.allSettled(
    [
      fetchLimitedPosts({
        first: POSTS_PER_PAGE,
        filter: {
          categoryName: category,
          offsetPagination: {
            offset,
            size: POSTS_PER_PAGE,
          },
        },
      }),
      fetchLimitedPosts({
        first: 3,
        filter: {
          categoryName: category,
        },
      }),
    ],
  );

  if (
    categoryPostsResponse.status === 'rejected' ||
    recentPostsResponse.status === 'rejected'
  ) {
    return (
      <div className="mx-auto max-w-6xl bg-white p-4 sm:px-6 lg:px-8">
        <h1 className="text-center text-2xl font-bold text-red-500">
          ದೋಷ ಸಂಭವಿಸಿದೆ, ದಯವಿಟ್ಟು ಸ್ವಲ್ಪ ಸಮಯದ ನಂತರ ಪ್ರಯತ್ನಿಸಿ.
        </h1>
      </div>
    );
  }

  const categoryPosts = categoryPostsResponse.value.posts?.nodes ?? [];
  const recentPosts = recentPostsResponse.value.posts?.nodes ?? [];
  const totalPosts =
    categoryPostsResponse.value.posts?.pageInfo.offsetPagination?.total ?? 0;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

  if (categoryPosts.length === 0 || recentPosts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
        <h2 className="text-2xl font-semibold text-red-500">
          ದೋಷ ಸಂಭವಿಸಿದೆ, ದಯವಿಟ್ಟು ಸ್ವಲ್ಪ ಸಮಯದ ನಂತರ ಪ್ರಯತ್ನಿಸಿ.
        </h2>
        <Link
          href=""
          className="rounded-md bg-red-500 px-4 py-2 text-center text-white transition hover:bg-red-600"
        >
          Refresh
        </Link>
      </div>
    );
  }

  if (!categoryPosts.length)
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
        <h2 className="text-2xl font-semibold text-red-500">
          ದೋಷ ಸಂಭವಿಸಿದೆ, ದಯವಿಟ್ಟು ಸ್ವಲ್ಪ ಸಮಯದ ನಂತರ ಪ್ರಯತ್ನಿಸಿ.
        </h2>

        <Link
          href=""
          className="rounded-md bg-red-500 px-4 py-2 text-center text-white transition hover:bg-red-600"
        >
          Refresh
        </Link>
      </div>
    );

  return (
    <div className="mx-auto max-w-6xl p-4 sm:px-6 lg:mb-6 lg:px-8 lg:py-10">
      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="w-full lg:w-2/3">
          {/* Blog Posts */}
          <div className="flex flex-col gap-12">
            {categoryPosts.map((post, index) => (
              <div key={post.id} className="flex flex-col">
                <div className="overflow-hidden">
                  <Image
                    src={
                      post.featuredImage?.node.sourceUrl ??
                      getPlaceholderImage()
                    }
                    alt={post.title ?? ''}
                    width={400}
                    height={250}
                    className="h-full w-full object-cover transition duration-400 hover:scale-110 hover:brightness-50"
                  />
                </div>
                <Link
                  href={`/${category}/${post.slug}`}
                  className="duration-300 hover:text-red-500"
                >
                  <h2 className="mt-6 text-3xl font-bold">{post.title}</h2>
                </Link>
                <div className="mt-4 flex flex-wrap items-center gap-6 text-sm text-gray-500">
                  <div className="flex gap-1">
                    <User className="h-4 w-4 stroke-1" />
                    <span>{post.author?.node.name}</span>
                  </div>
                  <div className="flex gap-1">
                    <Clock className="h-4 w-4 stroke-1" />
                    {post.date
                      ? new Date(post.date).toLocaleString('en-IN', {
                          timeZone: 'Asia/Kolkata',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: 'numeric',
                          minute: '2-digit',
                          hour12: true,
                          timeZoneName: 'short',
                        })
                      : 'Unknown date'}
                  </div>
                </div>
                <WPContentRenderer
                  content={post.excerpt}
                  className="text-md mt-6 line-clamp-5 text-gray-600"
                />
                <div className="mt-4">
                  <Link
                    href={`/${category}/${post.slug}`}
                    className="hover:bg-primary inline-flex w-fit items-center gap-2 border border-gray-300 px-8 py-3 text-gray-500 transition-colors duration-300 hover:text-white"
                  >
                    ಓದುವುದನ್ನು ಮುಂದುವರಿಸಿ
                    <ChevronRight size={16} />
                  </Link>
                </div>
                {/* Divider */}
                {index !== categoryPosts.length - 1 && (
                  <div className="mt-12 border-b border-gray-200" />
                )}{' '}
              </div>
            ))}
          </div>
          {totalPages > 1 && (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              basePath={`/${category}`}
            />
          )}
        </div>

        {/* Sidebar */}
        <Sidebar
          recentPosts={recentPosts.map((post) => ({
            id: post.id,
            slug: post.slug,
            title: post.title,
            date: post.date,
            featuredImage: post.featuredImage
              ? {
                  node: {
                    sourceUrl:
                      post.featuredImage.node.sourceUrl ??
                      getPlaceholderImage(),
                  },
                }
              : null,
          }))}
          category={category as CATEGORY}
        />
      </div>
    </div>
  );
}
