import FormContainer from "../containers/CenterContainer";
import Header from "../containers/Header";
import CreateGameForm from "../components/CreateGameForm";
import { PageWrapper } from "../components/ComponentStyles";

const GameCreation = () => {
  const matchData = {
    location: "",
    date: new Date(),
    startTime: new Date(),
    endTime: new Date(),
    minPlayers: 4,
    maxPlayers: 6,
    difficultyLevel: "EASY_HARD",
    publicToggle: false,
    playerList: [],
    description: "",
  };

  return (
    <PageWrapper>
      <Header />
      <FormContainer title={"Luo peli"}>
        <CreateGameForm
          matchData={matchData}
          creatingGame={true}
          editMode={false}
        />
      </FormContainer>
    </PageWrapper>
  );
};

export default GameCreation;
