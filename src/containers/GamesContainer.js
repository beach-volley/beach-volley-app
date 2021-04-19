import React, { useState } from "react";
import styled from "styled-components";
import GameItemInfo from "../components/GameItemInfo";
import { StyledButton } from "../components/ComponentStyles";
import { useHistory } from "react-router";
import { useQuery } from "@apollo/client";
import {
  MATCHES,
  CURRENT_USER_MATCHES_JOINS,
  ALL_USERS,
  MATCHES_INVITATIONS,
} from "../queries";
import LoadingComponent from "../components/LoadingComponent";

const Games = () => {
  const matches = useQuery(MATCHES);
  const currentUserMatchesJoins = useQuery(CURRENT_USER_MATCHES_JOINS);
  const allUsers = useQuery(ALL_USERS);
  const matchesInvitations = useQuery(MATCHES_INVITATIONS);
  const [gameFilter, setGameFilter] = useState("");

  console.log({ allUsers });
  console.log({ matchesInvitations });

  const userCreatedGames =
    currentUserMatchesJoins.data?.currentUser?.matchesByHostId?.edges;
  const userJoinedGames =
    currentUserMatchesJoins.data?.currentUser?.joinsByParticipantId?.edges;
  const allPublicGames = matches.data?.publicMatches.edges;

  let history = useHistory();
  const joinMatchById = (id) => {
    history.push({
      pathname: "/single-game/" + id,
    });
  };

  const filterGameList = () => {
    if (gameFilter === "joined") {
      return userJoinedGames;
    }
    if (gameFilter === "created") {
      return userCreatedGames;
    }
    return allPublicGames.filter((game) => game.node.status === "UNCONFIRMED");
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
    return <LoadingComponent />;
  }

  console.log(userCreatedGames);
  return (
    <ContainerWrapper>
      <GameTabRow whichTabPushed={whichTabPushed}>
        <GameTab onClick={() => setGameFilter("")}>
          <p>Julkiset pelit</p>
        </GameTab>
        <GameTab onClick={() => setGameFilter("joined")}>
          <p>Liitytyt pelit</p>
        </GameTab>
        <GameTab onClick={() => setGameFilter("created")}>
          <p>Luodut pelit</p>
        </GameTab>
      </GameTabRow>
      <ListContainer>
        {filterGameList()?.map(({ node }) => (
          <ListStyle key={node.id || node.match?.id}>
            <CardWrapper>
              <Row>
                <GameItemInfo
                  status={node.status || node.match?.status}
                  location={node.location || node.match?.location}
                  time={node.time || node.match?.time}
                />
              </Row>
              <Row>
                <GameItemInfo
                  players={node.playerLimit || node.match?.playerLimit}
                />
              </Row>
              <JoinGameButton
                onClick={() => joinMatchById(node.id || node.match?.id)}
              >
                Näytä
              </JoinGameButton>
            </CardWrapper>
          </ListStyle>
        ))}
      </ListContainer>
    </ContainerWrapper>
  );
};

const ContainerWrapper = styled.div`
  width: 90%;
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
