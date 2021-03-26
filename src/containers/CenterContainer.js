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
  display: flex;
  justify-content: center;
  align-items: center;
  grid-row: 2;
`;

const ContainerTitle = styled.h1`
  color: white;
`;

const Container = styled.div`
  text-align: center;
  position: relative;
  background: rgb(${(props) => props.theme.colors.gulfBlueTransparent});
  margin-bottom: 1rem;
  width: 90%;
  @media only screen and (min-width: ${(props) =>
      props.theme.mediaQuery.tabletWidth}) {
    width: 60%;
  }
`;

export default CenterContainer;
