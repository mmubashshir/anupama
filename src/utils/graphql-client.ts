import { HttpLink } from '@apollo/client';
import {
  ApolloClient,
  InMemoryCache,
  registerApolloClient,
} from '@apollo/client-integration-nextjs';

import { env } from '~/env';

const { query } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: env.NEXT_PUBLIC_WORDPRESS_BASE_URL,
      fetchOptions: {},
    }),
  });
});

export { query };
