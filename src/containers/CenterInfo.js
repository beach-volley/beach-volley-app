import React from "react";
import styled from "styled-components";

const InfoBox = ({ title, ...props }) => (
  <FormContainer>
    <h1>{title}</h1>
    {props.children}
  </FormContainer>
);

const FormContainer = styled.div`
  grid-row: 2;
  text-align: center;
  position: relative;
  background: rgb(${(props) => props.theme.colors.gulfBlueTransparent});
  margin-bottom: auto;
  h1 {
    color: white;
  }

  @media only screen and (min-width: ${(props) =>
      props.theme.mediaQuery.tabletWidth}) {
    width: 80%;
    margin: auto;
  }
`;

export default InfoBox;
