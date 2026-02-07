import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

function getGraphQLEndpoint(): string {
  const envEndpoint = import.meta.env.VITE_GRAPHQL_ENDPOINT;
  if (envEndpoint) return envEndpoint;
  if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
    return 'https://carmarket365-production.up.railway.app/graphql';
  }
  return 'http://localhost:3002/graphql';
}

const httpLink = createHttpLink({
  uri: getGraphQLEndpoint(),
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('authToken');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
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