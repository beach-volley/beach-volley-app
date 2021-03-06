import React from "react";
import firebase from "firebase";
import { useQuery } from "@apollo/client";
import { CURRENT_USER } from "../queries";
import { StyledButton } from "../components/styledbutton";
import styled from "styled-components";

const SignOutButton = () => {
  const currentUser = useQuery(CURRENT_USER);

  if (currentUser?.data?.currentUser) {
    return <SignOut onClick={firebase.auth().signOut}>Sign Out</SignOut>;
  }

  return null;
};

const SignOut = styled(StyledButton)`
  height: 2rem;
  width: 7rem;
`;


export default SignOutButton;
