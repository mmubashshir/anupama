import { Fragment } from 'react';
import { CATEGORY } from '~/enum/categories';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

import { getPlaceholderImage } from '~/utils/get-placeholder-image';

import { fetchLimitedPosts } from '~/services/posts';

import HealthCard from './health-medicine/health-card';

export default async function HealthAndMedicine() {
  const [healthResponse, medicineResponse] = await Promise.allSettled([
    fetchLimitedPosts({
      first: 2,
      filter: {
        categoryName: CATEGORY.Health,
      },
    }),
    fetchLimitedPosts({
      first: 2,
      filter: {
        categoryName: CATEGORY.Medical,
      },
    }),
  ]);

  if (
    healthResponse.status === 'rejected' ||
    medicineResponse.status === 'rejected'
  ) {
    return (
      <div className="mx-auto max-w-6xl bg-white p-4 sm:px-6 lg:px-8">
        <h1 className="text-center text-2xl font-bold text-red-500">
          ದೋಷ ಸಂಭವಿಸಿದೆ, ದಯವಿಟ್ಟು ಸ್ವಲ್ಪ ಸಮಯದ ನಂತರ ಪ್ರಯತ್ನಿಸಿ.
        </h1>
      </div>
    );
  }

  const healthPosts = healthResponse.value.posts?.nodes ?? [];
  const medicinePosts = medicineResponse.value.posts?.nodes ?? [];

  // Combine all posts

  return (
    <div className="mx-auto max-w-6xl bg-white p-4 sm:px-6 lg:px-8">
      {/* Aarogya */}

      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="md:pr-6">
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
                    imageUrl={
                      post.featuredImage?.node.sourceUrl ??
                      getPlaceholderImage()
                    }
                    author={post.author?.node.name ?? ''}
                  />
                </Link>
                {index === 0 && <hr className="mb-2 border-gray-300" />}
              </Fragment>
            ))}
          </div>
        </div>

        {/* Vaidyakiya */}
        <div className="border-gray-300 pt-6 md:border-l-[1px] md:p-0 md:pl-6">
          <div className="pb-4 lg:pt-4">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-extrabold md:text-5xl">ವೈದ್ಯಕೀಯ</h1>
              <Link
                href={`/${CATEGORY.Medical}`}
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
                <Link href={`/${CATEGORY.Medical}/${post.slug}`}>
                  <HealthCard
                    name={post.title ?? 'Untitled'}
                    category={post.categories?.nodes[0]?.name ?? ''}
                    imageUrl={
                      post.featuredImage?.node.sourceUrl ??
                      getPlaceholderImage()
                    }
                    author={post.author?.node.name ?? ''}
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
