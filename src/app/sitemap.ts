import { BASE_URL } from '~/constants';

import { fetchAllPostsOffset } from '~/utils/fetch-all-posts-wp';

import type { MetadataRoute } from 'next';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const base = process.env.NEXT_PUBLIC_SITE_URL ?? BASE_URL;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await fetchAllPostsOffset();

  return posts.map((post) => {
    const lastModified = post.date
      ? new Date(post.date).toISOString()
      : undefined;

    return {
      url: `${base}/${post.categories?.nodes[0]?.slug ?? 'uncategorized'}/${post.slug}`,
      lastModified,
      priority: 0.7,
    };
  });
}
