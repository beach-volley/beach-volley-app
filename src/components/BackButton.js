import styled from "styled-components";
import React from "react";
import { useHistory } from "react-router";
import { StyledButton } from "../components/ComponentStyles";

const BackButton = () => {
  let history = useHistory();
  return <TopLeftCornerButton onClick={()=>history.push("/home")}>Takaisin</TopLeftCornerButton>;

};

const TopLeftCornerButton = styled(StyledButton)`
  position: absolute;
  left: 0;
  top: 0;
  height: 1.75rem;
  padding: 0 0.2rem;
  margin: 0.5rem 0 0 0.5rem;
`;

export default BackButton;
