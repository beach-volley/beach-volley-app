import { gql } from "@apollo/client";

//Queries

export const CURRENT_USER = gql`
  {
    currentUser {
      id
      nodeId
      joinsByParticipantId(orderBy: MATCH_TIME_ASC) {
        edges {
          node {
            id
            matchId
            nodeId
          }
        }
      }
      matchesByHostId(orderBy: TIME_ASC) {
        edges {
          node {
            id
            nodeId
          }
        }
      }
    }
  }
`;

export const CURRENT_USER_MATCHES_JOINS = gql`
  {
    currentUser {
      matchesByHostId(orderBy: TIME_ASC) {
        edges {
          node {
            id
            nodeId
            location
            description
            matchType
            status
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
                  nodeId
                  name
                  participant {
                    id
                    nodeId
                    name
                  }
                }
              }
            }
          }
        }
      }
      joinsByParticipantId(orderBy: MATCH_TIME_ASC) {
        edges {
          node {
            match {
              location
              description
              id
              nodeId
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
                      nodeId
                    }
                    id
                    nodeId
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
    publicMatches {
      totalCount
    }
  }
`;

export const USER_ALL_INVITATIONS = gql`
  query user($id: UUID!) {
    user(id: $id) {
      invitations {
        edges {
          node {
            match {
              id
            }
          }
        }
      }
    }
  }
`;

export const MATCHES = gql`
  {
    publicMatches(orderBy: TIME_ASC) {
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
          status
        }
      }
    }
  }
`;

export const MATCHES_INVITATIONS = gql`
  {
    currentUser {
      invitations(orderBy: MATCH_TIME_ASC) {
        edges {
          node {
            match {
              id
              nodeId
              location
              public
              status
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
        }
      }
    }
  }
`;

export const ALL_USERS = gql`
  {
    users {
      edges {
        node {
          id
          name
          nodeId
        }
      }
    }
  }
`;

export const PLAYERS_BY_MATCH_ID = gql`
  query match($id: UUID!) {
    match(id: $id) {
      joins {
        edges {
          node {
            id
            nodeId
            name
            participant {
              id
              nodeId
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
    publicMatches(orderBy: TIME_ASC) {
      edges {
        node {
          id
          nodeId
        }
      }
    }
    currentUser {
      matchesByHostId(orderBy: TIME_ASC) {
        edges {
          node {
            nodeId
          }
        }
      }
      joinsByParticipantId(orderBy: MATCH_TIME_ASC) {
        edges {
          node {
            match {
              nodeId
            }
          }
        }
      }
      invitations(orderBy: MATCH_TIME_ASC) {
        edges {
          node {
            match {
              nodeId
            }
          }
        }
      }
    }
  }
`;

export const MATCH_BY_ID = gql`
  query match($id: UUID!) {
    match(id: $id) {
      description
      nodeId
      matchType
      requiredSkillLevel
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
      host {
        name
        id
        nodeId
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
        nodeId
      }
    }
  }
`;

export const CREATE_INVITATION = gql`
  mutation createInvitation($input: CreateInvitationInput!) {
    createInvitation(input: $input) {
      invitation {
        id
        matchId
        nodeId
        userId
        status
      }
    }
  }
`;

export const UPDATE_MATCH = gql`
  mutation updateMatch($input: UpdateMatchInput!) {
    updateMatch(input: $input) {
      match {
        id
        nodeId
      }
    }
  }
`;

export const UPSERT_USER = gql`
  mutation {
    upsertUser(input: {}) {
      user {
        id
        nodeId
      }
    }
  }
`;

export const CANCEL_MATCH = gql`
  mutation cancelMatch($input: UpdateMatchInput!) {
    updateMatch(input: $input) {
      match {
        id
        nodeId
      }
    }
  }
`;

export const JOIN_MATCH = gql`
  mutation join($input: JoinInput!) {
    join(input: $input) {
      match {
        id
        nodeId
        joins {
          edges {
            node {
              name
              id
              nodeId
              participant {
                id
                nodeId
                name
              }
            }
          }
        }
      }
    }
  }
`;

export const JOIN_ANONYMOUSLY = gql`
  mutation joinAnonymously($input: JoinAnonymouslyInput!) {
    joinAnonymously(input: $input) {
      clientMutationId
      match {
        id
        nodeId
        joins {
          edges {
            node {
              name
              id
              nodeId
              participant {
                id
                nodeId
                name
              }
            }
          }
        }
      }
    }
  }
`;

export const DELETE_JOIN = gql`
  mutation deleteJoin($input: DeleteJoinInput!) {
    deleteJoin(input: $input) {
      join {
        nodeId
      }
    }
  }
`;

export const ADD_FCM_TOKEN = gql`
  mutation addFcmToken($token: String!) {
    addFcmToken(input: { token: $token }) {
      clientMutationId
    }
  }
`;
