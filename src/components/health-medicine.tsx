import { Fragment } from 'react';
import { CATEGORY } from '~/enum/categories';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

import { getPlaceholderImage } from '~/utils/get-placeholder-image';

import { fetchLimitedPosts } from '~/services/posts';

import HealthCard from './health-medicine/health-card';

export default async function HealthAndMedicine() {
  const { posts: healthPostsRaw } = await fetchLimitedPosts({
    first: 2,
    filter: {
      categoryName: CATEGORY.Health,
    },
  });

  const { posts: medicinePostsRaw } = await fetchLimitedPosts({
    first: 2,
    filter: {
      categoryName: CATEGORY.Medicine,
    },
  });

  const healthPosts = healthPostsRaw?.nodes ?? [];
  const medicinePosts = medicinePostsRaw?.nodes ?? [];

  // Combine all posts
  const allPosts = [
    ...healthPosts.map((post) => ({ ...post, categoryType: CATEGORY.Health })),
    ...medicinePosts.map((post) => ({
      ...post,
      categoryType: CATEGORY.Medicine,
    })),
  ];

  return (
    <div className="mx-auto max-w-6xl bg-white p-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Aarogya */}
        <div className="pr-6">
          {/* Header */}
          <div className="pb-4 lg:pt-4">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-extrabold md:text-5xl">ಆರೋಗ್ಯ</h1>
              <Link
                href={`/${CATEGORY.Health}`}
                className="ml-auto flex items-center text-sm font-semibold decoration-1 underline-offset-4 hover:underline"
              >
                ಇನ್ನಷ್ಟು
                <ArrowUpRight className="mb-0.5 ml-1 inline h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* All Posts in Single Grid */}
          <div className="grid grid-cols-1">
            {healthPosts.map((post, index) => (
              <Fragment key={post.id}>
                <Link href={`/${CATEGORY.Health}/${post.slug}`}>
                  <HealthCard
                    name={post.title ?? 'Untitled'}
                    category={post.categories?.nodes[0]?.name ?? ''}
                    description={post.excerpt ?? ''}
                    imageUrl={
                      post.featuredImage?.node.sourceUrl ??
                      getPlaceholderImage()
                    }
                  />
                </Link>
                {index === 0 && <hr className="mb-2 border-gray-300" />}
              </Fragment>
            ))}
          </div>
        </div>

        {/* Vaidyakiya */}
        <div className="border-l border-gray-300 pl-6">
          <div className="pb-4 lg:pt-4">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-extrabold md:text-5xl">ವೈದ್ಯಕೀಯ</h1>
              <Link
                href={`/${CATEGORY.Health}`}
                className="ml-auto flex items-center text-sm font-semibold decoration-1 underline-offset-4 hover:underline"
              >
                ಇನ್ನಷ್ಟು
                <ArrowUpRight className="mb-0.5 ml-1 inline h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* All Posts in Single Grid */}
          <div className="grid grid-cols-1">
            {medicinePosts.map((post, index) => (
              <Fragment key={post.id}>
                <Link href={`/${CATEGORY.Medicine}/${post.slug}`}>
                  <HealthCard
                    name={post.title ?? 'Untitled'}
                    category={post.categories?.nodes[0]?.name ?? ''}
                    description={post.excerpt ?? ''}
                    imageUrl={
                      post.featuredImage?.node.sourceUrl ??
                      getPlaceholderImage()
                    }
                  />
                </Link>
                {index === 0 && <hr className="mb-2 border-gray-300" />}
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
