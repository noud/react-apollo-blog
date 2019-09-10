import React from 'react'
import ReactDOM from 'react-dom'

import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from 'react-apollo'

import { link } from './link';

import App from './components/App'
import './index.css'

import registerServiceWorker from './registerServiceWorker'

const client = new ApolloClient({
  //  link: new HttpLink({ uri: GRAPHCMS_API }),
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