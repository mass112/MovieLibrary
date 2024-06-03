import React, { useEffect, useRef, useState } from "react";
import {
  Typography,
  Dialog,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { apiRoute, getMyListsRoute } from "../../utils/APIRoutes";
import { useSelector } from "react-redux";
import useHTTP from "../../hooks/use-http";
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

const SelectDailog = ({ open, handleClose, handleSave }) => {
  const descriptionElementRef = useRef(null);
  const [lists, setLists] = useState([]);
  const [selList, setSelList] = useState();
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
  useEffect(() => {
    const getLists = async () => {
      try {
        const responseData = await getSendRequest(
          getMyListsRoute,
          "POST",
          null,
          {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          }
        );
        setLists([...responseData.lists]);
        responseData.lists.forEach((i) => {
          if (i.name === "Default") setSelList(i.id);
        });
      } catch (err) {
        toast.error(err.message, toastOptions);
      }
    };
    getLists();
  }, [getSendRequest, token]);
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      scroll={"paper"}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      {getLoading ? (
        <>
          <DialogTitle id="scroll-dialog-title">Select List to Add</DialogTitle>
          <DialogContent dividers={true}>
            <DialogContentText
              id="scroll-dialog-description"
              ref={descriptionElementRef}
              tabIndex={-1}
            >
              <Typography>Loading...</Typography>
            </DialogContentText>
          </DialogContent>
        </>
      ) : (
        <>
          <DialogTitle id="scroll-dialog-title">Select List to Add</DialogTitle>
          <DialogContent dividers>
            <RadioGroup
              ref={descriptionElementRef}
              aria-label="lists"
              name="lists"
              value={selList}
              onChange={(e) => {
                setSelList(e.target.value);
              }}
            >
              {lists.map((lis) => (
                <FormControlLabel
                  value={lis.id}
                  key={lis.id}
                  control={<Radio />}
                  label={lis.name}
                />
              ))}
            </RadioGroup>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
            <Button
              onClick={() => {
                handleSave(selList);
                handleClose();
              }}
            >
              Done
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};

export default SelectDailog;
