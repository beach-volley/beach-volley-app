import React from "react";
import { Form, Formik } from "formik";
import {
  FormTextInput,
  FormDropDown,
  FormDatePicker,
  FormTimePicker,
  FormToggle,
  FormTextArea,
} from "./inputcomponents";
import StyledButton from "./styledbutton";
import styled from "styled-components";
import * as Yup from "yup";

import { CREATE_MATCH } from "../queries";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router";

const CreateGameForm = () => {
  let history = useHistory();
  const [createMatch] = useMutation(CREATE_MATCH);

  return (
    <Formik
      initialValues={{
        location: "",
        date: "",
        startTime: "",
        endTime: "",
        numPlayers: "",
        difficultyLevel: "",
        publicToggle: true,
        description: "",
      }}
      validationSchema={Yup.object({
        location: Yup.string()
          .min(3, "Minimum 3")
          .max(50, "Maximum 50")
          .required("Required"),
        date: Yup.date().required("Required").nullable(),
        startTime: Yup.string().required("Required").nullable(),
        endTime: Yup.string().required("Required").nullable(),
        numPlayers: Yup.string()
          .oneOf(["1-2", "2-4", "4-6"], "Invalid number of players")
          .required("Required"),
        difficultyLevel: Yup.string()
          .oneOf(["easy", "medium", "hard"], "Invalid difficulty")
          .required("Required"),
        publicToggle: Yup.boolean().required("Required"),
        description: Yup.string(),
      })}
      onSubmit={(values) => {
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
        <GameForm>
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
            />
          </InputRow>

          <InputRow>
            <FormTextArea
              label="Game Description"
              name="description"
              placeholder={"Write Game Details here"}
            />
          </InputRow>

          <StyledButton type={"submit"} text={"Submit"} />
        </GameForm>
      )}
    </Formik>
  );
};

const GameForm = styled(Form)`
  display: flex;
  flex-direction: column;
  padding: 2rem;

  button {
    height: 2rem;
    position: absolute;
    bottom: 0;
    right: 0;
    margin-right: 2rem;
    margin-bottom: 1rem;
  }
`;

const InputRow = styled.div`
  display: flex;
  margin-bottom: 2rem;

  label {
    margin-right: auto;
    color: white;
    font-size: ${(props) => props.theme.fontSizes.medium};
  }
`;
export default CreateGameForm;
