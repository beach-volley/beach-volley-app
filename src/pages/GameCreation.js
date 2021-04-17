import FormContainer from "../containers/CenterContainer";
import Header from "../containers/Header";
import CreateGameForm from "../components/CreateGameForm";
import {PageWrapper} from "../components/ComponentStyles"

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

export default GameCreation;
