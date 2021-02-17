import styled from "styled-components";
import GameFormBox from "../containers/FormBox";
import Header from "../containers/Header";

const GameCreation = () => {
  return (
    <PageWrapper>
      <Header />
      <GameFormBox />
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  display: grid;
  min-height: 100vh;
  grid-template-rows: 8vh auto;
`;

export default GameCreation;
