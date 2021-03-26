import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import SignOutButton from "../components/SignOutButton";
import ShowNotifications from "../components/ShowNotifications";
import { StyledButton } from "../components/StyledButton";
import { useQuery } from "@apollo/client";
import { CURRENT_USER } from "../queries";

const Header = () => {
  const currentUser = useQuery(CURRENT_USER);

  return (
    <Container>
      <Link to="/home">
        <h1>LOGO</h1>
      </Link>

      <Profile>
        {currentUser?.data?.currentUser && (
          <Link to="/create-game">
            <CreateGameButton>Luo Peli</CreateGameButton>
          </Link>
        )}
        <SignOutButton />
        <ShowNotifications />
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
  h1 {
    margin-left: 1rem;
  }
`;
const Profile = styled.div`
  display: flex;
  margin-right: 0.5rem;
  margin-left: 0.5rem;
`;

const CreateGameButton = styled(StyledButton)`
  height: 2rem;
  width: 8rem;
  margin-right: 0.5rem;
`;
