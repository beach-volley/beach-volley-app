import React from "react";

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
      {skillLevel ? <p>Taso: {skillLevel}</p> : null}
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

export default GameItemInfo;
