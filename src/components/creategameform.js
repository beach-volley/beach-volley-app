import React from "react";
import { Form, Formik } from "formik";
import {
  FormTextInput,
  FormDropDown,
  FormDatePicker,
  FormTimePicker,
  FormToggle,
  FormTextArea
} from "./inputcomponents";
import StyledButton from "./styledbutton";
import styled from "styled-components";
import * as Yup from "yup";

const CreateGameForm = () => {
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
        description: ""
      }}
      validationSchema={Yup.object({
        location: Yup.string()
          .min(3, "Minimum 3")
          .max(50, "Maximum 50")
          .required("Required"),
        date: Yup.date().required("Required").nullable(),
        startTime: Yup.date()
          .required("Required")
          .nullable(),
        endTime: Yup.date()
          .required("Required")
          .nullable(),
        numPlayers: Yup.string()
          .oneOf(["1-2", "2-4", "4-6"], "Invalid number of players")
          .required("Required"),
        difficultyLevel: Yup.string()
          .oneOf(["easy", "medium", "hard"], "Invalid difficulty")
          .required("Required"),
        publicToggle: Yup.boolean()
          .required("Required"),
        description: Yup.string()

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
            <option value="">Player amount</option>
            <option value="1-2">1-2</option>
            <option value="2-4">2-4</option>
            <option value="4-6">4-6</option>
          </FormDropDown>
          <FormDropDown label="Difficulty" name="difficultyLevel">
            <option value="">Skill level</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </FormDropDown>
          <FormToggle label="Public" name="publicToggle" toggleYes="Public" toggleNo="Private" />
          <FormTextArea 
            label="Game Description"
            name="description"
            placeholder={"Write Game Details here"}
            />
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

export default CreateGameForm;
