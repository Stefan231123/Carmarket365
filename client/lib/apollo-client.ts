import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

function getGraphQLEndpoint(): string {
  const envEndpoint = import.meta.env.VITE_GRAPHQL_ENDPOINT;
  if (envEndpoint) return envEndpoint;
  if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
    return 'https://api.carmarket365.com/graphql';
  }
  return 'http://localhost:3002/graphql';
}

const httpLink = createHttpLink({
  uri: getGraphQLEndpoint(),
  credentials: 'include', // Send httpOnly cookies with every request
});

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all',
    },
    query: {
      errorPolicy: 'all',
    },
  },
});

export default apolloClient;