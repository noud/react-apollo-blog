import React from 'react'
import ReactDOM from 'react-dom'

import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from 'react-apollo'

// eslint-disable-next-line
import { HttpLink } from 'apollo-link-http'

// eslint-disable-next-line
import { link } from './link';
// eslint-disable-next-line
import { apollo, apolloClient } from './apollo';

import App from './components/App'
import './index.css'

import registerServiceWorker from './registerServiceWorker'

// eslint-disable-next-line
const GRAPHQL_API = 'http://127.0.0.1:8000/graphql'

// eslint-disable-next-line
const client = new ApolloClient({
  // link: new HttpLink({ uri: GRAPHQL_API }),
  link: link,
  cache: new InMemoryCache()
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)
registerServiceWorker()