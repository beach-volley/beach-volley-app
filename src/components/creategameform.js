import React from "react";
import { useState } from "react";
import { Form, Formik } from "formik";
import {
  FormTextInput,
  FormDropDown,
  FormDatePicker,
  FormTimePicker,
  FormToggle,
  FormTextArea,
} from "./inputcomponents";
import { StyledButton } from "./styledbutton";
import styled from "styled-components";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";

import { CREATE_MATCH } from "../queries";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router";

const CreateFormContainer = ({ mockData, disabled }) => {
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
    <Formik
      initialValues={{
        location: disabled ? mockData.location : "",
        date: disabled ? mockData.date : "",
        startTime: disabled ? mockData.startTime : "",
        endTime: disabled ? mockData.endTime : "",
        numPlayers: disabled ? mockData.numPlayers : "",
        difficultyLevel: disabled ? mockData.difficultyLevel : "",
        publicToggle: disabled ? mockData.publicToggle : true,
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
        console.log(values);
        createMatch({
          variables: {
            input: {
              match: {
                location: values.location,
                time: {
                  start: {
                    value: values.date + " " + values.startTime,
                    inclusive: true,
                  },
                  end: {
                    value: values.date + " " + values.endTime,
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
                public: values.publicToggle,
              },
            },
          },
        }).then(() => {
          history.push("/home");
        });
      }}
    >
      {(props) => (
        <FormContainer disabled={disabled}>
          <Form>
            <InputRow>
              <FormTextInput
                label="Location"
                name="location"
                type="text"
                placeholder="Location"
              />
            </InputRow>

            <InputRow>
              <FormDatePicker label="Date" name="date" />
            </InputRow>

            <InputRow>
              <FormTimePicker
                label="Start time"
                name="startTime"
                placeholder={"Start Time"}
              />
            </InputRow>

            <InputRow>
              <FormTimePicker
                label="End time"
                name="endTime"
                placeholder={"End Time"}
              />
            </InputRow>

            <InputRow>
              <FormDropDown label="Players" name="numPlayers">
                <option value="">Player amount</option>
                <option value="1-2">1-2</option>
                <option value="2-4">2-4</option>
                <option value="4-6">4-6</option>
              </FormDropDown>
            </InputRow>

            <InputRow>
              <FormDropDown label="Difficulty" name="difficultyLevel">
                <option value="">Skill level</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </FormDropDown>
            </InputRow>

            <InputRow>
              <FormToggle
                label="Public"
                name="publicToggle"
                toggleYes="Public"
                toggleNo="Private"
                checked={props.values.publicToggle}
              />
            </InputRow>

            <InputRow>
              <label>Add player</label>
              <input
                type="text"
                value={playerName}
                placeholder={"Enter email"}
                onChange={(e) => setPlayerName(e.target.value)}
              />
              <AddButton
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
              </AddButton>
            </InputRow>

            <InputRow>
              <label>Invited players</label>
              <InvitedPlayersBox>
                {props.values.playerList.map((player) => (
                  <p key={uuidv4()}>{player.name}</p>
                ))}
              </InvitedPlayersBox>
            </InputRow>

            <InputRow>
              <FormTextArea
                label="Info"
                name="description"
                placeholder={"Write Game Details here"}
              />
            </InputRow>
            <SubmitButton type="submit">Confirm Game</SubmitButton>
          </Form>
        </FormContainer>
      )}
    </Formik>
  );
};

const FormContainer = styled.div`
  pointer-events: ${(props) => (props.disabled ? "none" : "all")};
  display: flex;
  flex-direction: column;
  padding: 2rem;
`;

const SubmitButton = styled(StyledButton)`
  height: 2rem;
  position: absolute;
  bottom: 0;
  right: 0;
  margin-right: 2rem;
  margin-bottom: 1rem;
`;

const AddButton = styled(StyledButton)`
  width: 3rem;
  padding: 0.1rem;
  border-style: solid;
  border-color: black;
  position: absolute;
  right: 2rem;
  border-radius: 0;
`;

const InvitedPlayersBox = styled.div`
  text-align: left;
  border-style: solid;
  border-width: 0.1rem;
  height: 5rem;
  background-color: white;
  border-radius: 0.3rem;
  padding: 0.5rem;
  overflow-y: scroll;
  flex: 2;
`;

const InputRow = styled.div`
  display: flex;
  margin-bottom: 2rem;
  align-items: flex-start;
  label {
    color: white;
    font-size: ${(props) => props.theme.fontSizes.medium};
    flex: 1;
    margin-right: 1rem;
  }

  input,
  select,
  textarea {
    flex: 2;
    text-align: center;
  }

  & .form-text-area {
    height: 10rem;
    margin-bottom: 3rem;
    border-radius: 0.3rem;
    resize: none;
  }
`;

export default CreateFormContainer;
