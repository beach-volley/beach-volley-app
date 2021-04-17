import styled from "styled-components";
import Header from "../containers/Header";
import GamesContainer from "../containers/GamesContainer";
import { PageWrapper } from "../components/ComponentStyles";

const GameListing = () => {
  return (
    <PageWrapper>
      <Header />
        <Title>Etsi pelejä, pelaajia tai joukkueita.</Title>
      <GamesContainer />
    </PageWrapper>
  );
};

const Title = styled.h1`
  margin-left: ${(props) => props.theme.margins.small};
  @media only screen and (min-width: ${(props) =>
      props.theme.mediaQuery.tabletWidth}) {
    margin-left: ${(props) => props.theme.margins.large};
  }
`;

export default GameListing;
