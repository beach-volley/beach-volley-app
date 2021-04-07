import React, { useCallback } from "react";
import { StyledButton } from "./StyledButton";
import styled from "styled-components";
import { Link } from "react-router-dom";
import useCurrentUser from "../hooks/useCurrentUser";
import { auth } from "../utils/firebase";

const SignOutButton = () => {
  const currentUser = useCurrentUser();
  const onSignOut = useCallback(() => auth.signOut(), []);

  if (currentUser) {
    return <button onClick={onSignOut}>Kirjaudu ulos</button>;
  }

  return (
    <Link to="/login">
      <Button>Kirjaudu sisään</Button>
    </Link>
  );
};

const Button = styled(StyledButton)`
  height: 2rem;
  width: 100%;
`;

export default SignOutButton;
