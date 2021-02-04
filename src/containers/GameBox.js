import React from "react";
import styled from "styled-components";
import GameItem from "../components/gameitem";
import { v4 as uuidv4 } from "uuid";

const games = [
  {
    name: "Game 1",
    id: uuidv4(),
    location: "Location 1",
    time: "13:00",
    players: "2 / 4",
  },
  {
    name: "Game 2",
    id: uuidv4(),
    location: "Location 2",
    time: "13:00",
    players: "2 / 4",
  },
  {
    name: "Game 3",
    id: uuidv4(),
    location: "Location 3",
    time: "13:00",
    players: "2 / 4",
  },
  {
    name: "Game 4",
    id: uuidv4(),
    location: "Location 4",
    time: "13:00",
    players: "2 / 4",
  },
  {
    name: "Game 5",
    id: uuidv4(),
    location: "Location 5",
    time: "13:00",
    players: "2 / 4",
  },
  {
    name: "Game 6",
    id: uuidv4(),
    location: "Location 6",
    time: "13:00",
    players: "2 / 4",
  },
];

const GameBox = () => (
  <ListContainer>
    {games.map((game) => (
      <ListStyle key={game.id}>
        <GameItem
          name={game.name}
          location={game.location}
          time={game.time}
          players={game.players}
        />
      </ListStyle>
    ))}
  </ListContainer>
);

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  grid-row: 3;
  margin-top: 4rem;
  @media only screen and (min-width: ${(props) =>
      props.theme.mediaQuery.tabletWidth}) {
    margin: auto;
    width: 60%;
  }
`;

const ListStyle = styled.div`
  list-style: none;
  margin: 0.5rem;
`;

export default GameBox;
