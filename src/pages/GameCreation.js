import styled from "styled-components";
import FormContainer from "../containers/CenterContainer";
import Header from "../containers/Header";
import CreateGameForm from "../components/CreateGameForm";

const GameCreation = () => {
  return (
    <PageWrapper>
      <Header />
      <FormContainer title={"Luo peli"}>
        <CreateGameForm disabled={false} />
      </FormContainer>
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  display: grid;
  min-height: 98vh;
  grid-template-rows: 8vh auto;
`;

export default GameCreation;
