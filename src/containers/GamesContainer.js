import React, { useState } from "react";
import styled from "styled-components";
import moment from "moment";
import GameItemInfo from "../components/GameItemInfo";
import { StyledButton } from "../components/ComponentStyles";
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

    return games[filter.toLowerCase()].filter((game)=>game.node.status !== "CANCELLED" ?? []);
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
            <CardWrapper status={node.status || node.match?.status }>
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
  div:nth-last-child(n + 2) {
    margin-right: 1rem;
  }
  div:nth-child(${(props) => props.whichTabPushed()}) {
    border: 0.15rem solid black;
  }
`;

const GameTab = styled.div`
  flex: 1;
  text-align: center;
  padding: 0 0.5rem;
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
  padding: 1.5rem;
  background: ${(props) =>
    props.status === "UNCONFIRMED" ? "rgb(1, 20, 88, 0.75)" : "grey"};
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
