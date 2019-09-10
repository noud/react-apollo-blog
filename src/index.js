import React from 'react'
import ReactDOM from 'react-dom'

import { ApolloClient } from 'apollo-client'
// eslint-disable-next-line
import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http'
import { WebSocketLink } from 'apollo-link-ws';
// eslint-disable-next-line
import { getMainDefinition } from 'apollo-utilities';
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from 'react-apollo'

// eslint-disable-next-line
import { ApolloLink } from 'apollo-link'
import Pusher from 'pusher'
import PusherLink from './PusherLink'

import App from './components/App'
import './index.css'

import registerServiceWorker from './registerServiceWorker'

// Replace this with your project's endpoint
///const GRAPHCMS_API = 'https://api-useast.graphcms.com/v1/cjiacyow100ob01eqwnghonw2/master'
const GRAPHCMS_API = 'http://127.0.0.1:8000/graphql'
const AUTH_URI = 'ws://127.0.0.1/graphql/subscriptions/auth'

const PUSHER_API_KEY = '0fd0c3a8fcbd50e95a48'
const PUSHER_CLUSTER = 'eu'
// eslint-disable-next-line
const BEARER_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImVhNTg0M2ZjZGUxMWYzYTNiMDUyM2JiODhkMTJmYzZiYTg1NDJjYmYxNjI1YzIzZjVmNmU1NGFhNmRkZjVmZDMyZjUxMzEwODFhNDBkZDJmIn0.eyJhdWQiOiIyIiwianRpIjoiZWE1ODQzZmNkZTExZjNhM2IwNTIzYmI4OGQxMmZjNmJhODU0MmNiZjE2MjVjMjNmNWY2ZTU0YWE2ZGRmNWZkMzJmNTEzMTA4MWE0MGRkMmYiLCJpYXQiOjE1Njc5OTQ4MTEsIm5iZiI6MTU2Nzk5NDgxMSwiZXhwIjoxNTk5NjE3MjExLCJzdWIiOiIyMSIsInNjb3BlcyI6W119.R5MPyd1A5UNiU36UTnjbTzlTgwOS623idnbSQihUrZ2CCxqPRb3phHyMUtpePCswDu0Z1qxa9PlkasJcmVCEpJl_FfzjqssvNvf3lqa_2KkMQJMAvjujhWjA-kRH7lYoXbrzAYgAN-I1PZRBxHImK_6fjhq8TlPscq4HN3VpzuehOg-i7YsENAAMkSBT-Wd8EYzXGD9G8y35SqDUiAc3rvuRdxK0TOuwSKlMR6yrmaP1gMur6OS22AkTCVUq6KPVPOuueD_AsIjUmQEoyWYqjZhsJtAgFf1_gBcevBcQruXevgAi_mnNuLNtMhq3BJw9LTPdi9mRO6Gjf5vkXj3giZqdoKpyiQlq66s2uqxVrO8LactQT6Ng4kKf_3yJxjbhj2B-Yjt242dZV-E-fyB4jfDXy8t6W_6NWyTPxAM8fsHNq1YylfwCctw0tQrTrzTt_yy4vt_xL2GwS1zbeq3G1vIO1doPNSQGs4bQFRRdlSWTH-0LTVLa7CtzdRiIxz2v3sm0VYU2pe0MNcvSzpIrIYIGLAYtYcxA2yVoPpdcjjT6JYFPNWNSOk9vN9LpzkMvbX5auMOBsFyy5UFc7wo4yXdvt22Ng45z_NZRGADXBzSOGbGCQN5oa72TCa41FPDECdxAxlcbruNDpPxQiYQ3GfPaQVh9MJbSaw0zDy6nNMg'

// eslint-disable-next-line
const pusherLink = new PusherLink({
  pusher: new Pusher(PUSHER_API_KEY, {
    cluster: PUSHER_CLUSTER,
    authEndpoint: 'ws://127.0.0.1:6001/graphql/subscriptions/auth',
    auth: {
      headers: {
        authorization: BEARER_TOKEN
      }
    }
  })
});

// eslint-disable-next-line
const httpLink = new HttpLink({ uri: GRAPHCMS_API });
// eslint-disable-next-line
const wsLink = new WebSocketLink({
  //uri: `ws://127.0.0.1`,
  //uri: `ws://127.0.0.1:6001`,
  //uri: `ws://127.0.0.1:6001/graphql`,
  //  uri: `ws://127.0.0.1/graphql/subscriptions/auth`,
  uri: 'ws://127.0.0.1:6001/graphql/subscriptions/auth',
  //uri: `ws://ws.pusherapp.com/`,
  options: {
    reconnect: true
  }
});

//const link = httpLink;
const link = ApolloLink.from([pusherLink, new HttpLink({ uri: GRAPHCMS_API })]);

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
// const link = split(
//   // split based on operation type
//   ({ query }) => {
//     const definition = getMainDefinition(query);
//     return (
//       definition.kind === 'OperationDefinition' &&
//       definition.operation === 'subscription'
//     );
//   },
//   wsLink,
//   httpLink,
// );

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
