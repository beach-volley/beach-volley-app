import styled from "styled-components";

export const StyledButton = styled.button`
  background-color: ${(props) => props.theme.colors.gorse};
  filter: drop-shadow(1px 2px 1px black);
  border-radius: 0.5rem;
  border-color: black;
`;
