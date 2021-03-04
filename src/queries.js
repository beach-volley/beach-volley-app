import { gql } from "@apollo/client";

//Queries

export const CURRENT_USER = gql`
  {
    currentUser {
      id
    }
  }
`;

export const MATCHES_TOTAL_COUNT = gql`
  {
    matches {
      totalCount
    }
  }
`;

export const MATCHES = gql`
  {
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
`;

//Mutations

export const CREATE_MATCH = gql`
  mutation createMatch($input: CreateMatchInput!) {
    createMatch(input: $input) {
      match {
        id
      }
    }
  }
`;

export const UPSERT_USER = gql`
  mutation {
    upsertUser(input: {}) {
      user {
        id
      }
    }
  }
`;
