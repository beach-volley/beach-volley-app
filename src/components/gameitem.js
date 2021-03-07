import React from "react";
import styled from "styled-components";
import { StyledButton } from "../components/styledbutton";
import { useHistory } from "react-router";

const ProjectItem = ({ id, location, time, players }) => {
  let history = useHistory();

  const joinMatchById = () => {
    history.push({
      pathname: "/single-game/" + id,
    });
  };

  let formatted_time = time?.start.value
    ? new Date(time?.start.value).toLocaleString("fi-FI", {
        dateStyle: "short",
        timeStyle: "short",
      })
    : null;

  return (
    <>
      <p>{location}</p>
      <p>{formatted_time}</p>
      <p>
        {asInclusive(players?.start.value, players?.start.inclusive)} -{" "}
        {asInclusive(players?.end.value, players?.end.inclusive)}
      </p>
      <JoinGameButton onClick={joinMatchById}>View</JoinGameButton>
    </>
  );
};

const asInclusive = (value, inclusive) => {
  if (inclusive === false) {
    return value - 1;
  } else {
    return value;
  }
};

const JoinGameButton = styled(StyledButton)`
  margin-right: 1rem;
  margin-left: 1rem;
  width: 3.5rem;
  height: 2rem;

`;

export default ProjectItem;
