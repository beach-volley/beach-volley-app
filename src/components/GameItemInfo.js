import React from "react";

const ProjectItem = ({ id, location, time, players }) => {
  let formatted_time = time?.start.value
    ? new Date(time?.start.value).toLocaleString("fi-FI", {
        dateStyle: "short",
        timeStyle: "short",
      })
    : null;

  console.log(id);
  return (
    <>
      {location ? <p>Location: {location}</p> : null}
      {formatted_time ? <p> Time: {formatted_time}</p> : null}
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
