import React from "react";
import { Link } from "react-router-dom";
import useCurrentUser from "../hooks/useCurrentUser";
import { auth } from "../utils/firebase";
import { useHistory } from "react-router";

const SignOutButton = ({ ButtonStyle }) => {
  let history = useHistory();
  const currentUser = useCurrentUser();
  const onSignOut = () => auth.signOut().then(history.push("/home"));

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
