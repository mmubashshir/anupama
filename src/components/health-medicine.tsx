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

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      {/* Header */}
      <header className="bg-white">
        <div className="px-4">
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-black md:text-5xl">
              ಆರೋಗ್ಯ ಮತ್ತು ವೈದ್ಯಕೀಯ
            </h1>
            <Link
              href="/category/health"
              className="ml-auto flex items-center text-sm font-semibold decoration-1 underline-offset-4 hover:underline"
            >
              ಇನ್ನಷ್ಟು
              <ArrowUpRight className="mb-0.5 ml-1 inline h-4 w-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4">
        {/* Health Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2">
          {healthPosts.map((post) => (
            <Link key={post.id} href={`/${CATEGORY.Health}/${post.slug}`}>
              <HealthCard
                name={post.title ?? 'Untitled'}
                category={post.categories?.nodes[0]?.name ?? ''}
                description={post.excerpt ?? ''}
                imageUrl={
                  post.featuredImage?.node.sourceUrl ?? getPlaceholderImage()
                }
              />
            </Link>
          ))}
        </div>

        {/* Medicine Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2">
          {medicinePosts.map((post) => (
            <Link key={post.id} href={`/${CATEGORY.Medicine}/${post.slug}`}>
              <HealthCard
                key={post.id}
                name={post.title ?? 'Untitled'}
                category={post.categories?.nodes[0]?.name ?? ''}
                description={post.excerpt ?? ''}
                imageUrl={
                  post.featuredImage?.node.sourceUrl ?? getPlaceholderImage()
                }
              />
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
