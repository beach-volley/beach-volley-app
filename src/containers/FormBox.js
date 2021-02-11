import React from "react";
import styled from "styled-components";
import CreateGameForm from "../components/creategameform";

const FormBox = () => (
  <FormContainer>
    <h1>Create new game</h1>
    <CreateGameForm />
  </FormContainer>
);

const FormContainer = styled.div`
  grid-row: 2;
  height: 60%;
  width: 100%;
  text-align: center;
  position: relative;
  background: rgb(${(props) => props.theme.colors.gulfBlueTransparent});
  margin: auto;
  h1 {
    color: white;
  }

  @media only screen and (min-width: ${(props) =>
    props.theme.mediaQuery.tabletWidth}) {
  width: 80%
}

`;

export default FormBox;
