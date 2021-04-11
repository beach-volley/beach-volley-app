import React from "react";
import { Form, Formik } from "formik";
import { StyledButton } from "./StyledButton";
import styled from "styled-components";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";
import {
  CREATE_MATCH,
  REFETCH_MATCHES,
  JOIN_MATCH,
  PLAYERS_BY_MATCH_ID,
  CURRENT_USER,
  JOIN_ANONYMOUSLY,
  CANCEL_MATCH,
  UPDATE_MATCH,
  DELETE_JOIN,
} from "../queries";

import { AlertDialogButton } from "../components/FeedbackComponents";
import { useMutation, useQuery } from "@apollo/client";
import { useHistory } from "react-router";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import moment from "moment";
import { useSnackbar } from "notistack";
import Slide from "@material-ui/core/Slide";

import SendInviteField from "./SendInvite";

import {
  TextInput,
  PickTime,
  PickDate,
  DropDown,
  ToggleInput,
  FormTextArea,
} from "./InputComponents";

const GameSchema = Yup.object({
  location: Yup.string()
    .min(2, "Täytyy olla vähintään 2 merkkiä pitkä")
    .max(100, "Täytyy olla 100 merkkiä tai vähemmän!")
    .matches(/^[aA-zZ0-9 _-öÖäÄåÅ]+$/, "Käytä vain kirjaimia tai numeroita! ")
    .required("Pakollinen kenttä"),
  date: Yup.date().required("Et voi valita mennyttä päivää"),
  startTime: Yup.string().required("Pakollinen kenttä"),
  endTime: Yup.string()
    .required("Pakollinen kenttä")
    .test(
      "Eri aika",
      "Alotusaika täytyy olla ennen lopetus aikaa",
      function (value) {
        return (
          moment(this.parent.startTime).format("HH:mm:00Z") <
          moment(value).format("HH:mm:00Z")
        );
      }
    )
    .test(
      "Eri aika",
      "Lopetusajan täytyy olla eri kuin aloitusajan!",
      function (value) {
        return this.parent.startTime !== value;
      }
    ),
  difficultyLevel: Yup.string().required("Valitse taso"),
  publicToggle: Yup.boolean(),
  description: Yup.string(),
});

