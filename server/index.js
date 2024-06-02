require("dotenv").config();

const userRoutes = require("./routes/user-routes");
const HttpError = require("./models/http-error");

const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/auth", userRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

mongoose
  .connect(process.env.DB_URL, { useNewUrlParser: true })
  .then(() => {
    try {
      const server = app.listen(process.env.PORT || 5000, () => {
        console.log("Server is up and listening");
      });
    } catch (err) {
      console.error(err);
    }
  })
  .catch((err) => {
    console.log("ERROR_CONNECTING_DATABASE", err);
  });
