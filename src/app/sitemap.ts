import { BASE_URL } from '~/constants';

import { fetchAllPosts } from '~/services/posts';

import type { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await fetchAllPosts();

  return [
    { url: `${BASE_URL}/`, lastModified: new Date() },

    ...posts.map((post) => ({
      url: `${BASE_URL}/posts/${post.slug}`,
      lastModified: post.date ?? undefined,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
  ];
}
