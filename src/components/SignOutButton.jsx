import React from "react";
import firebase from "firebase";
import { useQuery } from "@apollo/client";
import { CURRENT_USER } from "../queries";

const SignOutButton = () => {
  const currentUser = useQuery(CURRENT_USER);

  if (currentUser?.data?.currentUser) {
    return <button onClick={firebase.auth().signOut}>Sign Out</button>;
  }

  return null;
};

export default SignOutButton;
