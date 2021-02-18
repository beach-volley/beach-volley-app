import React from "react";
import styled from "styled-components";

const StyledButton = ({ text, type }) => {
  return <Button type={type}>{text}</Button>;
};

export default StyledButton;

const Button = styled.button`
  background-color: ${(props) => props.theme.colors.gorse};
  height: 3rem;
  width: 10rem;
  filter: drop-shadow(1px 2px 1px #000000);
  border-radius: 0.5rem;
`;
