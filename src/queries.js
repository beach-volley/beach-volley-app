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

export const REFETCH_MATCHES = gql`
  {
    matches {
      edges {
        node {
          id
        }
      }
    }
  }
`;

export const MATCH_BY_ID = gql`
  query match($id: Int!) {
    match(id: $id) {
      id
      location
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
      public
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

export const DELETE_MATCH = gql`
  mutation deleteMatch($input: DeleteMatchInput!) {
    deleteMatch(input: $input) {
      match {
        id
      }
    }
  }
`;
