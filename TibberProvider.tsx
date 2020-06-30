import React, { useContext, useMemo, useState, useEffect } from 'react';
import { AsyncStorage } from 'react-native';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { split } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { setContext } from 'apollo-link-context';
import { ApolloProvider } from '@apollo/react-hooks';

interface Props {
  children: any;
}

const TibberContext = React.createContext({ accessToken: undefined });

export const TibberProvider = (props: Props) => {
  const [accessToken, setAccessToken] = useState<string>('');

  const httpLink = new HttpLink({ uri: `https://api.tibber.com/v1-beta/gql` });
  const wsLink = new WebSocketLink({
    uri: `wss://api.tibber.com/v1-beta/gql/subscriptions`,
    options: {
      reconnect: true,
      connectionParams: {
        token: `${accessToken}`,
      },
    },
  });

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: `Bearer ${accessToken}`,
      },
    };
  });

  const link = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    authLink.concat(httpLink)
  );

  const cache = new InMemoryCache();

  const apolloClient = new ApolloClient({
    cache,
    link,
  });

  useEffect(() => {
    AsyncStorage.getItem('tibber-access-token').then((data) => {
      if (data) {
        setAccessToken(JSON.parse(data));
      }
    });
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('tibber-access-token', JSON.stringify(accessToken));
  }, [accessToken]);

  const value = useMemo(() => {
    return { accessToken, setAccessToken };
  }, [accessToken]);

  return (
    <TibberContext.Provider value={value}>
      <ApolloProvider client={apolloClient}>{props.children}</ApolloProvider>
    </TibberContext.Provider>
  );
};

const useTibber: any = () => useContext(TibberContext);
export { TibberContext, useTibber };
export default TibberProvider;
