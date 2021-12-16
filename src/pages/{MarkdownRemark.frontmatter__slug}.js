import React from 'react'
import { graphql } from 'gatsby'

const query = graphql`
  query ($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        slug
        title
      }
      html
    }
  }
`

function BlogPost({ data }) {
  return null
}

export async function config() {
  const { data } = await graphql`
    {
      oldPosts: allMarkdownRemark(
        filter: { frontmatter: { date: { lt: "2021-01-01" } } }
      ) {
        nodes {
          frontmatter {
            slug
          }
        }
      }
    }
  `
  const exclude = new Set(data.oldPosts.nodes.map(node => node.frontmatter.slug))

  return ({ params }) => {
    return {
      defer: exclude.has(`/${params.frontmatter__slug}/`)
    }
  }
}

export { query }

export default BlogPost