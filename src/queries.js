import { gql } from "@apollo/client";

//Queries

export const CURRENT_USER = gql`
  {
    currentUser {
      id
    }
  }
`;

export const CURRENT_USER_MATCHES_JOINS = gql`
  {
    currentUser {
      matchesByHostId {
        edges {
          node {
            id
            location
            description
            matchType
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
            requiredSkillLevel
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
            joins {
              edges {
                node {
                  id
                  name
                  participant {
                    id
                    name
                  }
                }
              }
            }
          }
        }
      }
      joinsByParticipantId {
        edges {
          node {
            match {
              location
              description
              id
              matchType
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
              requiredSkillLevel
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
              joins {
                edges {
                  node {
                    name
                    participant {
                      name
                      id
                    }
                    id
                  }
                }
              }
            }
          }
        }
      }
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

export const PLAYERS_BY_MATCH_ID = gql`
  query match($id: Int!) {
    match(id: $id){
      joins {
        edges {
          node {
            participant {
              id
              name
            }
          }
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

export const JOIN_MATCH = gql`
  mutation join($input: JoinInput!) {
    join(input: $input) {
      match {
        id
      }
    }
  }
`;
