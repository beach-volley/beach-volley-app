import { useState, useEffect } from "react";
import firebase from "firebase/app";

const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState(firebase.auth().currentUser);
  useEffect(() => firebase.auth().onAuthStateChanged(setCurrentUser), [
    setCurrentUser,
  ]);
  return currentUser;
};

export default useCurrentUser;
