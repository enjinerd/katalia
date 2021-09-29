import React from 'react';
import ReactDOM from 'react-dom';
import { Helmet } from 'react-helmet';

import '@/index.css';
import App from '@/App';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: import.meta.env.VITE_GRAPHQL_SERVER,
  cache: new InMemoryCache(),
  headers: {
    'content-type': 'application/json',
    'x-hasura-admin-secret':
      'VI8JGIUI3DdF6t2IOZAk2pvL3c8Mdi8vtybvt11qVnAYv2fDKlUaxLd1xTxw8A6p',
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Helmet
      defaultTitle='1Liner - Find one line JS Snippet'
      titleTemplate='%s | Vite React Tailwind Starter'
    >
      <meta charSet='utf-8' />
      <html lang='id' amp />
    </Helmet>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
