import React from "react";
import { Form, Formik } from "formik";
import { FormTextInput, FormDropDown, FormDatePicker } from "./inputcomponents";
import StyledButton from "./styledbutton";
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
          .min(3, "Minimum 3")
          .max(50, "Maximum 50")
          .required("Required"),
        date: Yup.string().required("Required"),
        time: Yup.string()
          .min(3, "Minimum 3")
          .max(50, "Maximum 50")
          .required("Required"),
        numPlayers: Yup.string()
          .oneOf(["1-2", "2-4", "4-6"], "Invalid number of players")
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
          <FormTextInput
            label="Time"
            name="time"
            type="text"
            placeholder="Time"
          />
          <FormDropDown label="Players" name="numPlayers">
            <option value="">Number of players</option>
            <option value="1-2">1-2</option>
            <option value="2-4">2-4</option>
            <option value="4-6">4-6</option>
          </FormDropDown>
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
