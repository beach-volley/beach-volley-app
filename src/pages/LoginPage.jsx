import React from "react";
import styled from "styled-components";
import firebase from "firebase";
import * as firebaseui from "firebaseui";
import { StyledFirebaseAuth } from "react-firebaseui";
import Header from "../containers/Header";
import { useHistory } from "react-router-dom";

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
              provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
              clientId:
                "758236414363-fnh0cqp982cp59pg8duuhrbaprq49g99.apps.googleusercontent.com",
            },
          ],
          credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO,
        }}
        firebaseAuth={firebase.auth()}
      />
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  display: grid;
  min-height: 100vh;
  grid-template-rows: 8vh auto;
  ${(props) => props.theme.backGroundImage()}
`;

export default LoginPage;
