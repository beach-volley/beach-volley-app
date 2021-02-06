import React from "react";
import { Form, Formik } from "formik";
import { FormTextInput, FormDropDown } from "./inputcomponents";
import styled from "styled-components";
import * as Yup from "yup";

const CreateGameForm = () => {
  return (
    <Formik
      initialValues={{
        location: "",
        date: "",
        time: "",
        numPlayers: "",
      }}
      validationSchema={Yup.object({
        location: Yup.string()
          .min(3, "Must be 3 characters long")
          .max(50, "Must be under 50 characters")
          .required("Required"),
        date: Yup.string()
          .min(3, "Must be 3 characters long")
          .max(50, "Must be under 50 characters")
          .required("Required"),
        time: Yup.string()
          .min(3, "Must be 3 characters long")
          .max(50, "Must be under 50 characters")
          .required("Required"),
        numPlayers: Yup.string()
          .oneOf(["1-2", "2-4", "4-6"], "Invalid number of players")
          .required("Required"),
      })}
      onSubmit={(values) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
        }, 1000);
      }}
    >
      {(props) => (
        <GameForm>
          <h1>Your game</h1>
          <FormTextInput
            label="Location"
            name="location"
            type="text"
            placeholder="Location"
          />
          <FormTextInput
            label="Date"
            name="date"
            type="text"
            placeholder="Date"
          />
          <FormTextInput
            label="Time"
            name="time"
            type="text"
            placeholder="Time"
          />
          <FormDropDown label="Number of players" name="numplayers">
            <option value="">Select number of players</option>
            <option value="1-2">1-2</option>
            <option value="2-4">2-4</option>
            <option value="4-6">4-6</option>
          </FormDropDown>
        </GameForm>
      )}
    </Formik>
  );
};

const GameForm = styled(Form)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 50rem;
  width: 100%;
  background-color: blue;
`;

export default CreateGameForm;
