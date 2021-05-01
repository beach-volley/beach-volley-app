import React from "react";
import styled from "styled-components";
import { StyledContainer } from "../components/ComponentStyles";

const CenterContainer = ({ title, ...props }) => (
  <CenterWrapper>
    <Container>
      <ContainerTitle>{title}</ContainerTitle>
      {props.children}
    </Container>
  </CenterWrapper>
);

const CenterWrapper = styled.div`
  grid-row: 3;
`;

const ContainerTitle = styled.h1`
  color: white;
`;

const Container = styled(StyledContainer)`
  text-align: center;
  position: relative;
  margin: auto;
  padding: 1rem;
  margin-top: 4rem;
  width: 100%;

  @media only screen and (min-width: ${(props) =>
      props.theme.mediaQuery.tabletWidth}) {
    width: 50%;
    margin-bottom: 4rem;
  }
`;

export default CenterContainer;
