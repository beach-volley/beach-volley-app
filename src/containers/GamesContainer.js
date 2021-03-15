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
      <ColumnDescriptions>
        <p>Sijainti</p>
        <p>Aika</p>
        <p>Pelaajien lukumäärä</p>
      </ColumnDescriptions>
      {matches.data?.matches.edges.map(({ node }) => (
        <ListStyle key={node.nodeId}>
          <RowWrapper>
            <GameItem
              id={node.id}
              location={node.location}
              time={node.time}
              players={node.playerLimit}
            />
          </RowWrapper>
        </ListStyle>
      ))}
    </ListContainer>
  );
};

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  grid-row: 3;
  margin: 4rem 1rem 0 1rem;
  @media only screen and (min-width: ${(props) =>
      props.theme.mediaQuery.tabletWidth}) {
    margin: auto;
    width: 50%;
  }
`;

const ListStyle = styled.div`
  list-style: none;
  margin: 0.5rem 0;
`;

const RowWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 5rem;
  background: rgb(${(props) => props.theme.colors.gulfBlueTransparent});
  @media only screen and (min-width: ${(props) =>
      props.theme.mediaQuery.tabletWidth}) {
    justify-content: space-between;
  }
  p {
    color: white;
    font-size: ${(props) => props.theme.fontSizes.small};
    margin-left: ${(props) => props.theme.margins.small};
    font-weight: 900;
    flex: 1;
  }

  p:last-child {
    margin-right: 5.5rem;
  }
`;

const ColumnDescriptions = styled(RowWrapper)`
  height: 2.5rem;
  border-style: solid;
`;

export default Games;
