import React from "react";
import styled from "styled-components";

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

const Container = styled.div`
  text-align: center;
  position: relative;
  margin: auto;
  margin-top: 4rem;
  background: rgb(${(props) => props.theme.colors.gulfBlueTransparent});
  margin-bottom: 1rem;
  width: 95%;
  @media only screen and (min-width: ${(props) =>
      props.theme.mediaQuery.tabletWidth}) {
    width: 60%;
  }
`;

export default CenterContainer;
