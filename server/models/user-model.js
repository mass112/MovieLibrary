const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
  visibility: { type: String },
  name: { type: String },
  items: [{ type: String }],
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 3,
    max: 20,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    max: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    max: 50,
  },
  password: {
    type: String,
    required: true,
    min: 8,
  },
  moviesLists: [{ type: mongoose.Types.ObjectId, required: true, ref: "List" }],
});

module.exports = mongoose.model("User", userSchema);
