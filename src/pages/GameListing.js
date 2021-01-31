import styled from "styled-components";

import Header from "../containers/Header";
import GameBox from "../containers/GameBox"

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
      <GameBox />
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  display: grid;
  height: 100vh;
  grid-template-rows: 8vh 12vh auto;
`;

const TitleTextBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  grid-row: 2;
  margin-right: ${props => props.theme.margins.small};
  margin-left: ${props => props.theme.margins.small};
  @media only screen and (min-width: ${props => props.theme.mediaQuery.tabletWidth}) {
    margin-right: ${props => props.theme.margins.large};
    margin-left: ${props => props.theme.margins.large};
  }
`;


export default GameListing;
