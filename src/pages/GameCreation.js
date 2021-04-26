import FormContainer from "../containers/CenterContainer";
import Header from "../containers/Header";
import CreateGameForm from "../components/CreateGameForm";
import { PageWrapper } from "../components/ComponentStyles";
import BackButton from "../components/BackButton";


const GameCreation = () => {
  const matchData = {
    location: "",
    date: new Date(),
    startTime: new Date(),
    endTime: new Date(),
    minPlayers: 4,
    maxPlayers: 6,
    difficultyLevel: "EASY",
    publicToggle: false,
    playerList: [],
    description: "",
  };

  return (
    <PageWrapper>
      <Header />
      <FormContainer title={"Luo peli"}>
      <BackButton />
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
