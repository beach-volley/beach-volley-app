import React from "react";
import styled from "styled-components";
import { StyledButton } from "../components/styledbutton";
// import { useMutation } from "@apollo/client";
// import { DELETE_MATCH } from "../queries";
import { useHistory } from "react-router";

const ProjectItem = ({ id, location, time, players }) => {
  // const [deleteMatch] = useMutation(DELETE_MATCH);

  let history = useHistory();

  // const deleteMatchById = () => {
  //   deleteMatch({
  //     variables: {
  //       input: {
  //         id: id,
  //       },
  //     },
  //   });
  // };

  const joinMatchById = () => {
    history.push({
      pathname: "/single-game/" + id,
    });
  };

  let formatted_time = time?.start.value
    ? new Date(time?.start.value).toLocaleString("fi-FI", {dateStyle: "short", timeStyle: "short"})
    : null;

  return (
    <ItemWrapper>
      <GameText className="game-location">{location}</GameText>
      <GameText className="game-date">{formatted_time}</GameText>
      <GameText  className="game-players">
        {asInclusive(players?.start.value, players?.start.inclusive)} -{" "}
        {asInclusive(players?.end.value, players?.end.inclusive)}
      </GameText>
      <JoinGameButton onClick={joinMatchById}>Join</JoinGameButton>

    </ItemWrapper>
  );
};

const asInclusive = (value, inclusive) => {
  if (inclusive === false) {
    return value - 1;
  } else {
    return value;
  }
};

const ItemWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 5rem;
  background: rgb(${(props) => props.theme.colors.gulfBlueTransparent});
  @media only screen and (min-width: ${(props) =>
      props.theme.mediaQuery.tabletWidth}) {
    justify-content: space-between;
  }
  
  .game-location {
    flex: 2;
  }

  .game-date {
    flex: 2;
  }

  .game-players {
    flex: 2;
  }
`;

const JoinGameButton = styled(StyledButton)`
  margin-right: 1rem;
  margin-left: 1rem;
  width: 3.5rem;
  height: 2rem;
`;

const GameText = styled.p`
  color: white;
  font-size: ${(props) => props.theme.fontSizes.small};
  margin-left: ${(props) => props.theme.margins.small};
  font-weight: 900;
`;

export default ProjectItem;
