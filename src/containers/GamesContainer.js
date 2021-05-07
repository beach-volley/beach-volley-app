import React, { useState } from "react";
import styled from "styled-components";
import moment from "moment";
import GameItemInfo from "../components/GameItemInfo";
import { StyledButton, StyledContainer } from "../components/ComponentStyles";
import { useHistory } from "react-router";
import { useQuery } from "@apollo/client";
import {
  MATCHES,
  CURRENT_USER_MATCHES_JOINS,
  MATCHES_INVITATIONS,
} from "../queries";
import LoadingComponent from "../components/LoadingComponent";

const Games = () => {
  const matches = useQuery(MATCHES);
  const currentUserMatchesJoins = useQuery(CURRENT_USER_MATCHES_JOINS);
  const matchesInvitations = useQuery(MATCHES_INVITATIONS);
  const [filter, setFilter] = useState("public");

  const userCreatedGames =
    currentUserMatchesJoins.data?.currentUser?.matchesByHostId?.edges;
  const allPublicGames = matches.data?.publicMatches?.edges;
  const userJoinedGames =
    currentUserMatchesJoins.data?.currentUser?.joinsByParticipantId?.edges;
  const userInvitedGames =
    matchesInvitations.data?.currentUser?.invitations?.edges;

  let history = useHistory();
  const joinMatchById = (id) => {
    history.push({
      pathname: "/single-game/" + id,
    });
  };

  const filterGameList = () => {
    const games = {
      public: allPublicGames,
      joined: userJoinedGames,
      created: userCreatedGames,
      invited: userInvitedGames,
    };

    return dateFilter(games[filter.toLowerCase()]) ?? [];
  };

  const dateFilter = (games) => {
    if (filter === "joined" || filter === "invited") {
      return games?.filter(
        (game) =>
          new Date(game.node.match.time.end.value) >
            moment(new Date()).subtract(1, "days") &&
          game.node.match.status !== "CANCELLED"
      );
    }

    return games?.filter(
      (game) =>
        new Date(game.node.time.end.value) >
          moment(new Date()).subtract(1, "days") &&
        game.node.status !== "CANCELLED"
    );
  };

  const whichTabPushed = () => {
    const tabs = {
      public: 1,
      joined: 2,
      created: 3,
      invited: 4,
    };

    return tabs[filter.toLowerCase()] ?? 1;
  };

  if (
    matches.loading ||
    currentUserMatchesJoins.loading ||
    matchesInvitations.loading
  ) {
    return <LoadingComponent />;
  }

  return (
    <ContainerWrapper>
      <GameTabRow whichTabPushed={whichTabPushed}>
        <GameTab onClick={() => setFilter("public")}>
          <p>Julkiset</p>
        </GameTab>

        <GameTab onClick={() => setFilter("joined")}>
          <p>Liitytyt</p>
        </GameTab>

        <GameTab onClick={() => setFilter("created")}>
          <p>Luodut</p>
        </GameTab>

        <GameTab onClick={() => setFilter("invited")}>
          <p>Kutsuttu</p>
        </GameTab>
      </GameTabRow>

      <ListContainer>
        {filterGameList()?.map(({ node }) => (
          <ListStyle key={node.id || node.match?.id}>
            <CardWrapper status={node.status || node.match?.status}>
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
                  skillLevel={
                    node.requiredSkillLevel || node.match?.requiredSkillLevel
                  }
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
    user-select: none;
  }
  @media only screen and (min-width: ${(props) =>
      props.theme.mediaQuery.tabletWidth}) {
    width: 60%;
  }
`;

const GameTabRow = styled.div`
  display: flex;
  div:nth-last-child(n + 2) {
    margin-right: 1rem;
  }
  div:nth-child(${(props) => props.whichTabPushed()}) {
    border: 0.15rem solid black;
  }
`;

const GameTab = styled(StyledContainer)`
  flex: 1;
  text-align: center;
  padding: 0 0.5rem;
  margin-bottom: 0.5rem;
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  overflow-y: auto;
  height: 50vh;
  user-select: none;
`;

const ListStyle = styled.div`
  list-style: none;
  margin: 0.5rem 0;
`;

const CardWrapper = styled(StyledContainer)`
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 1rem 1rem 2.5rem 0;
  background: ${(props) => props.status === "CONFIRMED" && "grey"};
`;

const Row = styled.div`
  display: flex;
  p {
    margin-left: 2rem;
  }
`;

const JoinGameButton = styled(StyledButton)`
  position: absolute;
  right: 0.5rem;
  bottom: 0.5rem;
  padding: 0 0.5rem;
  border-radius: 10%;
  font-weight: bold;
  height: 1.5rem;
`;

export default Games;
