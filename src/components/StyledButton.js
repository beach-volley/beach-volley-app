import styled from "styled-components";

export const StyledButton = styled.button`
  background-color: ${(props) => props.theme.colors.gorse};
  filter: drop-shadow(1px 2px 1px #000000);
  border-radius: 0.5rem;
`;
