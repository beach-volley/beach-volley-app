import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import SignOutButton from "../components/SignOutButton";
import { StyledButton } from "../components/styledbutton";

const Header = () => {
  return (
    <Container>
      <Link to="/home">
        <Logo>
          <h1>LOGO</h1>
        </Logo>
      </Link>
      <Profile>
        <Link to="/create-game">
          <CreateGameButton>Create Game</CreateGameButton>
        </Link>
        <SignOutButton />
        <h1>ICON</h1>
      </Profile>
    </Container>
  );
};

export default Header;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  grid-row: 1;

  @media only screen and (min-width: ${(props) =>
      props.theme.mediaQuery.tabletWidth}) {
    justify-content: space-between;
    margin-right: ${(props) => props.theme.margins.large};
    margin-left: ${(props) => props.theme.margins.large};
  }
`;

const Logo = styled.div`
  margin-right: 1rem;
`;

const CreateGameButton = styled(StyledButton)`
  height: 3rem;
  width: 10rem;
  margin-right: 1rem;
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  h1 {
    margin-left: 1rem;
  }
`;
