import { HttpLink } from '@apollo/client';
import {
  ApolloClient,
  InMemoryCache,
  registerApolloClient,
} from '@apollo/client-integration-nextjs';
import { initGraphQLTada, readFragment } from 'gql.tada';

import { env } from '~/env';

import type { introspection } from '../graphql-env.d.ts';
import type { TypedDocumentNode } from '@apollo/client';
import type {
  FragmentOf,
  ResultOf,
  TadaDocumentNode,
  VariablesOf,
} from 'gql.tada';

const { query: apolloQuery } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: env.NEXT_PUBLIC_WORDPRESS_BASE_URL,
      fetchOptions: {},
    }),
  });
});

const graphql = initGraphQLTada<{
  introspection: introspection;
}>();

export { graphql, readFragment };

type ApolloCompatibleDocument<TData, TVariables> = TadaDocumentNode<
  TData,
  TVariables
> &
  TypedDocumentNode<TData, TVariables>;

export async function query<TData, TVariables>(
  options: Parameters<typeof apolloQuery>[0] & {
    query: ApolloCompatibleDocument<TData, TVariables>;
    variables?: TVariables;
  },
): Promise<{ data: TData; errors?: unknown[] }> {
  const result = await apolloQuery(options);

  if (result.errors) {
    return {
      data: result.data,
      errors: [...result.errors],
    };
  }

  return {
    data: result.data,
  };
}

export type { FragmentOf, ResultOf, VariablesOf };
