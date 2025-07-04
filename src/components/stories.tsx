import { CATEGORY } from '~/enum/categories';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

import { getPlaceholderImage } from '~/utils/get-placeholder-image';

import { fetchLimitedPosts } from '~/services/posts';

import StoryCard from './stories/story-card';

export const revalidate = 240; // Revalidate every 4 minutes

export default async function Stories() {
  const [storyWorldResponse, childrenStoryResponse] = await Promise.allSettled([
    fetchLimitedPosts({
      first: 1,
      filter: { categoryName: CATEGORY.StoryWorld },
    }),
    fetchLimitedPosts({
      first: 1,
      filter: { categoryName: CATEGORY.ChildrensArena },
    }),
  ]);

  if (
    storyWorldResponse.status === 'rejected' ||
    childrenStoryResponse.status === 'rejected'
  ) {
    return (
      <div className="mx-auto max-w-6xl bg-white p-4 sm:px-6 lg:px-8">
        <h1 className="text-center text-2xl font-bold text-red-500">
          ದೋಷ ಸಂಭವಿಸಿದೆ, ದಯವಿಟ್ಟು ಸ್ವಲ್ಪ ಸಮಯದ ನಂತರ ಪ್ರಯತ್ನಿಸಿ.
        </h1>
      </div>
    );
  }

  const storyWorldPost = storyWorldResponse.value.posts?.nodes ?? [];

  const childrenStoryPost = childrenStoryResponse.value.posts?.nodes ?? [];

  return (
    <div className="mx-auto max-w-6xl bg-white p-4 sm:px-6 lg:px-8 lg:py-10">
      <div className="pb-4">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-extrabold md:text-5xl">ಕಥೆಗಳು</h1>
          <Link
            href="/stories"
            className="group ml-auto flex items-center text-sm font-semibold decoration-1 underline-offset-4 hover:underline"
          >
            ಇನ್ನಷ್ಟು
            <ArrowUpRight className="mb-0.5 ml-1 inline h-4 w-4" />
          </Link>
        </div>
      </div>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {storyWorldPost.map((post) => (
          <Link key={post.slug} href={`/${CATEGORY.StoryWorld}/${post.slug}`}>
            <StoryCard
              key={post.id}
              image={
                post.featuredImage?.node.sourceUrl ?? getPlaceholderImage()
              }
              category={post.categories?.nodes[0]?.name ?? ''}
              headline={post.title ?? ''}
              writerName={post.author?.node.name ?? ''}
            />
          </Link>
        ))}

        {childrenStoryPost.map((post) => (
          <Link
            key={post.slug}
            href={`/${CATEGORY.ChildrensArena}/${post.slug}`}
          >
            <StoryCard
              key={post.id}
              image={
                post.featuredImage?.node.sourceUrl ?? getPlaceholderImage()
              }
              category={post.categories?.nodes[0]?.name ?? ''}
              headline={post.title ?? ''}
              writerName={post.author?.node.name ?? ''}
            />
          </Link>
        ))}
      </section>
    </div>
  );
}
