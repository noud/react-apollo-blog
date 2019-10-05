import React from 'react'
import { Link } from 'react-router-dom'
// eslint-disable-next-line
import { graphql, Subscription } from 'react-apollo'
import gql from 'graphql-tag'
//import { useSubscription } from "use-subscription";

const POSTS_PER_PAGE = 4

// const Home = ({ data: { loading, error, posts, postsConnection, networkStatus }, loadMorePosts }) => {
const Home = ({ data: { loading, error, paginated_posts, networkStatus }, loadMorePosts }) => {
  if (error) return <h1>Error fetching posts!</h1>
  //  if (posts && postsConnection) {
  if (paginated_posts) {
    // const areMorePosts = posts.length < postsConnection.aggregate.count
    const areMorePosts = paginated_posts.length < paginated_posts.paginatorInfo.count
    return (
      <section>
        <ul className='Home-ul'>
          {/* {posts.map(post => ( */}
          {paginated_posts.data.map(post => (
            <li className='Home-li' key={`post-${post.id}`}>
              <Link to={`/post/${post.id}`} className='Home-link'>
                <div className='Home-placeholder'>
                  <img
                    alt={post.title}
                    className='Home-img'
                    src={`https://media.graphcms.com/resize=w:100,h:100,fit:crop/${post.coverImage.handle}`}
                  />
                </div>
                <h3>{post.title}</h3>
              </Link>
            </li>
          ))}
        </ul>
        <div className='Home-showMoreWrapper'>
          {areMorePosts
            ? <button className='Home-button' disabled={loading} onClick={() => loadMorePosts()}>
              {loading ? 'Loading...' : 'Show More Posts'}
            </button>
            : ''}
        </div>
      </section>
    )
  }
  return <h2>Loading posts...</h2>
}

export const posts = gql`
  query paginated_posts($first: Int!, $page: Int) {
    paginated_posts(first: $first, page: $page) {
      data{
        id
        slug
        title
        dateAndTime
        coverImage {
          id
          handle
        }
      }
      paginatorInfo {
        count
      }
    }
  }
`

// export const posts = gql`
//   query posts($first: Int!, $skip: Int!) {
//     posts(orderBy: dateAndTime_DESC, first: $first, skip: $skip) {
//       id
//       slug
//       title
//       dateAndTime
//       coverImage {
//         id
//         handle
//       }
//     },
//     postsConnection {
//       aggregate {
//         count
//       }
//     }
//   }
// `

export const postsQueryVars = {
  // skip: 0,
  page: 0,
  first: POSTS_PER_PAGE
}

export default graphql(posts, {
  options: {
    variables: postsQueryVars,
    notifyOnNetworkStatusChange: true
  },
  props: ({ data }) => ({
    data,
    loadMorePosts: () => {
      return data.fetchMore({
        variables: {
          page: data.paginated_posts.length
          // skip: data.posts.length
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) {
            return previousResult
          }
          return Object.assign({}, previousResult, {
            // Append the new posts results to the old one
            posts: [...previousResult.paginated_posts, ...fetchMoreResult.paginated_posts]
          })
        }
      })
    }
  })
})(Home)
