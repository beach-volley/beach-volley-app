import React, { useState } from "react";
import styled from "styled-components";
import { StyledButton } from "./StyledButton";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export const AlertDialogButton = ({
  ButtonStyle,
  buttonText,
  title,
  content,
  callBack,
}) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseAgree = () => {
    setOpen(false);
    callBack();
  };

  return (
    <div>
      <ButtonStyle id="dialog-button" onClick={handleClickOpen}>
        {buttonText}
      </ButtonStyle>
      <DialogWrapper
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Peruuta</Button>
          <Button onClick={handleCloseAgree} autoFocus>
            Vahvista
          </Button>
        </DialogActions>
      </DialogWrapper>
    </div>
  );
};

const Button = styled(StyledButton)`
  width: auto;
  height: 2rem;
`;

const DialogWrapper = styled(Dialog)`
  .MuiDialog-paperWidthSm {
    width: 50%;
  }
`;
