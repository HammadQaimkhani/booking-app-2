const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: " User" },
  title: String,
  address: String,
  photos: [String],
  desicription: String,
  perks: [String],
  extraInfo: String,
  checkIn: Number,
  checkOut: Number,
  maxGuest: Number,
});

const placeModel = mongoose.model("place", placeSchema);
module.exports = placeModel;