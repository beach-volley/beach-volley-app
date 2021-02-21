import styled from "styled-components";
import GameInfoContainer from "../containers/CenterInfo";
import Header from "../containers/Header";

const SingleGame = () => {
  return (
    <PageWrapper>
      <Header />
      <GameInfoContainer title="Player's Game"></GameInfoContainer>
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  display: grid;
  min-height: 100vh;
  grid-template-rows: 8vh auto;
`;

export default SingleGame;
