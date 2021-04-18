import { CREATE_MATCH, REFETCH_MATCHES } from "../queries";
import { useMutation } from "@apollo/client";
import moment from "moment";

const useForm = () => {
  const [createMatch] = useMutation(CREATE_MATCH, {
    refetchQueries: [{ query: REFETCH_MATCHES }],
  });

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
    });
  };

  return {
    CreateGame,
  };
};

export default useForm;
