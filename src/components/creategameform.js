import React from "react";
import { useState } from "react";
import { Form, Formik } from "formik";
import { FormToggle } from "./inputcomponents";
import { StyledButton } from "./styledbutton";
import styled from "styled-components";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";
import { CREATE_MATCH } from "../queries";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import moment from "moment";

import { TextInput, PickTime, PickDate, DropDown } from "./inputcomponents";

const CreateFieldSet = ({ mockData, disabled }) => {
  let history = useHistory();
  const [createMatch] = useMutation(CREATE_MATCH);
  const [playerName, setPlayerName] = useState("");

  const SendInvite = (list, name) => {
    if (name === "") {
      return;
    }
    const tempList = [...list, { name: playerName }];
    setPlayerName("");
    return tempList;
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Formik
        initialValues={{
          location: disabled ? mockData.location : "",
          date: disabled ? mockData.date : new Date(),
          startTime: disabled ? mockData.startTime : new Date(),
          endTime: disabled ? mockData.endTime : new Date(),
          numPlayers: disabled ? mockData.numPlayers : "",
          difficultyLevel: disabled ? mockData.difficultyLevel : "",
          publicToggle: disabled ? mockData.publicToggle : "true",
          playerList: disabled ? mockData.playerList : [],
          description: disabled ? mockData.description : "",
        }}
        validationSchema={Yup.object({
          location: Yup.string().required("Required"),
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
          invitedPlayers: Yup.array(),
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
          <FieldSet disabled={disabled}>
            <Form>
              <TextInput name="location" label="Location" required />
              <PickDate name="date" label="Date" required />

              <PickTime
                name="startTime"
                label="Start Time"
                ampm={false}
                required
              />

              <PickTime name="endTime" label="End Time" ampm={false} required />

              <DropDown
                name="numPlayers"
                label="Players"
                required
                options={[
                  { value: "1-2", label: "1-2" },
                  { value: "2-4", label: "2-4" },
                  { value: "4-6", label: "4-6" },
                ]}
              />

              <DropDown
                name="difficultyLevel"
                label="Difficulty"
                required
                options={[
                  { value: "easy", label: "Easy" },
                  { value: "medium", label: "Medium" },
                  { value: "hard", label: "Hard" },
                ]}
              />

              <FormToggle
                label="Public"
                name="publicToggle"
                toggleYes="Public"
                toggleNo="Private"
                checked={props.values.publicToggle}
              />

              <AddPlayerInput
                name="playerList"
                label="Add player"
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
                    Add
                  </AddPlayerButton>
                }
              />

              <InvitedPlayersBox>
                <label htmlFor="playernames">Invited players</label>
                <InvitedPlayers>
                  {props.values.playerList.map((player) => (
                    <p key={uuidv4()}>{player.name}</p>
                  ))}
                </InvitedPlayers>
              </InvitedPlayersBox>

              <TextInput
                name="description"
                label="Description"
                placeholder="Write Game Details Here"
                multiline
                InputProps={{ disableUnderline: true }}
              />

              <ConfirmGameButton type="submit">Confirm Game</ConfirmGameButton>
            </Form>
          </FieldSet>
        )}
      </Formik>
    </MuiPickersUtilsProvider>
  );
};

const FieldSet = styled.fieldset`
  pointer-events: ${(props) => (props.disabled ? "none" : "all")};
  display: flex;
  flex-direction: column;
  padding: 2rem;
  border: none;

  label {
    color: white;
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

const InvitedPlayersBox = styled.div`
  width: 50%;
  margin-left: auto;
`;

const InvitedPlayers = styled.div`
  text-align: left;
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

export default CreateFieldSet;