const CreateFieldSet = ({ matchData, singleGameView }) => {
  let editMode = false;
  let history = useHistory();
  const currentUser = useQuery(CURRENT_USER);

  if (
    singleGameView &&
    currentUser.data?.currentUser?.id === matchData.hostId
  ) {
    singleGameView = false;
    editMode = true;
  }

  const playersByMatchId = useQuery(PLAYERS_BY_MATCH_ID, {
    variables: {
      id: window.location.pathname.slice(13),
    },
    // skip in create mode
    skip: !window.location.pathname.slice(13),
  });
  const [createMatch] = useMutation(CREATE_MATCH, {
    refetchQueries: [{ query: REFETCH_MATCHES }],
  });
  const [joinMatch] = useMutation(JOIN_MATCH);
  const [joinAnonymously] = useMutation(JOIN_ANONYMOUSLY);
  const [cancelMatch] = useMutation(CANCEL_MATCH, {
    refetchQueries: [{ query: REFETCH_MATCHES }],
  });
  const [updateMatch] = useMutation(UPDATE_MATCH, {
    refetchQueries: [{ query: REFETCH_MATCHES }],
  });
  const [deleteJoin] = useMutation(DELETE_JOIN);

  const { enqueueSnackbar } = useSnackbar();

  let isJoined = false;
  const players = [];
  for (
    let index = 0;
    index < playersByMatchId.data?.match?.joins.edges.length;
    index++
  ) {
    players[index] =
      playersByMatchId.data?.match.joins?.edges[index]?.node.participant;
    if (
      players[index]?.id === currentUser.data?.currentUser?.id &&
      currentUser.data?.currentUser?.id != null
    ) {
      isJoined = true;
    }
  }

  const joinGame = () => {
    if (currentUser.data?.currentUser != null) {
      console.log("Joined as logged in user");
      joinMatch({
        variables: {
          input: {
            matchId: window.location.pathname.slice(13),
          },
        },
      });
    } else {
      console.log("Joined as anonymous user");
      joinAnonymously({
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

  const leaveGame = () => {
    for (
      let index = 0;
      index < currentUser.data.currentUser.joinsByParticipantId.edges.length;
      index++
    ) {
      if (
        currentUser.data.currentUser.joinsByParticipantId.edges[index].node
          .matchId === window.location.pathname.slice(13)
      ) {
        deleteJoin({
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

  const cancelMatchById = () => {
    cancelMatch({
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

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Formik
        enableReinitialize
        initialValues={{
          location: singleGameView || editMode ? matchData.location : "",
          date: singleGameView || editMode ? matchData.date : new Date(),
          startTime:
            singleGameView || editMode ? matchData.startTime : new Date(),
          endTime: singleGameView || editMode ? matchData.endTime : new Date(),
          minPlayers: singleGameView || editMode ? matchData.minPlayers : 4,
          maxPlayers: singleGameView || editMode ? matchData.maxPlayers : 6,
          difficultyLevel:
            singleGameView || editMode
              ? matchData.difficultyLevel
              : "EASY_HARD",
          publicToggle:
            singleGameView || editMode ? matchData.publicToggle : false,
          playerList: singleGameView || editMode ? matchData.playerList : [],
          description: singleGameView || editMode ? matchData.description : "",
        }}
        validationSchema={GameSchema}
        onSubmit={(values) => {
          if (editMode) {
            updateMatch({
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
                      values.publicToggle === "true" ||
                      values.publicToggle === true,
                    description: values.description,
                    requiredSkillLevel: values.difficultyLevel,
                  },
                  id: window.location.pathname.slice(13),
                },
              },
            })
              .then(() => {
                history.push("/home");
              })
              .then(
                enqueueSnackbar("Tallennettu", {
                  variant: "success",
                  autoHideDuration: 1000,
                  anchorOrigin: {
                    vertical: "top",
                    horizontal: "center",
                  },
                  TransitionComponent: Slide,
                })
              );
          } else {
            createMatch({
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
                      values.publicToggle === "true" ||
                      values.publicToggle === true,
                    description: values.description,
                    requiredSkillLevel: values.difficultyLevel,
                  },
                },
              },
            })
              .then(() => {
                history.push("/home");
              })
              .then(
                enqueueSnackbar("Peli luotu", {
                  variant: "success",
                  autoHideDuration: 1000,
                  anchorOrigin: {
                    vertical: "top",
                    horizontal: "center",
                  },
                  TransitionComponent: Slide,
                })
              );
          }
        }}
      >
        {(props) => (
          <FieldSet singleGameView={singleGameView}>
            <Form>
              <TextInput name="location" label="Sijainti" />

              <PickDate name="date" label="Päivämäärä" />

              <PickTime name="startTime" label="Aloitusaika" ampm={false} />

              <PickTime name="endTime" label="Lopetusaika" ampm={false} />

              <TextInput
                name="minPlayers"
                label="Pelaajat min"
                type="number"
                InputProps={{ inputProps: { min: 4, max: 12, step: "1" } }}
              />
              <TextInput
                name="maxPlayers"
                label="Pelaajat max"
                type="number"
                InputProps={{ inputProps: { min: 6, max: 20, step: "1" } }}
              />

              <DropDown
                name="difficultyLevel"
                label="Taso"
                options={[
                  { value: "EASY", label: "Aloittelija" },
                  { value: "MEDIUM", label: "Keskitaso" },
                  { value: "HARD", label: "Pro" },
                  { value: "EASY_MEDIUM", label: "Aloittelija-Keskitaso" },
                  { value: "MEDIUM_HARD", label: "Keskitaso-Pro" },
                  { value: "EASY_HARD", label: "Kaikki" },
                ]}
              />

              <ToggleInput
                label="Public"
                name="publicToggle"
                toggleYes="Julkinen"
                toggleNo="Yksityinen"
                checked={props.values.publicToggle}
              />



              <TextAreaContainer>
                {!singleGameView && editMode && (
                  <>
                    <SendInviteField />
                    <label htmlFor="playernames">Kutsutut pelaajat</label>
                    <InvitedPlayers>
                      {props.values.playerList.map((player) => (
                        <p key={uuidv4()}>{player.name}</p>
                      ))}
                    </InvitedPlayers>
                  </>
                )}

                <GameDescription
                  name="description"
                  placeholder="Kirjoita pelin tiedot tänne"
                  readonly={singleGameView}
                />
              </TextAreaContainer>
              {!singleGameView && !editMode && (
                <CornerButton type="submit">Julkaise peli</CornerButton>
              )}
              {!singleGameView && editMode && (
                <SaveEditButton type="submit">Tallenna</SaveEditButton>
              )}
            </Form>
          </FieldSet>
        )}
      </Formik>
      <>
        {(singleGameView || editMode) &&
          !isJoined &&
          currentUser.data?.currentUser != null && (
            <CornerButton onClick={joinGame}>Liity Peliin</CornerButton>
          )}
        {singleGameView &&
          !matchData.publicToggle &&
          currentUser.data?.currentUser === null && (
            <>
              <input
                type="text"
                id="anonymousName"
                maxLength="30"
                placeholder="Anna nimi"
                style={{ marginLeft: "7rem", marginBottom: "1.15rem" }}
              />
              <CornerButton onClick={joinGame}>Liity Peliin</CornerButton>
            </>
          )}
        {(singleGameView || editMode) && isJoined && (
          <CornerButton onClick={leaveGame}>Poistu Pelistä</CornerButton>
        )}
        {editMode && (
          <AlertDialogButton
            ButtonStyle={DeleteGameButton}
            buttonText={"Peru peli"}
            title={"Haluatko perua pelin?"}
            content={""}
            callBack={cancelMatchById}
          />
        )}
      </>
    </MuiPickersUtilsProvider>
  );
};

const FieldSet = styled.fieldset`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border: none;
  pointer-events: ${(props) => (props.singleGameView ? "none" : "all")};
`;

const TextAreaContainer = styled.div`
  label {
    color: white;
  }
  @media only screen and (min-width: ${(props) =>
      props.theme.mediaQuery.tabletWidth}) {
    width: 50%;
    margin-left: auto;
  }
`;

const GameDescription = styled(FormTextArea)`
  width: 100%;
  height: 5rem;
  margin: 2.5rem 0;
  overflow-y: scroll !important;
  pointer-events: all !important;
  resize: none;
`;

const InvitedPlayers = styled.div`
  text-align: center;
  border-style: solid;
  border-width: 0.1rem;
  height: 5rem;
  background-color: white;
  overflow-y: scroll !important;
  pointer-events: all !important;
  padding: 0;
  margin-left: auto;
`;

const CornerButton = styled(StyledButton)`
  height: 2rem;
  position: absolute;
  bottom: 0;
  right: 0;
  margin-right: 1rem;
  margin-bottom: 0.5rem;
`;

const SaveEditButton = styled(StyledButton)`
  height: 2rem;
  position: absolute;
  bottom: 0;
  right: 0;
  margin-right: 8rem;
  margin-bottom: 0.5rem;
`;

const DeleteGameButton = styled(CornerButton)`
  margin-right: 14rem;
`;

export default CreateFieldSet;
