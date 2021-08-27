const mongoose = require("mongoose");
const User = require("./User");
const { Schema } = mongoose;

const houseInfoSchema = new Schema({
  address: {
    type: String,
    required: true,
  },
  houseType: {
    type: String,
    required: true,
    enum: ["Bungalow", "Duplex","Room and Parlour","One Bedroom Flat",
      "Two Bedroom Flat","Three Bedroom Flat"],
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const HouseInfo = mongoose.model("HouseInfo", houseInfoSchema);

module.exports = HouseInfo;
