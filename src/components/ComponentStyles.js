import styled from "styled-components";

export const StyledButton = styled.button`
  background-color: ${(props) => props.theme.colors.gorse};
  padding:0.35rem 1.2rem;
  border: 0.1rem solid black;
  height: 100%;
  border-radius: 0.1rem;
`;

export const PageWrapper = styled.div`
  display: grid;
  min-height: 100vh;
  grid-template-rows: 8vh auto;
  ${(props) => props.theme.backGroundImage()}
`;
