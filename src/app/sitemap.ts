import { fetchAllPostsOffset } from '~/utils/fetch-all-posts-wp';

import type { MetadataRoute } from 'next';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await fetchAllPostsOffset();

  return posts.map((post) => ({
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/posts/${post.slug}`,
    lastModified: post.date ?? undefined,
    priority: 0.7,
  }));
}
