import React from 'react';
import ReactDOM from 'react-dom';
import { Helmet } from 'react-helmet';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { store, persistor } from '@/store/';
import { PersistGate } from 'redux-persist/lib/integration/react';

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
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
