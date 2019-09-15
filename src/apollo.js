import { ApolloConsumer } from 'react-apollo';
import ApolloClient from 'apollo-client';
import { BatchHttpLink } from 'apollo-link-batch-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import EchoLink from './echo.link';

const cache = new InMemoryCache();
const batchHttpLink = new BatchHttpLink({
  uri: '/graphql',
  fetch: async (uri, options) => {
    // eslint-disable-next-line
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6Ijc4NWY3ZTZhMjI1OGY4YmNjODE5OTNlOGZiNmNiZTJlMzU2ZjQ4NjI1YTg1ZjljYzk3MzUxZjAxNjRhOGVkZWU0NzUzZGFhMDI3MWIyMjc4In0.eyJhdWQiOiIyIiwianRpIjoiNzg1ZjdlNmEyMjU4ZjhiY2M4MTk5M2U4ZmI2Y2JlMmUzNTZmNDg2MjVhODVmOWNjOTczNTFmMDE2NGE4ZWRlZTQ3NTNkYWEwMjcxYjIyNzgiLCJpYXQiOjE1Njg1Nzc2MDEsIm5iZiI6MTU2ODU3NzYwMSwiZXhwIjoxNjAwMjAwMDAxLCJzdWIiOiIyMSIsInNjb3BlcyI6W119.VrASElreko1rV7HVPLCJvdt21IPDArCx8sm47cKZ0K6PuiCKPWS5H3xVfKff6hcVOyCK2qr3t4cZV7YDpkVZocF9Syq3_J6jqHIB7Ree9DiRc2ye-WDzFTO2RDzqICq4nyd7as595evsOx8b-dOCZQD0mFd3G8J9A3lD5RXkfaR3cerEZSE1woaHBNHFRX_jce7DPycLc1w_cQYc_p4c3MGh_6BtfeR2ebrseS9bQehF4kFBd-wHf-AUtlqvJhaOKsehS5a48418yuPT--3oC6y-F6OiDXWswrMO6c1TQXR_JTJ4exxHOClhSqLOI_rSZf-NWbB3bLnzoaqfrWYMpVspPfWDR5T8bTeLjZgp2j1vtlYuO30ZoW83MYy0Nz9Lh4Ea9EQxi4mpTdRTv0P26Qjm64iA6UMhlqspJT7SyHmm28jZLJQRCzNdODdQD2iRcR13rc8XFy7kL3ZK2QRRfVhIyuS8n-DF7k5duP7A2GPH9DIDIC62M5pAzmeMjYwzOUAwUzbIW4dL-lm3TEsYB_bengqjNev8xGti74ObGQVOP_BzQLu-9OS0KqRxqATP9xJbFU4vqnhd1NrwZNNQroLcNZGiyW-PoKBaILxlMK6eW-H6e6MmjtCR2VXlerB7lphmAYc4F5-wo0HancsRu56W-IKF7DmpShSDvM9rojo';
    //const token = localStorage.getItem('token');
    return fetch(uri, options);
  },
});
const echoLink = new EchoLink();
export const apolloClient = new ApolloClient({
  link: ApolloLink.from([echoLink, batchHttpLink]),
  cache,
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all',
    },
    query: {
      errorPolicy: 'all',
    },
  },
});

export const apollo = new ApolloConsumer({
  defaultClient: apolloClient,
});
