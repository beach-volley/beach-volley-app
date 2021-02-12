import React from "react";
import { Form, Formik } from "formik";
import {
  FormTextInput,
  FormDropDown,
  FormDatePicker,
  FormTimePicker,
  FormRadioButton,
} from "./inputcomponents";
import StyledButton from "./styledbutton";
import styled from "styled-components";
import * as Yup from "yup";
import { boolean } from "yup/lib/locale";

const CreateGameForm = () => {
  return (
    <Formik
      initialValues={{
        location: "",
        date: "",
        startTime: "",
        endTime: "",
        numPlayers: "",
        difficulty: "",
        public: boolean,
      }}
      validationSchema={Yup.object({
        location: Yup.string()
          .min(3, "Minimum 3")
          .max(50, "Maximum 50")
          .required("Required"),
        date: Yup.date().required("Required").nullable(),
        time: Yup.date().required("Required").nullable(),
        numPlayers: Yup.string()
          .oneOf(["1-2", "2-4", "4-6"], "Invalid number of players")
          .required("Required"),
        difficultyLevel: Yup.string()
          .oneOf(["easy", "medium", "hard"], "Invalid difficulty")
          .required("Required"),
        public: Yup.boolean()
          .required("Required"),
      })}
      onSubmit={(values) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
        }, 400);
      }}
    >
      {(props) => (
        <GameForm>
          <FormTextInput
            label="Location"
            name="location"
            type="text"
            placeholder="Location"
          />
          <FormDatePicker label="Date" name="date" />
          <FormTimePicker
            label="Start time"
            name="startTime"
            placeholder={"Start Time"}
          />
          <FormTimePicker
            label="End time"
            name="endTime"
            placeholder={"End Time"}
          />
          <FormDropDown label="Players" name="numPlayers">
            <option value="">Number of players</option>
            <option value="1-2">1-2</option>
            <option value="2-4">2-4</option>
            <option value="4-6">4-6</option>
          </FormDropDown>
          <FormDropDown label="Difficulty" name="difficulty">
            <option value="">Pick a skill level</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </FormDropDown>
          <FormRadioButton label="Public" name="public" />
          <StyledButton type={"submit"} text={"Submit"} />
        </GameForm>
      )}
    </Formik>
  );
};

const GameForm = styled(Form)`
  display: flex;
  flex-direction: column;
  margin: 1rem;
  button {
    height: 2rem;
    position: absolute;
    bottom: 0;
    right: 0;
    margin: 1rem;
  }
  @media only screen and (min-width: ${(props) =>
      props.theme.mediaQuery.tabletWidth}) {
    width: 50%;
  }
`;

export default CreateGameForm;
