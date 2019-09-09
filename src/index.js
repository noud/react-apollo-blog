import React from 'react'
import ReactDOM from 'react-dom'

import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
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
const GRAPHCMS_API = 'http://schema.localhost/graphql'

const PUSHER_API_KEY = '01bbbd7da92fc31419e7'
const PUSHER_CLUSTER = 'eu'
// eslint-disable-next-line
const BEARER_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImVhNTg0M2ZjZGUxMWYzYTNiMDUyM2JiODhkMTJmYzZiYTg1NDJjYmYxNjI1YzIzZjVmNmU1NGFhNmRkZjVmZDMyZjUxMzEwODFhNDBkZDJmIn0.eyJhdWQiOiIyIiwianRpIjoiZWE1ODQzZmNkZTExZjNhM2IwNTIzYmI4OGQxMmZjNmJhODU0MmNiZjE2MjVjMjNmNWY2ZTU0YWE2ZGRmNWZkMzJmNTEzMTA4MWE0MGRkMmYiLCJpYXQiOjE1Njc5OTQ4MTEsIm5iZiI6MTU2Nzk5NDgxMSwiZXhwIjoxNTk5NjE3MjExLCJzdWIiOiIyMSIsInNjb3BlcyI6W119.R5MPyd1A5UNiU36UTnjbTzlTgwOS623idnbSQihUrZ2CCxqPRb3phHyMUtpePCswDu0Z1qxa9PlkasJcmVCEpJl_FfzjqssvNvf3lqa_2KkMQJMAvjujhWjA-kRH7lYoXbrzAYgAN-I1PZRBxHImK_6fjhq8TlPscq4HN3VpzuehOg-i7YsENAAMkSBT-Wd8EYzXGD9G8y35SqDUiAc3rvuRdxK0TOuwSKlMR6yrmaP1gMur6OS22AkTCVUq6KPVPOuueD_AsIjUmQEoyWYqjZhsJtAgFf1_gBcevBcQruXevgAi_mnNuLNtMhq3BJw9LTPdi9mRO6Gjf5vkXj3giZqdoKpyiQlq66s2uqxVrO8LactQT6Ng4kKf_3yJxjbhj2B-Yjt242dZV-E-fyB4jfDXy8t6W_6NWyTPxAM8fsHNq1YylfwCctw0tQrTrzTt_yy4vt_xL2GwS1zbeq3G1vIO1doPNSQGs4bQFRRdlSWTH-0LTVLa7CtzdRiIxz2v3sm0VYU2pe0MNcvSzpIrIYIGLAYtYcxA2yVoPpdcjjT6JYFPNWNSOk9vN9LpzkMvbX5auMOBsFyy5UFc7wo4yXdvt22Ng45z_NZRGADXBzSOGbGCQN5oa72TCa41FPDECdxAxlcbruNDpPxQiYQ3GfPaQVh9MJbSaw0zDy6nNMg'

// eslint-disable-next-line
const pusherLink = new PusherLink({
  pusher: new Pusher(PUSHER_API_KEY, {
      cluster: PUSHER_CLUSTER,
      authEndpoint: `${GRAPHCMS_API}/subscriptions/auth`,
      auth: {
          headers: {
              authorization: BEARER_TOKEN
          }
      }
  })
});

const link = ApolloLink.from([pusherLink, new HttpLink({ uri: GRAPHCMS_API })]);

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
