import React, { useState } from "react";
import styled from "styled-components";
import GameItemInfo from "../components/GameItemInfo";
import { StyledButton } from "../components/StyledButton";
import { useHistory } from "react-router";
import { useQuery } from "@apollo/client";
import { MATCHES, CURRENT_USER_MATCHES_JOINS } from "../queries";

const Games = () => {
  const matches = useQuery(MATCHES);
  const currentUserMatchesJoins = useQuery(CURRENT_USER_MATCHES_JOINS);
  const [gameFilter, setGameFilter] = useState("");

  let history = useHistory();
  const joinMatchById = (id) => {
    history.push({
      pathname: "/single-game/" + id,
    });
  };

  const filterGameList = () => {
    if (gameFilter === "joined") {
      return currentUserMatchesJoins.data?.currentUser?.joinsByParticipantId
        ?.edges;
    }
    if (gameFilter === "created") {
      return currentUserMatchesJoins.data?.currentUser?.matchesByHostId?.edges;
    }
    return matches.data?.matches.edges;
  };

  const whichTabPushed = () => {
    if (gameFilter === "") {
      return 1;
    }
    if (gameFilter === "joined") {
      return 2;
    }
    return 3;
  };

  if (matches.loading) {
    return (
      <ContainerWrapper>
        <p>Loading</p>
      </ContainerWrapper>
    );
  }

  return (
    <ContainerWrapper>
      <GameTabRow whichTabPushed={whichTabPushed}>
        <GameTab onClick={() => setGameFilter("")}>
          <p>All games</p>
        </GameTab>
        <GameTab onClick={() => setGameFilter("joined")}>
          <p>Joined Games</p>
        </GameTab>
        <GameTab onClick={() => setGameFilter("created")}>
          <p>Created Games</p>
        </GameTab>
      </GameTabRow>
      <ListContainer>
        {filterGameList()
          ?.map(({ node }) => (
            <ListStyle key={node.id || node.match.id}>
              <CardWrapper>
                <Row>
                  <GameItemInfo
                    location={node.location || node.match.location}
                    time={node.time || node.match.time}
                  />
                </Row>
                <Row>
                  <GameItemInfo
                    players={node.playerLimit || node.match.playerLimit}
                  />
                </Row>
                <JoinGameButton
                  onClick={() => joinMatchById(node.id || node.match.id)}
                >
                  Näytä
                </JoinGameButton>
              </CardWrapper>
            </ListStyle>
            //newest first
          ))
          .reverse()}
      </ListContainer>
    </ContainerWrapper>
  );
};

const ContainerWrapper = styled.div`
  width: 95%;
  margin: auto;
  grid-row: 3;
  p {
    color: white;
    font-size: ${(props) => props.theme.fontSizes.small};
    font-weight: 900;
  }
  @media only screen and (min-width: ${(props) =>
      props.theme.mediaQuery.tabletWidth}) {
    width: 60%;
  }
`;

const GameTabRow = styled.div`
  display: flex;
  div:nth-child(2) {
    margin-left: 1rem;
    margin-right: 1rem;
  }

  div:nth-child(${(props) => props.whichTabPushed()}) {
    border: 0.15rem;
    border-color: black;
    border-style: solid;
  }
`;

const GameTab = styled.div`
  flex: 1;
  text-align: center;
  background: rgb(${(props) => props.theme.colors.gulfBlueTransparent});
  margin-bottom: 0.5rem;
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  overflow-y: auto;
  height: 50vh;
`;

const ListStyle = styled.div`
  list-style: none;
  margin: 0.5rem 0;
`;

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 8rem;
  background: rgb(${(props) => props.theme.colors.gulfBlueTransparent});
`;

const Row = styled.div`
  display: flex;
  p {
    margin-left: 2rem;
  }
`;

const JoinGameButton = styled(StyledButton)`
  position: absolute;
  right: 0;
  bottom: 1rem;
  margin-right: 1rem;
  width: auto;
  height: 2rem;
`;

export default Games;
