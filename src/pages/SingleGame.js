import styled from "styled-components";
import GameInfoContainer from "../containers/CenterContainer";
import GameInfoForm from "../components/CreateGameForm";
import { PageWrapper } from "../components/ComponentStyles";
import LoadingComponent from "../components/LoadingComponent";
import Header from "../containers/Header";
import { StyledButton } from "../components/ComponentStyles";
import { AlertDialogButton } from "../components/FeedbackComponents";
import { useQuery } from "@apollo/client";
import { MATCH_BY_ID, PLAYERS_BY_MATCH_ID, CURRENT_USER } from "../queries";
import useForm from "../hooks/useForm";
import BackButton from "../components/BackButton";

const SingleGame = () => {
  const currentUser = useQuery(CURRENT_USER);
  const matchById = useQuery(MATCH_BY_ID, {
    variables: { id: window.location.pathname.slice(13) },
  });

  const { LeaveGame, JoinGame, CancelMatchById } = useForm();
  const hostName = matchById?.data?.match?.host?.name;
  const playersByMatchId = useQuery(PLAYERS_BY_MATCH_ID, {
    variables: {
      id: window.location.pathname.slice(13),
    },
  });

  const allPlayers = () => {
    const players = [];
    for (
      let index = 0;
      index < playersByMatchId.data?.match?.joins.edges.length;
      index++
    ) {
      if (
        playersByMatchId.data?.match?.joins.edges[index]?.node.participant ===
        null
      ) {
        players[index] = playersByMatchId.data?.match?.joins.edges[index]?.node;
      } else {
        players[index] =
          playersByMatchId.data?.match?.joins.edges[index]?.node.participant;
      }
    }
    return players;
  };

  const asInclusive = (value, inclusive) => {
    if (inclusive === false) {
      return value - 1;
    } else {
      return value;
    }
  };

  const minPlayers = asInclusive(
    matchById?.data?.match?.playerLimit?.start.value,
    matchById?.data?.match?.playerLimit?.start.inclusive
  );

  const maxPlayers = asInclusive(
    matchById?.data?.match?.playerLimit?.end.value,
    matchById?.data?.match?.playerLimit?.end.inclusive
  );

  const matchData = {
    location: matchById.data?.match?.location,
    date: matchById.data?.match?.time.start.value.slice(0, 10),
    startTime: matchById.data?.match?.time.start.value,
    endTime: matchById.data?.match?.time.end.value,
    minPlayers: minPlayers,
    maxPlayers: maxPlayers,
    difficultyLevel: matchById.data?.match?.requiredSkillLevel ?? "EASY_HARD",
    publicToggle: matchById.data?.match?.public,
    playerList: allPlayers(),
    description: matchById.data?.match?.description,
    hostId: matchById.data?.match?.host.id,
  };

  const editMode = currentUser.data?.currentUser?.id === matchData.hostId;
  const loggedIn = currentUser.data?.currentUser !== null;

  let isJoined = false;
  const players = [];
  for (
    let index = 0;
    index < playersByMatchId.data?.match?.joins.edges.length;
    index++
  ) {
    players[index] =
      playersByMatchId.data?.match.joins?.edges[index]?.node.participant;
    if (
      players[index]?.id === currentUser.data?.currentUser?.id &&
      currentUser.data?.currentUser?.id != null
    ) {
      isJoined = true;
    }
  }

  if (matchById.loading || playersByMatchId.loading) {
    return (
      <PageWrapper>
        <LoadingComponent />
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <Header />
      <GameInfoContainer title={`Host: ${hostName}`}>
        <BackButton />
        <GameInfoForm
          matchData={matchData}
          creatingGame={false}
          editMode={editMode}
        >
          {loggedIn && (
            <>
              <JoinOrLeave enabled={!isJoined} onClick={JoinGame}>
                Liity
              </JoinOrLeave>
              <JoinOrLeave enabled={isJoined} onClick={LeaveGame}>
                Poistu
              </JoinOrLeave>
            </>
          )}

          {editMode && (
            <>
              <AlertDialogButton
                ButtonStyle={CancelGame}
                buttonText={"Peru"}
                title={"Haluatko perua pelin?"}
                content={""}
                callBack={CancelMatchById}
              />
              <StyledButton>Vahvista</StyledButton>
            </>
          )}

          {!matchData.publicToggle && !loggedIn && (
            <>
              <input
                type="text"
                id="anonymousName"
                maxLength="30"
                placeholder="Anna nimi"
              />
              <StyledButton onClick={JoinGame}>Liity</StyledButton>
            </>
          )}
        </GameInfoForm>
      </GameInfoContainer>
    </PageWrapper>
  );
};

const JoinOrLeave = styled(StyledButton)`
  pointer-events: ${(props) => (props.enabled ? "all" : "none")};
  background-color: ${(props) => (props.enabled ? "#FBFF48" : "grey")};
`;

const CancelGame = styled(StyledButton)`
  background-color: red;
`;

export default SingleGame;
