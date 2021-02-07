import React from "react";
import styled from "styled-components";
import StyledButton from "../components/styledbutton";

const ProjectItem = ({ name, location, time, players }) => (
  <ItemWrapper>
    <GameText>{name}</GameText>
    <GameText>{location}</GameText>
    <GameText>{time}</GameText>
    <GameText>{players}</GameText>
    <StyledButton text={"Join"} />
  </ItemWrapper>
);

const ItemWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 5rem;
  background: rgb(${(props) => props.theme.colors.gulfBlueTransparent});
  button {
    margin-right: 1rem;
    margin-left: 1rem;
    width: 3.5rem;
    height: 2rem;
  }
  @media only screen and (min-width: ${props => props.theme.mediaQuery.tabletWidth}) {
    justify-content: space-between;
  }
`;
const GameText = styled.p`
    color: white;
    font-size: ${(props) => props.theme.fontSizes.small};
    margin-left: ${(props) => props.theme.margins.small};
}
`;

export default ProjectItem;
