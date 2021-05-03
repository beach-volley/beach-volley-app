import React from "react";
import styled from "styled-components";
import alottelija from "../assets/icons/all.png";
import keskitaso from "../assets/icons/average.png";
import pro from "../assets/icons/pro.png";
import kaikki from "../assets/icons/all.png";

const asInclusive = (value, inclusive) => {
  if (inclusive === false) {
    return value - 1;
  } else {
    return value;
  }
};

const returnIcon = (skillLevel) => {
  const icons = {
    EASY: alottelija,
    MEDIUM: keskitaso,
    HARD: pro,
    EASY_HARD: kaikki,
  };

  return icons[skillLevel.toUpperCase()] ?? alottelija;
};

const GameItemInfo = ({ location, time, players, skillLevel, status }) => {
  let formatted_time = time?.start.value
    ? new Date(time?.start.value).toLocaleString("fi-FI", {
        dateStyle: "short",
        timeStyle: "short",
      })
    : null;

  return (
    <>
      {status === "CANCELLED" ? <p>Peruttu</p> : null}
      {location ? <p>Paikka: {location}</p> : null}
      {formatted_time ? <p>{formatted_time}</p> : null}
      {players ? (
        <p>
          Pelaajat:{" "}
          {asInclusive(players?.start.value, players?.start.inclusive)} -{" "}
          {asInclusive(players?.end.value, players?.end.inclusive)}
        </p>
      ) : null}

      {skillLevel ? (
        <IconBox>
          <p>   Taso:  </p>
         <img src={returnIcon(skillLevel)} alt="difficulty-icon" />
         {" "}
        </IconBox>
      ) : null}
    </>
  );
};

const IconBox = styled.div`
  display: flex;
  img {
    margin-top: 0.5rem;
    margin-left: 0.3rem;

  }
`;

export default GameItemInfo;
