import styled from "styled-components";
import FormContainer from "../containers/CenterInfo";
import Header from "../containers/Header";
import CreateGameForm from "../components/creategameform";

const GameCreation = () => {
  return (
    <PageWrapper>
      <Header />
      <FormContainer title={"Create Game"}>
        <CreateGameForm />
      </FormContainer>
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  display: grid;
  min-height: 100vh;
  grid-template-rows: 8vh auto;
`;

export default GameCreation;
