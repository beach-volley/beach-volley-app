import styled from "styled-components";
import GameFormBox from "../containers/FormBox";
import Header from "../containers/Header";

const GameCreation = () => {
  return (
    <PageWrapper>
      <Header />
      <GameFormBox>Games</GameFormBox>
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  display: grid;
  height: 100vh;
  grid-template-rows: 8vh 12vh auto;
`;

export default GameCreation;
