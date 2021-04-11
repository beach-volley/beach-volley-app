import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import useCurrentUser from "../hooks/useCurrentUser";
import { auth } from "../utils/firebase";

const SignOutButton = ({ButtonStyle}) => {
  const currentUser = useCurrentUser();
  const onSignOut = useCallback(() => auth.signOut(), []);

  if (currentUser) {
    return <ButtonStyle onClick={onSignOut}>Kirjaudu ulos</ButtonStyle>;
  }

  return (
    <Link to="/login">
      <ButtonStyle>Kirjaudu sisään</ButtonStyle>
    </Link>
  );
};


export default SignOutButton;
