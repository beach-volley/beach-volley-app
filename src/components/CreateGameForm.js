import React from "react";
import { Form, Formik } from "formik";
import { StyledButton } from "./ComponentStyles";
import styled from "styled-components";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";
import { AlertDialogButton } from "../components/FeedbackComponents";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import moment from "moment";
import { useSnackbar } from "notistack";
import Slide from "@material-ui/core/Slide";
import SendInviteField from "./SendInvite";
import useForm from "../hooks/useForm";

import {
  TextInput,
  PickTime,
  PickDate,
  DropDown,
  ToggleInput,
  FormTextArea,
} from "./InputComponents";

const GameSchema = Yup.object({
  location: Yup.string()
    .min(2, "Täytyy olla vähintään 2 merkkiä pitkä")
    .max(100, "Täytyy olla 100 merkkiä tai vähemmän!")
    .matches(/^[aA-zZ0-9 _-öÖäÄåÅ]+$/, "Käytä vain kirjaimia tai numeroita! ")
    .required("Pakollinen kenttä"),
  date: Yup.date().required("Et voi valita mennyttä päivää"),
  startTime: Yup.string().required("Pakollinen kenttä"),
  endTime: Yup.string()
    .required("Pakollinen kenttä")
    .test(
      "Eri aika",
      "Alotusaika täytyy olla ennen lopetus aikaa",
      function (value) {
        return (
          moment(this.parent.startTime).format("HH:mm:00Z") <
          moment(value).format("HH:mm:00Z")
        );
      }
    )
    .test(
      "Eri aika",
      "Lopetusajan täytyy olla eri kuin aloitusajan!",
      function (value) {
        return this.parent.startTime !== value;
      }
    ),
  difficultyLevel: Yup.string().required("Valitse taso"),
  publicToggle: Yup.boolean(),
  description: Yup.string(),
});

