import {
  CREATE_MATCH,
  REFETCH_MATCHES,
  UPDATE_MATCH,
  DELETE_JOIN,
  CURRENT_USER,
  JOIN_MATCH,
  JOIN_ANONYMOUSLY,
  CANCEL_MATCH,
} from "../queries";
import { useHistory } from "react-router";
import { useMutation, useQuery } from "@apollo/client";
import moment from "moment";

const useForm = () => {
  const [deleteJoin] = useMutation(DELETE_JOIN);
  const currentUser = useQuery(CURRENT_USER);
  const [joinMatch] = useMutation(JOIN_MATCH);
  const [joinAnonymously] = useMutation(JOIN_ANONYMOUSLY);
  const [createMatch] = useMutation(CREATE_MATCH, {
    refetchQueries: [{ query: REFETCH_MATCHES }],
  });
  const [updateMatch] = useMutation(UPDATE_MATCH, {
    refetchQueries: [{ query: REFETCH_MATCHES }],
  });
  const [cancelMatch] = useMutation(CANCEL_MATCH, {
    refetchQueries: [{ query: REFETCH_MATCHES }],
  });

  let history = useHistory();

  const CreateGame = (values) => {
    return createMatch({
      variables: {
        input: {
          match: {
            location: values.location,
            time: {
              start: {
                value:
                  moment(values.date).format("YYYY-MM-DDT") +
                  moment(values.startTime).format("HH:mm:00Z"),
                inclusive: true,
              },
              end: {
                value:
                  moment(values.date).format("YYYY-MM-DDT") +
                  moment(values.endTime).format("HH:mm:00Z"),
                inclusive: true,
              },
            },
            playerLimit: {
              start: {
                value: +values.minPlayers,
                inclusive: true,
              },
              end: {
                value: +values.maxPlayers,
                inclusive: true,
              },
            },
            public:
              values.publicToggle === "true" || values.publicToggle === true,
            description: values.description,
            requiredSkillLevel: values.difficultyLevel,
          },
        },
      },
    }).then(() => {
      history.push("/home");
    });
  };

  const UpdateGame = (values) => {
    return updateMatch({
      variables: {
        input: {
          patch: {
            location: values.location,
            time: {
              start: {
                value:
                  moment(values.date).format("YYYY-MM-DDT") +
                  moment(values.startTime).format("HH:mm:00Z"),
                inclusive: true,
              },
              end: {
                value:
                  moment(values.date).format("YYYY-MM-DDT") +
                  moment(values.endTime).format("HH:mm:00Z"),
                inclusive: true,
              },
            },
            playerLimit: {
              start: {
                value: +values.minPlayers,
                inclusive: true,
              },
              end: {
                value: +values.maxPlayers,
                inclusive: true,
              },
            },
            public:
              values.publicToggle === "true" || values.publicToggle === true,
            description: values.description,
            requiredSkillLevel: values.difficultyLevel,
          },
          id: window.location.pathname.slice(13),
        },
      },
    }).then(() => {
      history.push("/home");
    });
  };

  const LeaveGame = async () => {
    for (
      let index = 0;
      index < currentUser.data.currentUser.joinsByParticipantId.edges.length;
      index++
    ) {
      if (
        currentUser.data.currentUser.joinsByParticipantId.edges[index].node
          .matchId === window.location.pathname.slice(13)
      ) {
        await deleteJoin({
          variables: {
            input: {
              id:
                currentUser.data.currentUser.joinsByParticipantId.edges[index]
                  .node.id,
            },
          },
        });
        window.location.reload();
      }
    }
  };

  const JoinGame = async () => {
    if (currentUser.data?.currentUser != null) {
      await joinMatch({
        variables: {
          input: {
            matchId: window.location.pathname.slice(13),
          },
        },
      });
    } else {
      await joinAnonymously({
        variables: {
          input: {
            matchId: window.location.pathname.slice(13),
            name: document.getElementById("anonymousName").value,
          },
        },
      });
    }
    window.location.reload(); // THIS NEEDS TO BE REPLACED WITH REFETCH OR COMPONENT RELAOD
  };

  const CancelMatchById = async () => {
    await cancelMatch({
      variables: {
        input: {
          id: window.location.pathname.slice(13),
          patch: {
            status: "CANCELLED",
          },
        },
      },
    });
    history.push("/home");
  };

  return {
    CreateGame,
    UpdateGame,
    LeaveGame,
    JoinGame,
    CancelMatchById,
  };
};

export default useForm;
