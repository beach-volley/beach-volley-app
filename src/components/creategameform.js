import React from "react";
import { useState } from "react";
import { Form, Formik, Field } from "formik";
import { FormToggle } from "./inputcomponents";
import { StyledButton } from "./styledbutton";
import styled from "styled-components";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";
import { CREATE_MATCH } from "../queries";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router";
import DateFnsUtils from "@date-io/date-fns";
import { TimePicker, DatePicker } from "formik-material-ui-pickers";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { TextField } from "formik-material-ui";
import moment from "moment";
import { Select } from "material-ui-formik-components/Select";
import Input from "@material-ui/core/Input";

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
          <FormContainer disabled={disabled}>
            <Form>
              <InputRowMUI>
                <Field
                  component={TextField}
                  name="location"
                  label="Location"
                  required
                />
              </InputRowMUI>

              <InputRowMUI>
                <Field
                  component={DatePicker}
                  name="date"
                  label="Date"
                  required
                />
              </InputRowMUI>

              <InputRowMUI>
                <Field
                  component={TimePicker}
                  name="startTime"
                  label="Start Time"
                  ampm={false}
                  required
                />
              </InputRowMUI>

              <InputRowMUI>
                <Field
                  component={TimePicker}
                  name="endTime"
                  label="End Time"
                  ampm={false}
                  required
                />
              </InputRowMUI>

              <InputRowMUI>
                <Field
                  style={{ color: "white" }}
                  name="numPlayers"
                  label="Players"
                  required
                  options={[
                    { value: "1-2", label: "1-2" },
                    { value: "2-4", label: "2-4" },
                    { value: "4-6", label: "4-6" },
                  ]}
                  component={Select}
                />
              </InputRowMUI>

              <InputRowMUI>
                <Field
                  name="difficultyLevel"
                  label="Difficulty"
                  required
                  options={[
                    { value: "easy", label: "Easy" },
                    { value: "medium", label: "Medium" },
                    { value: "hard", label: "Hard" },
                  ]}
                  component={Select}
                />
              </InputRowMUI>

              <InputRowMUI>
                <FormToggle
                  label="Public"
                  name="publicToggle"
                  toggleYes="Public"
                  toggleNo="Private"
                  checked={props.values.publicToggle}
                />
              </InputRowMUI>

              <InputRowMUI>
                <label>Add player</label>
                <Input
                  label="Add player"
                  type="text"
                  value={playerName}
                  placeholder={"Enter Email"}
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
              </InputRowMUI>

              <InputRowMUI>
                <label>Invited players</label>
                <InvitedPlayersBox>
                  {props.values.playerList.map((player) => (
                    <p key={uuidv4()}>{player.name}</p>
                  ))}
                </InvitedPlayersBox>
              </InputRowMUI>

              <InputRowMUI>
                <label>Info</label>
                <Field
                  component={TextField}
                  name="description"
                  variant="outlined"
                  placeholder="Write Game Details Here"
                  multiline
                  rows={4}
                />
              </InputRowMUI>
              <SubmitButton type="submit">Confirm Game</SubmitButton>
            </Form>
          </FormContainer>
        )}
      </Formik>
    </MuiPickersUtilsProvider>
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

//override material-ui css
const InputRowMUI = styled.div`
  display: flex;
  margin-bottom: 1rem;
  label {
    color: white !important;
    font-size: ${(props) => props.theme.fontSizes.medium};
    flex: 1.75;
    text-align: left;
  }

  .MuiFormControl-root {
    display: flex;
    flex-direction: row;
    width: 100%;
    margin: 0;
  }

  .MuiInputLabel-formControl {
    transform: none;
    position: relative;
  }

  .MuiInput-root, .MuiTextField-root {
    flex: 2;
  }

  .MuiInput-underline::before {
    transition: none;
    border-bottom: 1px solid white;
  }

  .MuiInput-underline::after {
    transition: none;
    border-bottom: none;
    border-color: white;
  }

  .MuiInputBase-input {
    color: white;
    text-align: center;
  }

  & .MuiFormLabel-root {
    display: flex;
    align-items: flex-end;
    font-family: inherit;
  }

  & .MuiFormLabel-root:focus {
    color: none;
  }

  .MuiSelect-nativeInput {
    display: none;
  }

  .MuiSelect-select.MuiSelect-select {
    padding-right: 0;
  }

  .MuiSvgIcon-root {
    color: white;
  }

  .MuiFormHelperText-root {
    position: absolute;
    left: 0;
  }
`;

export default CreateFormContainer;
