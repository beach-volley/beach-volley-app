import styled from "styled-components";
import GameInfoContainer from "../containers/CenterContainer";
import GameInfoForm from "../components/creategameform";
import Header from "../containers/Header";
import { useQuery } from "@apollo/client";
import { MATCH_BY_ID } from "../queries";

/**
const mockData = {
  location: "test-location",
  date: "2021-02-24",
  startTime: "01:33",
  endTime: "02:44",
  numPlayers: "2-4",
  difficultyLevel: "easy",
  publicToggle: false,
  playerList: [{ name: "test" }],
  description: "test",
};
**/

const SingleGame = (id) => {
  const matchById = useQuery( MATCH_BY_ID, {variables: {id: id.location.id.id}});

  if (matchById.loading) {
    return <div>loading...</div>;
  }

  console.log(matchById.data?.match)

  const asInclusive = (value, inclusive) => {
    if (inclusive === false) {
      return value - 1;
    } else {
      return value;
    }
  };

  const numPlayers = asInclusive(matchById.data?.match.playerLimit.start.value, matchById.data?.match.playerLimit.start.inclusive) +
   "-" + asInclusive(matchById.data?.match.playerLimit.end.value, matchById.data?.match.playerLimit.end.inclusive)

  const matchData = {
    location: matchById.data?.match.location,
    date: matchById.data?.match.time.start.value.slice(0, 10),
    startTime: matchById.data?.match.time.start.value,
    endTime: matchById.data?.match.endTime,
    numPlayers: numPlayers,
    difficultyLevel: matchById.data?.match.difficultyLevel,
    publicToggle: matchById.data?.match.public,
    playerList: [{ name: "test" }],
    description: matchById.data?.match.description,
  }
  console.log({matchData})

  return (
    <PageWrapper>
      <Header />
      <GameInfoContainer title="Player's Game">
        <GameInfoForm mockData={matchData} disabled={true} />
      </GameInfoContainer>
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  display: grid;
  min-height: 100vh;
  grid-template-rows: 8vh auto;
`;

export default SingleGame;
