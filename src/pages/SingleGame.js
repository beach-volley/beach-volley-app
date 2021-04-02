import styled from "styled-components";
import GameInfoContainer from "../containers/CenterContainer";
import GameInfoForm from "../components/CreateGameForm";
import Header from "../containers/Header";
import { useQuery } from "@apollo/client";
import { MATCH_BY_ID, PLAYERS_BY_MATCH_ID } from "../queries";

const SingleGame = () => {
  const matchById = useQuery(MATCH_BY_ID, {
    variables: { id: window.location.pathname.slice(13) },
  });

  const playersByMatchId = useQuery(PLAYERS_BY_MATCH_ID, {
    variables: {
      id: window.location.pathname.slice(13),
    },
  });

  const allPlayers = () => {
    const players = [];
    for (
      let index = 0;
      index < playersByMatchId.data?.match.joins.edges.length;
      index++
    ) {
      if (
        playersByMatchId.data?.match.joins.edges[index]?.node.participant ===
        null
      ) {
        players[index] = playersByMatchId.data?.match.joins.edges[index]?.node;
      } else {
        players[index] =
          playersByMatchId.data?.match.joins.edges[index]?.node.participant;
      }
    }

    return players;
  };

  if (matchById.loading || playersByMatchId.loading) {
    return (
      <PageWrapper>
        <GameInfoContainer title="Loading" />
      </PageWrapper>
    );
  }

  const asInclusive = (value, inclusive) => {
    if (inclusive === false) {
      return value - 1;
    } else {
      return value;
    }
  };

  const numPlayers =
    asInclusive(
      matchById.data?.match.playerLimit.start.value,
      matchById.data?.match.playerLimit.start.inclusive
    ) +
    "-" +
    asInclusive(
      matchById.data?.match.playerLimit.end.value,
      matchById.data?.match.playerLimit.end.inclusive
    );

  const matchData = {
    location: matchById.data?.match.location,
    date: matchById.data?.match.time.start.value.slice(0, 10),
    startTime: matchById.data?.match.time.start.value,
    endTime: matchById.data?.match.time.end.value,
    numPlayers: numPlayers,
    difficultyLevel: "easy",
    publicToggle: matchById.data?.match.public,
    playerList: allPlayers(),
    description: "test",
    hostId: matchById.data?.match.host.id,
  };

  return (
    <PageWrapper>
      <Header />
      <GameInfoContainer title="Pelaajan Peli">
        <GameInfoForm matchData={matchData} singleGameView={true} />
      </GameInfoContainer>
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  display: grid;
  min-height: 100vh;
  grid-template-rows: 8vh auto;
  ${(props) => props.theme.backGroundImage()}
`;

export default SingleGame;
