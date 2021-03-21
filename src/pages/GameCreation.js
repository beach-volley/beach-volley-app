import styled from "styled-components";
import FormContainer from "../containers/CenterContainer";
import Header from "../containers/Header";
import CreateGameForm from "../components/CreateGameForm";

const GameCreation = () => {
  return (
    <PageWrapper>
      <Header />
      <FormContainer title={"Luo peli"}>
        <CreateGameForm />
      </FormContainer>
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  display: grid;
  min-height: 100vh;
  grid-template-rows: 8vh auto;
  ${(props) => props.theme.backGroundImage()}
`;

export default GameCreation;
