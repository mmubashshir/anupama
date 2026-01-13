import * as Sentry from '@sentry/nextjs';

import { env } from '~/env';

import { graphql, query } from '~/utils/graphql-client';
import { tryCatch } from '~/utils/try-catch';

export async function createNewViewEvent(postId: number) {
  const url = new URL(
    `/wp-json/wordpress-popular-posts/v2/views/${postId}`,
    env.NEXT_PUBLIC_WORDPRESS_BASE_URL,
  );
  const tryCatchResponse = await tryCatch(fetch(url, { method: 'POST' }));

  if (tryCatchResponse.error) {
    console.error(
      'Error creating view event:',
      JSON.stringify(tryCatchResponse.error),
    );

    return false;
  }

  if (!tryCatchResponse.data.ok) {
    console.warn(
      'Failed to create view event, response status:',
      tryCatchResponse.data.status,
    );
    console.warn('Response text:', await tryCatchResponse.data.json());

    return false;
  }

  return true;
}

const GET_POPULAR_POSTS_QUERY = graphql(`
  query GetPopularPosts($ids: [ID]) {
    posts(where: { in: $ids }) {
      nodes {
        id
        title
        slug
        date
        excerpt
        commentCount
        author {
          node {
            name
          }
        }
        featuredImage {
          node {
            sourceUrl
          }
        }
        categories {
          nodes {
            name
            slug
          }
        }
        authorinfo {
          writtenBy
          writerImage {
            node {
              mediaItemUrl
            }
          }
        }
      }
    }
  }
`);

const GET_CATEGORIES_QUERY = graphql(`
  query GetCategories {
    categories {
      nodes {
        name
        databaseId
      }
    }
  }
`);

export async function fetchPopularPosts(categories?: string[]) {
  const url = new URL(
    '/wp-json/wordpress-popular-posts/v1/popular-posts',
    env.NEXT_PUBLIC_WORDPRESS_BASE_URL,
  );

  url.searchParams.set('range', 'last7days');

  if (categories) {
    const { data } = await query({ query: GET_CATEGORIES_QUERY });

    const requiredCategories = data.categories?.nodes
      .filter((category) => categories.includes(category.name ?? ''))
      .reduce((prev, category) => `${prev},${category.databaseId}`, '');

    url.searchParams.set('term_id', requiredCategories ?? '');
  }

  const { data: popularPostsData, error: popularPostsError } = await tryCatch(
    fetch(url),
  );

  if (popularPostsError) {
    console.error(
      'Error fetching popular posts:',
      JSON.stringify(popularPostsError),
    );

    return [];
  }

  const popularPosts = (await popularPostsData.json()) as
    | { id: number }[]
    | undefined;
  const popularPostsIds = popularPosts?.map((post) => String(post.id)) ?? [];

  const { data: fetchedPopularPosts, error: fetchedPopularPostsError } =
    await tryCatch(
      query({
        query: GET_POPULAR_POSTS_QUERY,
        variables: { ids: popularPostsIds },
      }),
    );

  if (fetchedPopularPostsError) {
    console.error(
      'Error fetching popular posts details:',
      fetchedPopularPostsError,
    );

    return [];
  }

  if (!fetchedPopularPosts.data.posts) {
    console.warn('No popular posts found or invalid response structure');

    Sentry.captureMessage('Invalid popular posts response structure', {
      level: 'warning',
      extra: {
        popularPostsIds,
      },
    });

    return [];
  }

  return fetchedPopularPosts.data.posts.nodes.toSorted(
    (a, b) => popularPostsIds.indexOf(a.id) - popularPostsIds.indexOf(b.id),
  );
}
