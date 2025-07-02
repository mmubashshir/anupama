import { type CATEGORY } from '~/enum/categories';
import { Calendar, ChevronRight, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import Sidebar from '~/components/category/sidebar';
import Pagination from '~/components/pagination';
import WPContentRenderer from '~/components/wp-content-renderer';

import { getPlaceholderImage } from '~/utils/get-placeholder-image';

import { fetchLimitedPosts } from '~/services/posts';

export const revalidate = 120;

export default async function CategoryListing({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams?: Promise<{ page?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const page = parseInt(resolvedSearchParams?.page ?? '1');
  const perPage = 3;
  const offset = (page - 1) * perPage;
  const { category } = await params;

  const result = await fetchLimitedPosts({
    first: perPage,
    filter: {
      categoryName: category,
      offsetPagination: {
        offset,
        size: perPage,
      },
    },
  });

  const posts = await fetchLimitedPosts({
    first: 3,
    filter: {
      categoryName: category,
    },
  });

  const categoryPosts = result.posts?.nodes ?? [];
  const recentPosts = posts.posts?.nodes ?? [];
  const totalPosts = result.posts?.pageInfo.offsetPagination?.total ?? 0;
  const totalPages = Math.ceil(totalPosts / perPage);

  if (categoryPosts.length === 0 || recentPosts.length === 0) {
    return (
      <div className="text-center text-6xl text-red-500">
        Some error occurred
      </div>
    );
  }

  if (!categoryPosts.length)
    return (
      <div className="text-center text-6xl text-red-500">
        Some error occured
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-12 md:px-20 md:py-16">
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
                    className="h-full w-full object-cover transition duration-400 hover:scale-110 hover:brightness-75"
                  />
                </div>
                <Link
                  href={`/${category}/${post.slug}`}
                  className="duration-300 hover:text-red-500"
                >
                  <h2 className="mt-6 text-3xl font-bold">{post.title}</h2>
                </Link>
                <div className="mt-4 flex flex-wrap items-center gap-6 text-sm text-gray-500">
                  <div className="flex items-end gap-1">
                    <User className="h-4 w-4 stroke-1" />
                    <span>{post.author?.node.name}</span>
                  </div>
                  <div className="flex items-end gap-1">
                    <Calendar className="h-4 w-4 stroke-1" />
                    {post.date
                      ? new Date(post.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })
                      : 'Unknown date'}{' '}
                  </div>
                </div>
                <WPContentRenderer
                  content={post.excerpt}
                  className="text-md mt-6 line-clamp-5 text-gray-600"
                />
                <div className="mt-4">
                  <Link
                    href={`/${category}/${post.slug}`}
                    className="inline-flex w-fit items-center gap-2 border border-gray-300 px-8 py-3 text-gray-500 transition-colors duration-300 hover:bg-red-500 hover:text-white"
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
