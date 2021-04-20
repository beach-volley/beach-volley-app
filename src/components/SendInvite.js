import { React, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useQuery } from "@apollo/client";
import { StyledButton } from "./ComponentStyles";
import { ALL_USERS } from "../queries";
import { InputRow } from "./ComponentStyles";

const SendInviteInput = () => {
  const allUsers = useQuery(ALL_USERS);
  const players = allUsers?.data?.users?.edges.map((user) => ({
    name: user.node.name,
  }));
  const [newName, setNewName] = useState("");

  const onOptionChange = (value) => {
    setNewName(value);
  };

  const handleInvite = (event) => {
    event.preventDefault();
    //todo send invite
    console.log(newName);
    setNewName("");
  };

  if (allUsers.loading) {
    return <label>Ladataan</label>;
  }
  return (
    <InputRow>
      <Autocomplete
        onChange={(event, value) => onOptionChange(value)}
        options={players}
        getOptionSelected={(players) => players.name}
        getOptionLabel={(players) => players.name}
        loadingText={"Ladataan..."}
        renderInput={(params) => <TextField {...params} />}
      />
      <StyledButton onClick={handleInvite}>Kutsu</StyledButton>
    </InputRow>
  );
};

export default SendInviteInput;
