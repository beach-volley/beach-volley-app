import { React, useState } from "react";
import styled from "styled-components";
import { StyledButton } from "./StyledButton";

const AddPlayerForm = () => {
  const [newName, setNewName] = useState("");

  const onNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleContact = (event) => {
    event.preventDefault();
    //todo send invite
    console.log(newName);
    setNewName("");
  };

  return (
    <InviteContainer>
          <input type="text" value={newName} onChange={onNameChange} placeholder="Pelaajan nimi"/>
      <InviteButton type="button" onClick={handleContact}>Lähetä</InviteButton>
    </InviteContainer>
  );
};

const InviteContainer = styled.div`
  display: flex;
  margin: 2rem 0;
  input {
    width: 100%;
  }
`;

const InviteButton = styled(StyledButton)`
  height: 50%;
  margin-top: auto;
`;


export default AddPlayerForm;
