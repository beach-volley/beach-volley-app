import React from "react";
import styled from "styled-components";

import Logo from "../components/logo";
import Profile from "../components/profile";

const Header = () => {
  return (
    <Container>
      <Logo />
      <Profile />
    </Container>
  );
};

export default Header;

const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
grid-row: 1;

@media only screen and (min-width: ${props => props.theme.mediaQuery.tabletWidth}) {
    justify-content: space-between;
    margin-right: ${props => props.theme.margins.large};
    margin-left: ${props => props.theme.margins.large};
  }
`;
