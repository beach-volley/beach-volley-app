import React from "react";
import { useState } from "react";
import { Form, Formik } from "formik";
import { StyledButton } from "./StyledButton";
import styled from "styled-components";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";
import {
  CREATE_MATCH,
  REFETCH_MATCHES,
  JOIN_MATCH,
  DELETE_MATCH,
  PLAYERS_BY_MATCH_ID,
  CURRENT_USER,
  JOIN_ANONYMOUSLY,
} from "../queries";
import { useMutation, useQuery } from "@apollo/client";
import { useHistory } from "react-router";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import moment from "moment";

import {
  TextInput,
  PickTime,
  PickDate,
  DropDown,
  ToggleInput,
  FormTextArea,
} from "./InputComponents";

const CreateFieldSet = ({ matchData, singleGameView }) => {
  let history = useHistory();
  const [playerName, setPlayerName] = useState("");
  const currentUser = useQuery(CURRENT_USER);
  const playersByMatchId = useQuery(PLAYERS_BY_MATCH_ID, {
    variables: {
      id: +window.location.pathname.slice(13),
    },
  });
  const [createMatch] = useMutation(CREATE_MATCH, {
    refetchQueries: [{ query: REFETCH_MATCHES }],
  });
  const [joinMatch] = useMutation(JOIN_MATCH);
  const [joinAnonymously] = useMutation(JOIN_ANONYMOUSLY);
  const [deleteMatch] = useMutation(DELETE_MATCH, {
    refetchQueries: [{ query: REFETCH_MATCHES }],
  });

  let isJoined = false;
  const players = [];
  for (
    let index = 0;
    index < playersByMatchId.data?.match?.joins.edges.length;
    index++
  ) {
    players[index] =
      playersByMatchId.data?.match.joins?.edges[index]?.node.participant;
    if (players[index]?.id === currentUser.data?.currentUser?.id) {
      isJoined = true;
    }
  }

  const SendInvite = (list, name) => {
    if (name === "") {
      return;
    }
    const tempList = [...list, { name: playerName }];
    setPlayerName("");
    return tempList;
  };

  const joinGame = () => {
    if(currentUser.data?.currentUser != null){
      console.log("Joined as logged in user")
      joinMatch({
        variables: {
          input: {
            matchId: +window.location.pathname.slice(13),
          },
        },
      });
    } else {
      console.log("Joined as anonymous user")
      joinAnonymously({
        variables: {
          input: {
            matchId: +window.location.pathname.slice(13),
            name: "anonyymi",
          },
        },
      });
    }
    window.location.reload(); // THIS NEEDS TO BE REPLACED WITH REFETCH OR COMPONENT RELAOD
  };

  const leaveGame = () => {
    console.log("you left the game");
    // NEEDS MUTATION WHICH ALLOWS YOU TO REMOVE PLAYERS FROM PARTICIPANTS LIST
  }

  const deleteMatchById = () => {
    deleteMatch({
      variables: {
        input: {
          id: +window.location.pathname.slice(13),
        },
      },
    });
    history.push("/home");
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Formik
        initialValues={{
          location: singleGameView ? matchData.location : "",
          date: singleGameView ? matchData.date : new Date(),
          startTime: singleGameView ? matchData.startTime : new Date(),
          endTime: singleGameView ? matchData.endTime : new Date(),
          numPlayers: singleGameView ? matchData.numPlayers : "",
          difficultyLevel: singleGameView ? matchData.difficultyLevel : "",
          publicToggle: singleGameView ? matchData.publicToggle : "true",
          playerList: singleGameView ? matchData.playerList : [],
          description: singleGameView ? matchData.description : "",
        }}
        validationSchema={Yup.object({
          location: Yup.string().required("Pakollinen kenttä"),
          date: Yup.date().required("Required").nullable(),
          startTime: Yup.string().required("Required").nullable(),
          endTime: Yup.string().required("Required").nullable(),
          numPlayers: Yup.string().oneOf(
            ["1-2", "2-4", "4-6"],
            "Invalid number of players"
          ),
          difficultyLevel: Yup.string().oneOf(
            ["easy", "medium", "hard"],
            "Invalid difficulty"
          ),
          publicToggle: Yup.boolean(),
          //invitedPlayers: Yup.array(), // NEEDS TO BE MODIFIED TO VALIDATE STRING ARRAY INSTEAD OF OBJECT ARRAY
          description: Yup.string(),
        })}
        onSubmit={(values) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
          }, 500);

          createMatch({
            variables: {
              input: {
                match: {
                  location: values.location,
                  time: {
                    start: {
                      value:
                        moment(values.date).format("YYYY-MM-DD") +
                        " " +
                        values.startTime.toString().split(" ")[4],
                      inclusive: true,
                    },
                    end: {
                      value:
                        moment(values.date).format("YYYY-MM-DD") +
                        " " +
                        values.endTime.toString().split(" ")[4],
                      inclusive: true,
                    },
                  },
                  playerLimit: {
                    start: {
                      value: +values.numPlayers.split("-")[0],
                      inclusive: true,
                    },
                    end: {
                      value: +values.numPlayers.split("-")[1],
                      inclusive: true,
                    },
                  },
                  public: values.publicToggle === "true",
                },
              },
            },
          }).then(() => {
            history.push("/home");
          });
        }}
      >
        {(props) => (
          <FieldSet singleGameView={singleGameView}>
            <Form>
              <TextInput name="location" label="Sijainti" required />
              <PickDate name="date" label="Päivämäärä" required />

              <PickTime
                name="startTime"
                label="Aloitusaika"
                ampm={false}
                required
              />

              <PickTime
                name="endTime"
                label="Lopetusaika"
                ampm={false}
                required
              />

              <DropDown
                name="numPlayers"
                label="Pelaajamäärä"
                required
                options={[
                  { value: "1-2", label: "1-2" },
                  { value: "2-4", label: "2-4" },
                  { value: "4-6", label: "4-6" },
                ]}
              />

              <DropDown
                name="difficultyLevel"
                label="Taso"
                required
                options={[
                  { value: "easy", label: "Aloittelija" },
                  { value: "medium", label: "Keskitaso" },
                  { value: "hard", label: "Pro" },
                ]}
              />

              <ToggleInput
                label="Public"
                name="publicToggle"
                toggleYes="Julkinen"
                toggleNo="Yksityinen"
                checked={props.values.publicToggle}
              />

              {!singleGameView && (
                <AddPlayerInput
                  name="playerList"
                  label="Lisää pelaajia"
                  type="text"
                  value={playerName}
                  placeholder={"Enter Email"}
                  onChange={(e) => setPlayerName(e.target.value)}
                  extraComponent={
                    <AddPlayerButton
                      type="button"
                      value="Add"
                      onClick={() =>
                        (props.values.playerList = SendInvite(
                          props.values.playerList,
                          playerName
                        ))
                      }
                    >
                      Lisää
                    </AddPlayerButton>
                  }
                />
              )}

              <TextAreaContainer>
                <label htmlFor="playernames">Kutsutut pelaajat</label>
                <InvitedPlayers>
                  {props.values.playerList.map((player) => (
                    <p key={uuidv4()}>{player.name}</p>
                  ))}
                </InvitedPlayers>

                <GameDescription
                  name="description"
                  placeholder="Kirjoita pelin tiedot tänne"
                />
              </TextAreaContainer>

              {!singleGameView && (
                <ConfirmGameButton type="submit">
                  Julkaise peli
                </ConfirmGameButton>
              )}
            </Form>
          </FieldSet>
        )}
      </Formik>
      <>
        {singleGameView && isJoined === false && (
          <JoinGameButton onClick={joinGame}>Liity Peliin</JoinGameButton>
        )}
         {singleGameView && isJoined === true && (
          <LeaveGameButton onClick={leaveGame}>Poistu Pelistä</LeaveGameButton>
        )}
        {singleGameView && (
          <DeleteGameButton onClick={deleteMatchById}>
            Poista Peli
          </DeleteGameButton>
        )}
      </>
    </MuiPickersUtilsProvider>
  );
};

