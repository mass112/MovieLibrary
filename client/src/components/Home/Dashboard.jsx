import React, { useEffect, useState } from "react";
import { Box, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { apiRoute } from "../../utils/APIRoutes";
import MovieCard from "./MovieCard";
import classes from "./Dashboard.module.css";
import DetailDailog from "./DetailDailog";

function Dashboard() {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [currentMovie, setCurrentMovie] = useState();

  const searchMovies = async (title) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${apiRoute}&s=${title}`);
      const data = await response.json();
      setMovies(data.Search);
      //   console.log(data);
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    // searchMovies("Batman");
  }, []);

  return (
    <>
      <Container
        component="main"
        sx={{
          padding: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div className={classes.app}>
          <div className={classes.search}>
            <input
              placeholder="Search for Movies"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
            />
            <img
              src="https://media.geeksforgeeks.org/wp-content/uploads/20230626112934/search.png"
              alt="search icon"
              onClick={() => searchMovies(searchTerm)}
            />
          </div>

          {movies?.length > 0 ? (
            <div className={classes.container}>
              {movies.map((movie) => (
                <div
                  onClick={() => {
                    setCurrentMovie(movie.imdbID);
                    setOpenDetail(true);
                  }}
                  key={movie.imdbID}
                >
                  <MovieCard movie={movie} />
                </div>
              ))}
            </div>
          ) : (
            <div className={classes.empty}>
              {isLoading ? <h2>Loading...</h2> : <h2>No Movies found</h2>}
            </div>
          )}
        </div>
        {/* <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        sx={{ m: 5 }}
      >
        <Grid item xs>
          <Card raised sx={{ maxWidth: 345, minWidth: 225 }}>
            <CardActionArea onClick={() => navigate("/game/tic-tac-toe")}>
              <CardMedia
                component="img"
                height="240"
                image="/xox_pof.jpg"
                alt="Tic Tac Toe"
              />
              <CardContent sx={{ bgcolor: "#B5F9FF" }}>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  sx={{ fontFamily: "cursive", fontWeight: "800" }}
                >
                  Tic Tac Toe
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid> */}
      </Container>

      {openDetail && !!currentMovie && (
        <DetailDailog
          open={openDetail}
          handleClose={() => setOpenDetail(false)}
          movieId={currentMovie}
        />
      )}
    </>
  );
}

export default Dashboard;
