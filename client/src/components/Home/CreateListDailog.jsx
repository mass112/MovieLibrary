import React, { useEffect, useRef, useState } from "react";
import {
  Typography,
  Dialog,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { apiRoute, createListRoute } from "../../utils/APIRoutes";
import useInput from "../../hooks/use-input";
import useHTTP from "../../hooks/use-http";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const toastOptions = {
  position: "top-center",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
};

const CreateListDailog = ({ open, handleClose }) => {
  const descriptionElementRef = useRef(null);
  const {
    value: fnValue,
    isValid: fnIsValid,
    hasError: fnHasError,
    valueChangeHandler: fnChangeHandler,
    onBlurHandler: fnBlurHandler,
  } = useInput(
    (value) => value.trim() !== "" && value.trim().toLowerCase() !== "default"
  );
  const [visibility, setVisibility] = new useState("public");
  const { isLoading: getLoading, sendRequest: getSendRequest } = useHTTP();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);
  const handleSave = async () => {
    try {
      const responseData = await getSendRequest(
        createListRoute,
        "POST",
        JSON.stringify({ name: fnValue, visibility }),
        {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      );
      toast.success("Successfully added", toastOptions);
      handleClose();
    } catch (err) {
      toast.error(err.message, toastOptions);
    }
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      scroll={"paper"}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle id="scroll-dialog-title">Create List</DialogTitle>
      <DialogContent dividers={true}>
        <DialogContentText
          id="scroll-dialog-description"
          ref={descriptionElementRef}
          tabIndex={-1}
        >
          <Typography>Enter List Details</Typography>
        </DialogContentText>
        <TextField
          label="List Name"
          required
          fullWidth
          autoComplete="given-name"
          id="list-name"
          name="list-name"
          margin="normal"
          value={fnValue}
          onChange={fnChangeHandler}
          onBlur={fnBlurHandler}
          error={fnHasError}
          helperText={
            fnHasError && "Field can't be empty or can't be 'Default'"
          }
        />
        <FormControl>
          <FormLabel id="visibility-radio">Visibility</FormLabel>
          <RadioGroup
            aria-labelledby="visibility-radio"
            name="visibility-radio-group"
            value={visibility}
            row
            onChange={(e) => setVisibility(e.target.value)}
          >
            <FormControlLabel
              value="public"
              control={<Radio />}
              label="Public"
            />
            <FormControlLabel
              value="private"
              control={<Radio />}
              label="Private"
            />
          </RadioGroup>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>

        <Button onClick={handleSave}>Done</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateListDailog;
