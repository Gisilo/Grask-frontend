import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import Cookies from 'js-cookie'

import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { ApolloLink, concat } from 'apollo-link';

import { InMemoryCache } from 'apollo-cache-inmemory'


const httpLink = createHttpLink({
    uri: '/graphql',
    credentials: 'same-origin'
});


const csrfMiddleware = new ApolloLink((operation, forward) => {
    let csrftoken = Cookies.get('csrftoken');
    console.log('cookie', csrftoken);
    operation.setContext(({ headers = {} }) => ({
        headers: {
            ...headers,
            "X-CSRFTOKEN": csrftoken,
        }
    }));

    return forward(operation);
});

// Disable cache when load the same Grabit project
const DefaultOptions = {
    watchQuery: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'ignore',
    },
    query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
    },
};

const client = new ApolloClient({
    link: concat(csrfMiddleware, httpLink),
    //link: httpLink,
    cache: new InMemoryCache(),
    defaultOptions: DefaultOptions,
});

ReactDOM.render(
  <React.StrictMode>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
