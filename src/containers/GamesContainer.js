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
          <CardWrapper>
            <Row>
              <GameItem location={node.location} time={node.time} />
            </Row>
            <Row>
              <GameItem players={node.playerLimit} />
            </Row>
          </CardWrapper>
        </ListStyle>
      ))}
    </ListContainer>
  );
};

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  grid-row: 3;
  margin-top: 10rem;
  width: 95%;
  margin: auto;
  margin-top: 10rem;
  overflow-y: auto;
  height: 50vh;
  @media only screen and (min-width: ${(props) =>
      props.theme.mediaQuery.tabletWidth}) {
    width: 50%;
  }
`;

const ListStyle = styled.div`
  list-style: none;
  margin: 0.5rem 0;
`;

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 8rem;
  background: rgb(${(props) => props.theme.colors.gulfBlueTransparent});
  @media only screen and (min-width: ${(props) =>
      props.theme.mediaQuery.tabletWidth}) {
  }
`;

const Row = styled.div`
  display: flex;

  p {
    color: white;
    font-size: ${(props) => props.theme.fontSizes.small};
    margin-left: ${(props) => props.theme.margins.small};
    font-weight: 900;
  }
`;

export default Games;
