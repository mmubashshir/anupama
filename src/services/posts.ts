import { graphql, query } from '~/utils/graphql-client';

import type { ResultOf, VariablesOf } from 'gql.tada';

const LIMITED_POSTS_QUERY = graphql(`
  query FetchLimitedPosts(
    $limit: Int!
    $filter: RootQueryToPostConnectionWhereArgs
  ) {
    posts(first: $limit, where: $filter) {
      nodes {
        id
        title
        author {
          node {
            name
          }
        }
        date
        content
        excerpt
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
        commentCount
        slug
      }
    }
  }
`);

const FETCH_POST_BY_SLUG_QUERY = graphql(`
  query GetPostBySlug($slug: String!) {
    postBy(slug: $slug) {
      id
      title
      slug
      date
      content
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
`);

const FETCH_ALL_POSTS_QUERY = graphql(`
  query FetchAllPosts {
    posts {
      nodes {
        id
        title
        slug
        date
        content
        excerpt
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

// Type-safe function for limited posts
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
): Promise<ResultOf<typeof FETCH_POST_BY_SLUG_QUERY>['postBy']> {
  const result = await query({
    query: FETCH_POST_BY_SLUG_QUERY,
    variables: { slug },
  });

  return result.data.postBy;
}

// Type-safe function for all posts
export async function fetchAllPosts(): Promise<
  NonNullable<ResultOf<typeof FETCH_ALL_POSTS_QUERY>['posts']>['nodes']
> {
  const result = await query({
    query: FETCH_ALL_POSTS_QUERY,
  });

  return result.data.posts?.nodes ?? [];
}
