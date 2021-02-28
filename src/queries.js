import { gql } from "@apollo/client";

//Queries

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

export const DELETE_MATCH = gql`
  mutation deleteMatch($input: DeleteMatchInput!) {
    deleteMatch(input: $input) {
      match {
        id
      }
    }
  }
`;
