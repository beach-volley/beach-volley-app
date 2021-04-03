import React, { useCallback } from "react";
import firebase from "firebase";
import { StyledButton } from "./StyledButton";
import styled from "styled-components";
import { Link } from "react-router-dom";
import useCurrentUser from "../hooks/useCurrentUser";

const SignOutButton = () => {
  const currentUser = useCurrentUser();
  const onSignOut = useCallback(() => firebase.auth().signOut(), []);

  if (currentUser) {
    return <Button onClick={onSignOut}>Kirjaudu ulos</Button>;
  }

  return (
    <Link to="/login">
      <Button>Kirjaudu sisään</Button>
    </Link>
  );
};

const Button = styled(StyledButton)`
  height: 2rem;
  width: 7rem;
`;

export default SignOutButton;
