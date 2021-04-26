import { React, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useQuery, useMutation } from "@apollo/client";
import { StyledButton } from "./ComponentStyles";
import {
  ALL_USERS,
  CREATE_INVITATION,
  CURRENT_USER,
  USER_ALL_INVITATIONS,
} from "../queries";
import { InputRow } from "./ComponentStyles";
import { useSnackbar } from "notistack";
import Slide from "@material-ui/core/Slide";

const SendInviteInput = () => {
  const allUsers = useQuery(ALL_USERS);
  const currentUser = useQuery(CURRENT_USER);
  const players = allUsers?.data?.users?.edges.map((user) => ({
    name: user.node.name,
    id: user.node.id,
  }));
  const [createInvitation] = useMutation(CREATE_INVITATION);
  const [userId, setUserId] = useState("");
  const userAllInvitations = useQuery(USER_ALL_INVITATIONS, {
    variables: { id: userId },
  });
  const { enqueueSnackbar } = useSnackbar();

  const onOptionChange = (value) => {
    setUserId(value?.id);
  };

  const handleInvite = (event) => {
    event.preventDefault();

    let alreadyJoined = false;
    for (
      let index = 0;
      index < userAllInvitations.data.user.invitations.edges.length;
      index++
    ) {
      if (
        userAllInvitations.data.user.invitations.edges[index].node.match.id ===
        window.location.pathname.slice(13)
      ) {
        alreadyJoined = true;
      }
    }

    if (
      userId !== "" &&
      userId !== null &&
      userId !== currentUser.data.currentUser.id &&
      !alreadyJoined
    ) {
      createInvitation({
        variables: {
          input: {
            invitation: {
              matchId: window.location.pathname.slice(13),
              userId: userId,
            },
          },
        },
      }).then(() => {
        enqueueSnackbar("Kutsu lähetetty", {
          variant: "success",
          autoHideDuration: 2000,
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
          TransitionComponent: Slide,
        });

        window.location.reload();
      });
    }
    setUserId("");
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
      <StyledButton type="button" onClick={handleInvite}>
        Kutsu
      </StyledButton>
    </InputRow>
  );
};

export default SendInviteInput;
