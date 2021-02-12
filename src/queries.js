import { gql } from '@apollo/client'


export const MATCHES_TOTAL_COUNT = gql` {
      matches {
        totalCount
      }
  }
`

export const MATCHES = gql`{
  matches {
    edges {
      node {
        id
        location
        public
        playerLimit {
          end {
            inclusive
            value
          }
          start {
            inclusive
            value
          }
        }
        time {
          end {
            inclusive
            value
          }
          start {
            inclusive
            value
          }
        }
        nodeId
      }
    }
  }
}
`