const CreateFieldSet = ({ matchData, singleGameView, currentUser = false }) => {
  const {
    CreateGame,
    UpdateGame,
    LeaveGame,
    JoinGame,
    CancelMatchById,
    IsJoined,
    CanEdit,
  } = useForm();
  const { enqueueSnackbar } = useSnackbar();

  const editMode = CanEdit(matchData, singleGameView);
  const playerJoined = IsJoined();

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Formik
        enableReinitialize
        initialValues={{
          location: singleGameView || editMode ? matchData.location : "",
          date: singleGameView || editMode ? matchData.date : new Date(),
          startTime:
            singleGameView || editMode ? matchData.startTime : new Date(),
          endTime: singleGameView || editMode ? matchData.endTime : new Date(),
          minPlayers: singleGameView || editMode ? matchData.minPlayers : 4,
          maxPlayers: singleGameView || editMode ? matchData.maxPlayers : 6,
          difficultyLevel:
            singleGameView || editMode
              ? matchData.difficultyLevel
              : "EASY_HARD",
          publicToggle:
            singleGameView || editMode ? matchData.publicToggle : false,
          playerList: singleGameView || editMode ? matchData.playerList : [],
          description: singleGameView || editMode ? matchData.description : "",
        }}
        validationSchema={GameSchema}
        onSubmit={(values) => {
          if (editMode) {
            UpdateGame(values).then(
              enqueueSnackbar("Tallennettu", {
                variant: "success",
                autoHideDuration: 1000,
                anchorOrigin: {
                  vertical: "top",
                  horizontal: "center",
                },
                TransitionComponent: Slide,
              })
            );
          } else {
            CreateGame(values).then(
              enqueueSnackbar("Peli luotu", {
                variant: "success",
                autoHideDuration: 1000,
                anchorOrigin: {
                  vertical: "top",
                  horizontal: "center",
                },
                TransitionComponent: Slide,
              })
            );
          }
        }}
      >
        {(props) => (
          <FieldSet singleGameView={singleGameView}>
            <Form>
              <TextInput name="location" label="Sijainti" />

              <PickDate name="date" label="Päivämäärä" />

              <PickTime name="startTime" label="Aloitusaika" ampm={false} />

              <PickTime name="endTime" label="Lopetusaika" ampm={false} />

              <TextInput
                name="minPlayers"
                label="Pelaajat min"
                type="number"
                InputProps={{ inputProps: { min: 4, max: 12, step: "1" } }}
              />
              <TextInput
                name="maxPlayers"
                label="Pelaajat max"
                type="number"
                InputProps={{ inputProps: { min: 6, max: 20, step: "1" } }}
              />

              <DropDown
                name="difficultyLevel"
                label="Taso"
                options={[
                  { value: "EASY", label: "Aloittelija" },
                  { value: "MEDIUM", label: "Keskitaso" },
                  { value: "HARD", label: "Pro" },
                  { value: "EASY_MEDIUM", label: "Aloittelija-Keskitaso" },
                  { value: "MEDIUM_HARD", label: "Keskitaso-Pro" },
                  { value: "EASY_HARD", label: "Kaikki" },
                ]}
              />

              <ToggleInput
                label="Public"
                name="publicToggle"
                toggleYes="Julkinen"
                toggleNo="Yksityinen"
                checked={props.values.publicToggle}
              />

              <TextAreaContainer>
                {singleGameView && editMode && (
                  <>
                    <SendInviteField />
                    <label htmlFor="playernames">Kutsutut pelaajat</label>
                    <InvitedPlayers>
                      {props.values.playerList.map((player) => (
                        <p key={uuidv4()}>{player.name}</p>
                      ))}
                    </InvitedPlayers>
                  </>
                )}

                <GameDescription
                  name="description"
                  placeholder="Kirjoita pelin tiedot tänne"
                  readonly={singleGameView}
                />
              </TextAreaContainer>
              <SubmitCornerButtons>
                {!singleGameView && !editMode && (
                  <CornerButton type="submit">Julkaise peli</CornerButton>
                )}
                {singleGameView && editMode && (
                  <CornerButton type="submit">Tallenna</CornerButton>
                )}
              </SubmitCornerButtons>
            </Form>
          </FieldSet>
        )}
      </Formik>
      <AdditionalCornerButtons>
        {(singleGameView || editMode) &&
          !playerJoined &&
          currentUser.data?.currentUser != null && (
            <CornerButton onClick={JoinGame}>Liity Peliin</CornerButton>
          )}

        {(singleGameView || editMode) && playerJoined && (
          <CornerButton onClick={LeaveGame}>Poistu Pelistä</CornerButton>
        )}
        {editMode && (
          <AlertDialogButton
            ButtonStyle={CornerButton}
            buttonText={"Peru peli"}
            title={"Haluatko perua pelin?"}
            content={""}
            callBack={CancelMatchById}
          />
        )}
        {singleGameView && editMode && <CornerButton>Vahvista</CornerButton>}
      </AdditionalCornerButtons>

      {singleGameView &&
        !matchData.publicToggle &&
        currentUser.data?.currentUser === null && (
          <AnonNameInput>
            <input
              type="text"
              id="anonymousName"
              maxLength="30"
              placeholder="Anna nimi"
            />
            <CornerButton onClick={JoinGame}>Liity Peliin</CornerButton>
          </AnonNameInput>
        )}
    </MuiPickersUtilsProvider>
  );
};

const FieldSet = styled.fieldset`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border: none;
  pointer-events: ${(props) => (props.singleGameView ? "all" : "none")};
`;

const TextAreaContainer = styled.div`
  label {
    color: white;
  }
  @media only screen and (min-width: ${(props) =>
      props.theme.mediaQuery.tabletWidth}) {
    width: 50%;
    margin-left: auto;
  }
`;

const GameDescription = styled(FormTextArea)`
  width: 100%;
  height: 5rem;
  margin-top: 1rem;
  margin-bottom: 5rem;
  overflow-y: scroll !important;
  pointer-events: all !important;
  resize: none;
`;

const InvitedPlayers = styled.div`
  text-align: center;
  border-style: solid;
  border-width: 0.1rem;
  height: 5rem;
  background-color: white;
  overflow-y: scroll !important;
  pointer-events: all !important;
  padding: 0;
  margin-left: auto;
`;

const SubmitCornerButtons = styled.div`
  display: flex;
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 0 1rem 1rem 0;
`;

const AdditionalCornerButtons = styled(SubmitCornerButtons)`
  margin-right: 6rem;
  button {
    margin-right: 1rem;
  }
`;

const CornerButton = styled(StyledButton)`
  height: 2rem;
`;

const AnonNameInput = styled(SubmitCornerButtons)`
  margin-right: 5rem;
  input {
    width: 55%;
  }
`;

export default CreateFieldSet;
