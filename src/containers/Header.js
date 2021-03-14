import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import SignOutButton from "../components/SignOutButton";
import { StyledButton } from "../components/StyledButton";

const Header = ({ noProfile = false }) => {
  return (
    <Container>
      <Link to="/home">
        <h1>LOGO</h1>
      </Link>
      {!noProfile ? (
        <Profile>
          <Link to="/create-game">
            <CreateGameButton>Create Game</CreateGameButton>
          </Link>
          <SignOutButton />
        </Profile>
      ) : null}
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
  h1 {
    margin-left: 1rem;
  }
`;
const Profile = styled.div`
  display: flex;
`;

const CreateGameButton = styled(StyledButton)`
  height: 2rem;
  width: 8rem;
  margin-right: 0.5rem;
  margin-left: 0.5rem;
`;
