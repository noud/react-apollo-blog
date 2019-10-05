import React from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import Markdown from 'react-markdown'

const Post = ({ data: { loading, error, single_post } }) => {
  if (error) return <h1>Error fetching the post!</h1>
  if (!loading) {
    return (
      <article>
        <h1>{single_post.title}</h1>
        <div className='Post-placeholder'>
          <img
            alt={single_post.title}
            src={single_post.coverImage && `https://media.graphcms.com/resize=w:650,h:366,fit:crop/${single_post.coverImage.handle}`}
          />
        </div>
        <Markdown
          source={single_post.content}
          escapeHtml={false}
        />
      </article>
    )
  }
  return <h2>Loading post...</h2>
}

export const singlePost = gql`
  query singlePost($id: ID!) {
    single_post(id: {id: $id}) {
      id
      slug
      title
      coverImage {
        id
        handle
      }
      content
      dateAndTime
    }
  }
`

// export const singlePost = gql`
//   query singlePost($id: ID!) {
//     post(where: {id: $id}) {
//       id
//       slug
//       title
//       coverImage {
//         id
//         handle
//       }
//       content
//       dateAndTime
//     }
//   }
// `

export default graphql(singlePost, {
  options: ({ match }) => ({
    variables: {
      id: match.params.slug
    }
  })
})(Post)
