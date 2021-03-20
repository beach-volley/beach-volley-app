import React from "react";
import styled from "styled-components";
import GameItemInfo from "../components/GameItemInfo";
import { StyledButton } from "../components/StyledButton";
import { useHistory } from "react-router";
import { useQuery } from "@apollo/client";
import { MATCHES } from "../queries";

const Games = () => {
  const matches = useQuery(MATCHES);
  let history = useHistory();

  const joinMatchById = (id) => {
    history.push({
      pathname: "/single-game/" + id,
    });
  };

  if (matches.loading) {
    return <div>loading...</div>;
  }

  return (
    <ListContainer>
      {matches.data?.matches.edges
        .map(({ node }) => (
          <ListStyle key={node.nodeId}>
            <CardWrapper>
              <Row>
                <GameItemInfo location={node.location} time={node.time} />
              </Row>
              <Row>
                <GameItemInfo players={node.playerLimit} />
              </Row>
              <JoinGameButton onClick={() => joinMatchById(node.id)}>
                Näytä
              </JoinGameButton>
            </CardWrapper>
          </ListStyle>
          //newest first
        ))
        .reverse()}
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

const JoinGameButton = styled(StyledButton)`
  position: absolute;
  right: 0;
  bottom: 1rem;
  margin-right: 1rem;
  width: 4rem;
  height: 2rem;
`;

export default Games;
