import React from 'react'
import { graphql, Subscription } from 'react-apollo'
import gql from 'graphql-tag'

const DontReadThePosts = ({ author }) => {
    if (author) {
        return (
            <Subscription
                subscription={POSTS_SUBSCRIPTION}
                variables={{ author }}
            >
                {({ data: { postUpdated }, loading }) => (
                    <h4>New post: {!loading && postUpdated.title}</h4>
                )}
            </Subscription>
        );
    }
    return <h2>Subscribing to posts...</h2>
}

export const POSTS_SUBSCRIPTION = gql`
    subscription PostUpdated($author: Int!) {
    postUpdated(author: $author) {
      id
      title
    }
  }
  `;

export default graphql(POSTS_SUBSCRIPTION, {
    options: ({ match }) => ({
        variables: {
            author: match.params.author
        }
    })
})(DontReadThePosts)
