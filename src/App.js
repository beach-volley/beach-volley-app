import styled from "styled-components";
import GlobalStyle from "./globalstyle";

const App = () => {
  return (
    <>
      <GlobalStyle />
      <MainWrapper>
        <Header>Header</Header>
        <Title>Title</Title>
        <TitleText>TitleText</TitleText>
        <GamesBox>Games</GamesBox>
        
      </MainWrapper>
    </>
  );
};

const MainWrapper = styled.div`
  display: grid;
  height: 100vh;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(3, 10vh) auto;
  grid-auto-rows: 1fr 1fr;
`;

const Header = styled.div`
  grid-column: 1 / 3;
  grid-row: 1;
  background-color: blue;
`;

const Title = styled.div`
  background-color: green;
  grid-column: 1 / 3;
  grid-row: 2;
`;

const TitleText = styled.div`
  background-color: lightblue;
  grid-column: 1 / 3;
  grid-row: 3;
`;

const GamesBox = styled.div`
  background-color: lightgreen;
  grid-column: 1 / 3;
  grid-row: 4;
`;



export default App;
