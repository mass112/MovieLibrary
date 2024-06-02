const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
  visibility: { type: String, required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  items: [{ type: String, required: true }],
  owner: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
});

module.exports = mongoose.model("List", listSchema);
