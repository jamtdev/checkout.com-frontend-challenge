import { useMemo } from 'react';
import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { AppProps } from 'next/app';

let apolloClient: ApolloClient<NormalizedCacheObject>;

/**
 * Create an Apollo Client instance.
 */
function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: createIsomorphLink(),
    cache: new InMemoryCache(),
  });
}

/**
 * Returns an isomorphic link to the endpoint's GraphQL schema depending on whether we are running on the server or client.
 */
function createIsomorphLink() {
  if (typeof window === 'undefined') {
    const { SchemaLink } = require('@apollo/client/link/schema');
    const { schema } = require('./schema');

    return new SchemaLink({ schema });
  } else {
    const { HttpLink } = require('@apollo/client/link/http');

    return new HttpLink({
      uri: '/api/graphql',
      credentials: 'same-origin',
    });
  }
}

/**
 * Creates a new Apollo Client instance if one doesn't already exist.
 * If one exists, merges any pre-existing cache with the existing state.
 */
export function initialiseApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }

  if (typeof window === 'undefined') return _apolloClient;

  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

/**
 * Fetches an Apollo Client instance.
 * The client instance will only update if the cache changes.
 */
export function useApollo(initialState: AppProps['pageProps']) {
  const store = useMemo(() => initialiseApollo(initialState), [initialState]);

  return store;
}
