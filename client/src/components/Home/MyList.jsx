import React, { useEffect, useState } from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getMyListsRoute } from "../../utils/APIRoutes";
import useHTTP from "../../hooks/use-http";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

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

function MyList() {
  const navigate = useNavigate();
  const [lists, setLists] = useState([]);
  const { isLoading: getLoading, sendRequest: getSendRequest } = useHTTP();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const getMyLists = async () => {
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
      } catch (err) {
        toast.error(err.message, toastOptions);
      }
    };
    getMyLists();
  }, [getSendRequest, token]);

  return (
    <Container
      component="main"
      sx={{
        padding: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h3" component="h3">
        My Lists
      </Typography>
      {getLoading ? (
        <Typography>Loading...</Typography>
      ) : lists.length === 0 ? (
        <Typography margin={20}>No Lists Found</Typography>
      ) : (
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          sx={{ m: 5 }}
        >
          {lists.map((lis) => (
            <Grid item xs key={lis.id}>
              <Card raised sx={{ maxWidth: 345, minWidth: 225 }}>
                <CardActionArea onClick={() => navigate("/list/" + lis.id)}>
                  <CardMedia
                    component="img"
                    height="240"
                    image={lis.image}
                    alt={lis.name}
                  />
                  <CardContent sx={{ bgcolor: "#B5F9FF" }}>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="div"
                      sx={{ fontFamily: "cursive", fontWeight: "800" }}
                    >
                      {lis.name}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default MyList;