const FieldSet = styled.fieldset`
  pointer-events: ${(props) => (props.singleGameView ? "none" : "all")};
  display: flex;
  flex-direction: column;
  padding: 2rem;
  border: none;
  label {
    color: white;
  }

  .MuiSvgIcon-root {
    display: ${(props) => (props.singleGameView ? "none" : "initial")};
  }
`;

const AddPlayerInput = styled(TextInput)`
  .MuiInput-underline::before {
    margin-left: 1.5rem;
  }
`;

const AddPlayerButton = styled(StyledButton)`
  width: 3rem;
  padding: 0.1rem;
  height: 80%;
  margin-top: auto;
`;

const TextAreaContainer = styled.div`
  @media only screen and (min-width: ${(props) =>
      props.theme.mediaQuery.tabletWidth}) {
    width: 50%;
    margin-left: auto;
  }
`;

const GameDescription = styled(FormTextArea)`
  width: 100%;
  height: 5rem;
  margin: 2rem 0;
  overflow-y: scroll;
  resize: none;
`;

const InvitedPlayers = styled.div`
  text-align: center;
  border-style: solid;
  border-width: 0.1rem;
  height: 5rem;
  background-color: white;
  overflow-y: scroll;
  width: 100%;
  padding: 0;
  margin-left: auto;
`;

const ConfirmGameButton = styled(StyledButton)`
  height: 2rem;
  position: absolute;
  bottom: 0;
  right: 0;
  margin-right: 2rem;
  margin-bottom: 1rem;
`;

const JoinGameButton = styled(StyledButton)`
  height: 2rem;
  position: absolute;
  bottom: 0;
  right: 0;
  margin-right: 2rem;
  margin-bottom: 1rem;
`;

const LeaveGameButton = styled(StyledButton)`
  height: 2rem;
  position: absolute;
  bottom: 0;
  right: 0;
  margin-right: 2rem;
  margin-bottom: 1rem;
`;

const DeleteGameButton = styled(StyledButton)`
  height: 2rem;
  position: absolute;
  bottom: 0;
  right: 0;
  margin-right: 10rem;
  margin-bottom: 1rem;
`;

export default CreateFieldSet;
