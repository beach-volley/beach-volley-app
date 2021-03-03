import React, { useCallback } from "react";
import firebase from "firebase";
import { useQuery } from "@apollo/client";
import { CURRENT_USER } from "../queries";

const SignOutButton = () => {
  const onSignOut = useCallback(() => firebase.auth().signOut());
  const currentUser = useQuery(CURRENT_USER);

  if (currentUser?.data?.currentUser) {
    return <button onClick={onSignOut}>Sign Out</button>;
  }

  return null;
};

export default SignOutButton;
