import React from "react";
import styled from "styled-components";
import CreateGameForm from '../components/creategameform'

const FormBox    = () => (
  <FormContainer>
     <CreateGameForm />
  </FormContainer>
);

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  grid-row: 3;
  margin-top: 4rem;
  @media only screen and (min-width: ${(props) =>
      props.theme.mediaQuery.tabletWidth}) {
    margin: auto;
    width: 60%;
  }
`;

export default FormBox;
