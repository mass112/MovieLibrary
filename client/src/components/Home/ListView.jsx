import React, { useEffect, useState } from "react";
import { Box, Container } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import {
  addToListRoute,
  apiRoute,
  getListRoute,
  remFromListRoute,
} from "../../utils/APIRoutes";
import MovieCard from "./MovieCard";
import classes from "./Dashboard.module.css";
import DetailDailog from "./DetailDailog";
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

const ListView = () => {
  const location = useLocation();
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [currentMovie, setCurrentMovie] = useState();
  const [isUpdated, setIsUpdated] = useState(false);
  const { isLoading: getLoading, sendRequest: getSendRequest } = useHTTP();
  const token = useSelector((state) => state.auth.token);

  const searchMovie = async (id) => {
    let data;
    try {
      const response = await fetch(`${apiRoute}&i=${id}`);
      data = await response.json();
    } catch (err) {
      console.log(err);
    }

    return data;
  };

  useEffect(() => {
    const getMyList = async () => {
      try {
        const responseData = await getSendRequest(
          getListRoute,
          "POST",
          JSON.stringify({ listId: location.pathname.split("/")[2] }),
          {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          }
        );
        console.log(responseData);
        const movList = await Promise.all(
          responseData.list.movies.map(async (i) => {
            const v = await searchMovie(i);
            console.log(v);
            return v;
          })
        );
        console.log(movList);
        setMovies([...movList]);
      } catch (err) {
        toast.error(err.message, toastOptions);
      }
    };
    setIsLoading(true);
    getMyList();
    setIsLoading(false);
  }, [getSendRequest, location, token, isUpdated]);

  const removeFromListFun = async (movId) => {
    try {
      const responseData = await getSendRequest(
        remFromListRoute,
        "POST",
        JSON.stringify({
          listId: location.pathname.split("/")[2],
          movieId: movId,
        }),
        {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      );
      toast.success("Successfully added", toastOptions);
      setOpenDetail(false);
      setIsUpdated((prev) => !prev);
    } catch (err) {
      toast.error(err.message, toastOptions);
    }
  };

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
        <div>
          {movies?.length > 0 ? (
            <div className={classes.container}>
              {movies.map((movie) => {
                console.log(movie);
                return (
                  <div
                    onClick={() => {
                      setCurrentMovie(movie.imdbID);
                      setOpenDetail(true);
                    }}
                    key={movie.imdbID}
                  >
                    <MovieCard movie={movie} />
                  </div>
                );
              })}
            </div>
          ) : (
            <div className={classes.empty}>
              {isLoading ? <h2>Loading...</h2> : <h2>No Movies found</h2>}
            </div>
          )}
        </div>
      </Container>

      {openDetail && !!currentMovie && (
        <DetailDailog
          open={openDetail}
          handleClose={() => setOpenDetail(false)}
          movieId={currentMovie}
          actionFunction={removeFromListFun}
          actionType="rem"
        />
      )}
    </>
  );
};

export default ListView;
