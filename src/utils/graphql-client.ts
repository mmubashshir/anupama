import { HttpLink } from '@apollo/client';
import {
  ApolloClient,
  InMemoryCache,
  registerApolloClient,
} from '@apollo/client-integration-nextjs';
import { initGraphQLTada, readFragment } from 'gql.tada';

import { env } from '~/env';

import type { introspection } from '../graphql-env.d.ts';

const { query } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: env.NEXT_PUBLIC_WORDPRESS_BASE_URL,
      fetchOptions: {},
    }),
  });
});

/* Inorder to this to work proper gql.tada config should be done
   graphql intropesction can be done via
   pnpm gql-tada generate schema 'http://api.test/graphql' --output './schema.graphql' command
*/

const graphql = initGraphQLTada<{
  introspection: introspection;
}>();

export type { FragmentOf, ResultOf, VariablesOf } from 'gql.tada';

export { graphql, query, readFragment };
