import styled from "styled-components";
import Header from "../containers/Header";
import GamesContainer from "../containers/GamesContainer";

const GameListing = () => {
  return (
    <PageWrapper>
      <Header />
      <TitleTextBox>
        <h1>Etsi pelejä, pelaajia tai joukkueita.</h1>
      </TitleTextBox>
      <GamesContainer />
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  display: grid;
  min-height: 100vh;
  grid-template-rows: 8vh 15vh auto;
  ${(props) => props.theme.backGroundImage()}
  overflow-y:hidden;
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
