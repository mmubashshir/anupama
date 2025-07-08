import { fetchLimitedPosts } from '~/services/posts';

export async function fetchAllPostsOffset(batch = 100) {
  const posts = [];
  let offset = 0;
  let hasMore = true;

  while (hasMore) {
    const result = await fetchLimitedPosts({
      filter: {
        offsetPagination: { offset, size: batch },
      },
    });

    const connection = result.posts;

    if (!connection) break;

    posts.push(...connection.nodes);
    hasMore = connection.pageInfo.offsetPagination?.hasMore ?? false;
    offset += batch;
  }

  return posts;
}
