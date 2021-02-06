import styled from "styled-components";

const GameCreation = () => {
  return (
      <PageWrapper>
        <Header>Header</Header>
        <GameCreationBox>Games</GameCreationBox>
      </PageWrapper>
  );
};

const PageWrapper = styled.div`
  display: grid;
  height: 100vh;
  grid-template-rows: 10vh auto;

`;

const Header = styled.div`
  grid-row: 1;
  background-color: blue;
`;

const GameCreationBox = styled.div`
  background-color: lightgreen; 
  grid-row: 2;
`;

export default GameCreation;
