import React from "react";
import styled from "styled-components";
import GameItem from "../components/gameitem";
import { useQuery } from "@apollo/client";
import { MATCHES } from "../queries";

const Games = () => {
  const matches = useQuery(MATCHES);

  if (matches.loading) {
    return <div>loading...</div>;
  }

  return (
    <ListContainer>
      {matches.data?.matches.edges.map(({ node }) => (
        <ListStyle key={node.nodeId}>
          <GameItem
            name={node.id}
            location={node.location}
            time={node.time}
            players={node.playerLimit}
          />
        </ListStyle>
      ))}
    </ListContainer>
  );
};

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  grid-row: 3;
  margin-top: 4rem;
  @media only screen and (min-width: ${(props) =>
      props.theme.mediaQuery.tabletWidth}) {
    margin: auto;
    width: 50%;
  }

`;


const ListStyle = styled.div`
  list-style: none;
  margin: 0.5rem;
`;

export default Games;
