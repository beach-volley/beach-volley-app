import styled from "styled-components";
import GameInfoContainer from "../containers/CenterContainer";
import GameInfoForm from "../components/creategameform";
import Header from "../containers/Header";

const mockData = {
  location: 'test-location',
  date: "2021-02-24",
  startTime: '01:33',
  endTime: '02:44',
  numPlayers: '2-4',
  difficultyLevel:"easy",
  publicToggle: false,
  playerList: [{ name: "test"}],
  description: "test"
}

const SingleGame = () => {
  return (
    <PageWrapper>
      <Header />
      <GameInfoContainer title="Player's Game">
        <GameInfoForm mockData={mockData} disabled={true} />
      </GameInfoContainer>
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  display: grid;
  min-height: 100vh;
  grid-template-rows: 8vh auto;
`;

export default SingleGame;
