import React, { useCallback } from "react";
import firebase from "firebase";
import { useQuery } from "@apollo/client";
import { CURRENT_USER } from "../queries";
import { StyledButton } from "./styledbutton";
import styled from "styled-components";
import { Link } from "react-router-dom";

const SignOutButton = () => {
  const currentUser = useQuery(CURRENT_USER);
  const onSignOut = useCallback(() => firebase.auth().signOut(), []);

  if (currentUser?.data?.currentUser) {
    return <Button onClick={onSignOut}>Sign Out</Button>;
  }

  return (
    <Link to="/login">
      <Button>Sign Up</Button>
    </Link>
  );
};

const Button = styled(StyledButton)`
  height: 2rem;
  width: 7rem;
`;

export default SignOutButton;
