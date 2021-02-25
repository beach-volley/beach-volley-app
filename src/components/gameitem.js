import React from "react";
import styled from "styled-components";
import { StyledButton } from "../components/styledbutton";

const ProjectItem = ({ name, location, time, players }) => {
  let formatted_time = time?.start.value
    ? new Date(time?.start.value).toLocaleString()
    : null;

  return (
    <ItemWrapper>
      <GameText>{name}</GameText>
      <GameText>{location}</GameText>
      <GameText>{formatted_time}</GameText>
      <GameText>
        {asInclusive(players?.start.value, players?.start.inclusive)} -{" "}
        {asInclusive(players?.end.value, players?.end.inclusive)}
      </GameText>
      <JoinGameButton>Join</JoinGameButton>
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
  flex: 1;
`;

export default ProjectItem;
