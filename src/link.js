// eslint-disable-next-line
import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http'
import { WebSocketLink } from 'apollo-link-ws';
// eslint-disable-next-line
import { getMainDefinition } from 'apollo-utilities';

// eslint-disable-next-line
import { ApolloLink } from 'apollo-link'
import Pusher from 'pusher'
import PusherLink from './PusherLink'

// Replace this with your project's endpoint
///const GRAPHCMS_API = 'https://api-useast.graphcms.com/v1/cjiacyow100ob01eqwnghonw2/master'
const GRAPHCMS_API = 'http://127.0.0.1:8000/graphql'
// eslint-disable-next-line
const AUTH_URI = 'http://127.0.0.1:8000/graphql/subscriptions/auth'
//const AUTH_URI = 'ws://127.0.0.1/graphql/subscriptions/auth'

const PUSHER_API_KEY = '0fd0c3a8fcbd50e95a48'
const PUSHER_CLUSTER = 'eu'
// eslint-disable-next-line
const BEARER_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImYyYmRhZDk2MzUwYjA5MzFhOWZhZmM3OTBlNDg2MTU0YTM2YzE2ODZkMmVmMzA4Y2U4OGJlZmU3MTljODAzYmY2ZWQyYWU1MjUwODUzMGZjIn0.eyJhdWQiOiIyIiwianRpIjoiZjJiZGFkOTYzNTBiMDkzMWE5ZmFmYzc5MGU0ODYxNTRhMzZjMTY4NmQyZWYzMDhjZTg4YmVmZTcxOWM4MDNiZjZlZDJhZTUyNTA4NTMwZmMiLCJpYXQiOjE1NjgxNDMxODEsIm5iZiI6MTU2ODE0MzE4MSwiZXhwIjoxNTk5NzY1NTgxLCJzdWIiOiIyMSIsInNjb3BlcyI6W119.teEcGiYKZV1vUcjrsx--2LTKz75j7VK5EhkMqyqGjoeYyIpQ6vO5jKj5L7e7VLBojjVM1-4sbnCtKhwj9GBHka65DTGGADPFsOlVWYDb3dJaRDUKav4ZzSb5YO0wbkbypWJR4-I7LObYmA8nrt2ciZPXVo3k1m9MV_ye1GONky8lPINLg0jR25iXOHZiTIxusf8JPJgE527fm-IcGX8fSAZlyoC_5T5uL9326cuyVDtLOBsCuRMQSG_VC1H7klKuGoC1bfud327TA0TmbovLjRhWptUgDWE7Nq6M6GXhPeStm4uLpWk6I-5jAWQ-4FdNxxw_1l6c0bZQI4selYfJQopiGkikZ59fhDkdVaUEoJUYJyGCOtVK7YopHF3Doztu3aSCHSw7Pgm4nqrgSrXzOWvGvFlOz1K-5Tz40JqjAulS4LqQe1-d5y_kNApVEnMnCAZptkk-PRS3kqdZlAazDaVft0BnQEhCNWbz1tMwkA_QKlQUhA76om_c3MAEEOO59pZYPnIV5xf74PSfmEEjnAXi9DmKerdAXWXMP-TCm_NgM4FnWDdp1t-AqE5p0b718XwcPXQSGJTMVKBkq51VE4hWcFNZerAIjDo0ef7V3YLzuTgpJP_gRbUWiQLuE2qyjtsfCPEP9YAmH5PE8P-r3kAKFnNoSOtHoyR39yBG7JM'

// eslint-disable-next-line
const pusherLink = new PusherLink({
  pusher: new Pusher(PUSHER_API_KEY, {
    cluster: PUSHER_CLUSTER,
    authEndpoint: 'http://127.0.0.1:/8000graphql/subscriptions/auth',
//    authEndpoint: 'ws://127.0.0.1:6001/graphql/subscriptions/auth',
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
  // The URL's scheme must be either 'ws' or 'wss'.
  //uri: `http://127.0.0.1:8000/graphql/subscriptions/auth`,
  uri: 'ws://127.0.0.1:6001/graphql/subscriptions/auth',
  //uri: `ws://ws.pusherapp.com/`,
  options: {
    reconnect: true
  }
});

//const link = httpLink;
export const link = ApolloLink.from([pusherLink, new HttpLink({ uri: GRAPHCMS_API })]);

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