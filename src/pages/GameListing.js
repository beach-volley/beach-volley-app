import styled from "styled-components";
import Header from "../containers/Header";
import GameBox from "../containers/GamesContainer";

import firebase from "firebase";
import * as firebaseui from "firebaseui";
import { StyledFirebaseAuth } from "react-firebaseui";

const GameListing = () => {
  return (
    <PageWrapper>
      <Header />
      <TitleTextBox>
        <h1>Search for games, players and teams</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          commodo porta ligula nec dignissim. Maecenas convallis purus mauris,
          eget.
        </p>
      </TitleTextBox>
      {/* todo: move this to better place */}
      <StyledFirebaseAuth
        uiConfig={{
          signInFlow: "popup",
          callbacks: {
            signInSuccessWithAuthResult: () => false,
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
      <GameBox />
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  display: grid;
  height: 100vh;
  grid-template-rows: 8vh 15vh auto;
  #firebaseui_container {
    height: 10vh;
  }
`;

const TitleTextBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  grid-row: 2;
  margin-right: ${(props) => props.theme.margins.small};
  margin-left: ${(props) => props.theme.margins.small};
  @media only screen and (min-width: ${(props) =>
      props.theme.mediaQuery.tabletWidth}) {
    margin-right: ${(props) => props.theme.margins.large};
    margin-left: ${(props) => props.theme.margins.large};
  }
`;

export default GameListing;
