const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  place: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "place",
  },
  user: { type: mongoose.Schema.Types.ObjectId, required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  price: Number,
});

const bookingModel = mongoose.model("booking", bookingSchema);
module.exports = bookingModel;
