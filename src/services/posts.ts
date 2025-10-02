import 'server-only';

import { graphql, query } from '~/utils/graphql-client';

import type { ResultOf, VariablesOf } from '~/utils/graphql-client';

interface FetchAllPostsOptions {
  filter?: {
    categoryName?: string;
    categoryNameNotIn?: string[];
  };
}

export const LIMITED_POSTS_QUERY = graphql(`
  query FetchLimitedPosts(
    $first: Int
    $filter: RootQueryToPostConnectionWhereArgs
  ) {
    posts(first: $first, where: $filter) {
      nodes {
        id
        slug
        title
        date
        content
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
            mediaDetails {
              sizes {
                sourceUrl
                fileSize
                name
              }
            }
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
        addetails {
          adImage {
            node {
              mediaItemUrl
            }
          }
          adLink
        }
      }
      pageInfo {
        offsetPagination {
          total
          hasMore
          hasPrevious
        }
      }
    }
  }
`);

const FETCH_POST_BY_SLUG_QUERY = graphql(`
  query GetPostBySlug($slug: String!) {
    postBy(slug: $slug) {
      id
      databaseId
      title
      slug
      date
      content
      commentCount
      comments {
        nodes {
          id
          content
          author {
            name
            email
          }
          date
          dateGmt
        }
      }
      author {
        node {
          name
        }
      }
      featuredImage {
        node {
          sourceUrl
          mediaDetails {
            sizes {
              sourceUrl
              fileSize
              name
            }
          }
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
      categories {
        nodes {
          name
          slug
        }
      }
    }
  }
`);

const FETCH_ALL_POSTS_QUERY = graphql(`
  query FetchAllPosts($filter: RootQueryToPostConnectionWhereArgs) {
    posts(where: $filter) {
      nodes {
        id
        title
        slug
        date
        content
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
          }
        }
      }
    }
  }
`);

export async function fetchLimitedPosts(
  args: VariablesOf<typeof LIMITED_POSTS_QUERY>,
): Promise<ResultOf<typeof LIMITED_POSTS_QUERY>> {
  const result = await query({
    query: LIMITED_POSTS_QUERY,
    variables: args,
  });

  return result.data;
}

export async function fetchPostBySlug(
  slug: string,
): Promise<NonNullable<ResultOf<typeof FETCH_POST_BY_SLUG_QUERY>['postBy']>> {
  const result = await query({
    query: FETCH_POST_BY_SLUG_QUERY,
    variables: { slug },
  });

  if (!result.data.postBy) {
    throw new Error('Post not found');
  }

  return result.data.postBy;
}

export async function fetchAllPosts(
  options?: FetchAllPostsOptions,
): Promise<
  NonNullable<ResultOf<typeof FETCH_ALL_POSTS_QUERY>['posts']>['nodes']
> {
  const result = await query({
    query: FETCH_ALL_POSTS_QUERY,
    variables: {
      filter: options?.filter ?? {},
    },
  });

  return result.data.posts?.nodes ?? [];
}
