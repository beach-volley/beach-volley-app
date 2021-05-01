import React from "react";
import * as firebaseui from "firebaseui";
import { StyledFirebaseAuth } from "react-firebaseui";
import Header from "../containers/Header";
import { useHistory } from "react-router-dom";
import { auth, GoogleID } from "../utils/firebase";
import { PageWrapper } from "../components/ComponentStyles";

const LoginPage = () => {
  const history = useHistory();

  return (
    <PageWrapper>
      <Header noProfile />
      <StyledFirebaseAuth
        uiConfig={{
          signInSuccessUrl: "/",
          callbacks: {
            signInSuccessWithAuthResult: () => {
              // When authenticated and still there (= not already redirected),
              // use in SPA redirect instead of hard redirect.
              history.push("/");
              return false;
            },
          },
          signInOptions: [
            {
              provider: GoogleID,
              clientId: process.env.REACT_APP_CLIENT_ID,
            },
          ],
          credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO,
        }}
        firebaseAuth={auth}
      />
    </PageWrapper>
  );
};

export default LoginPage;
