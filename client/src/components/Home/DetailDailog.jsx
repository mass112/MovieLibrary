import React, { useEffect, useRef, useState } from "react";
import {
  Typography,
  Dialog,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { apiRoute } from "../../utils/APIRoutes";
import SelectDailog from "./SelectDailog";
// const movie = {
//   Title: "Guardians of the Galaxy Vol. 2",
//   Year: "2017",
//   Rated: "PG-13",
//   Released: "05 May 2017",
//   Runtime: "136 min",
//   Genre: "Action, Adventure, Comedy",
//   Director: "James Gunn",
//   Writer: "James Gunn, Dan Abnett, Andy Lanning",
//   Actors: "Chris Pratt, Zoe Saldana, Dave Bautista",
//   Plot: "After saving Xandar from Ronan's wrath, the Guardians are now recognized as heroes. Now the team must help their leader Star Lord (Chris Pratt) uncover the truth behind his true heritage. Along the way, old foes turn to allies and betrayal is blooming. And the Guardians find that they are up against a devastating new menace who is out to rule the galaxy.",
//   Language: "English",
//   Country: "United States",
//   Awards: "Nominated for 1 Oscar. 15 wins & 60 nominations total",
//   Poster:
//     "https://m.media-amazon.com/images/M/MV5BNjM0NTc0NzItM2FlYS00YzEwLWE0YmUtNTA2ZWIzODc2OTgxXkEyXkFqcGdeQXVyNTgwNzIyNzg@._V1_SX300.jpg",
//   Ratings: [
//     { Source: "Internet Movie Database", Value: "7.6/10" },
//     { Source: "Rotten Tomatoes", Value: "85%" },
//     { Source: "Metacritic", Value: "67/100" },
//   ],
//   Metascore: "67",
//   imdbRating: "7.6",
//   imdbVotes: "762,391",
//   imdbID: "tt3896198",
//   Type: "movie",
//   DVD: "10 Jul 2017",
//   BoxOffice: "$389,813,101",
//   Production: "N/A",
//   Website: "N/A",
//   Response: "True",
// };
const DetailDailog = ({
  open,
  handleClose,
  movieId,
  actionFunction,
  actionType,
}) => {
  const descriptionElementRef = useRef(null);
  const [movie, setMovie] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [openSelect, setOpenSelect] = useState(false);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);
  useEffect(() => {
    const getMovie = async () => {
      try {
        setIsLoading(true);
        console.log(movieId);
        const response = await fetch(`${apiRoute}&plot=full&i=${movieId}`);
        const data = await response.json();
        setMovie(data);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    };
    getMovie();
  }, [movieId]);
  const updateSelectedList = (lis) => {
    actionFunction(lis, movieId);
  };
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={"paper"}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        {isLoading || typeof movie === "undefined" || !movie.Type ? (
          <>
            <DialogTitle id="scroll-dialog-title">Details</DialogTitle>
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
            <DialogTitle id="scroll-dialog-title">
              {movie.Type.toUpperCase()} DETAILS
            </DialogTitle>
            <DialogContent dividers={true}>
              <img src={movie.Poster} alt={movie.Title} />
              <DialogContentText
                id="scroll-dialog-description"
                ref={descriptionElementRef}
                tabIndex={-1}
              >
                <Typography
                  component="h2"
                  variant="h5"
                  color="inherit"
                  noWrap
                  sx={{ flexGrow: 1 }}
                >
                  Name: {movie.Title}
                </Typography>
                <Typography
                  component="h3"
                  variant="h5"
                  color="inherit"
                  noWrap
                  sx={{ flexGrow: 1 }}
                >
                  Released: {movie.Released}
                </Typography>
                <Typography
                  component="h3"
                  variant="h5"
                  color="inherit"
                  noWrap
                  sx={{ flexGrow: 1 }}
                >
                  Genre: {movie.Genre}
                </Typography>
                <Typography
                  component="h3"
                  variant="h5"
                  color="inherit"
                  noWrap
                  sx={{ flexGrow: 1 }}
                >
                  Director: {movie.Director}
                </Typography>
                <Typography
                  component="h3"
                  variant="h5"
                  color="inherit"
                  noWrap
                  sx={{ flexGrow: 1 }}
                >
                  Actors: {movie.Actors}
                </Typography>
                <Typography
                  component="h3"
                  variant="h5"
                  color="inherit"
                  noWrap
                  sx={{ flexGrow: 1 }}
                >
                  IMDB Rating: {movie.imdbRating}
                </Typography>
                <Typography
                  component="h3"
                  variant="h5"
                  color="inherit"
                  noWrap
                  sx={{ flexGrow: 1 }}
                >
                  Language: {movie.Language}
                </Typography>
                <br />
                <Typography
                  component="h2"
                  variant="h6"
                  color="inherit"
                  noWrap
                  sx={{ flexGrow: 1 }}
                >
                  Plot:
                </Typography>
                <Typography
                  component="h4"
                  variant="h6"
                  color="inherit"
                  maxWidth="sm"
                  sx={{ flexGrow: 1 }}
                >
                  {movie.Plot}
                </Typography>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Close</Button>
              {actionType === "add" ? (
                <Button
                  onClick={() => {
                    setOpenSelect(true);
                  }}
                >
                  Add to List
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    actionFunction(movieId);
                  }}
                >
                  Remove From List
                </Button>
              )}
            </DialogActions>
          </>
        )}
      </Dialog>
      {openSelect && (
        <SelectDailog
          open={openSelect}
          handleClose={() => setOpenSelect(false)}
          handleSave={updateSelectedList}
        />
      )}
    </>
  );
};

export default DetailDailog;
