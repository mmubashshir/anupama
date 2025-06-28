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
        customFields {
          youtubeVideoUrl
        }
        commentCount
      }
    }
  }
`);

const ALL_POSTS_QUERY = graphql(`
  query FetchLimitedPosts {
    posts {
      nodes {
        id
        title
        date
        content
        excerpt
        featuredImage {
          node {
            uri
          }
        }
        customFields {
          youtubeVideoUrl
        }
      }
    }
  }
`);

export async function fetchLimitedPosts(
  args: VariablesOf<typeof LIMITED_POSTS_QUERY>,
): Promise<ResultOf<typeof LIMITED_POSTS_QUERY>> {
  const { data } = await query({
    query: LIMITED_POSTS_QUERY,
    variables: args,
  });

  return data;
}

export async function fetchAllPosts() {
  const { data } = await query({
    query: ALL_POSTS_QUERY,
  });

  return data;
}
