import React from "react";

const ProjectItem = ({ location, time, players, status }) => {
  let formatted_time = time?.start.value
    ? new Date(time?.start.value).toLocaleString("fi-FI", {
        dateStyle: "short",
        timeStyle: "short",
      })
    : null;

  return (
    <>
      {status === "CANCELLED" ? <p>Status: {status}</p> : null}
      {location ? <p>Paikka: {location}</p> : null}
      {formatted_time ? <p>{formatted_time}</p> : null}
      {players ? (
        <p>
          Players: {asInclusive(players?.start.value, players?.start.inclusive)}{" "}
          - {asInclusive(players?.end.value, players?.end.inclusive)}
        </p>
      ) : null}
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

export default ProjectItem;
