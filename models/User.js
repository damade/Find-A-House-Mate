const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    min: 6,
    max: 255,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    min: 11,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    min: 6,
    max: 50,
    required: true,
  },
  lookingForAHouse: {
    type: Boolean,
    default: false,
    required: true,
  },
  lookingForHouseMate: {
    type: Boolean,
    default: false,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("User", userSchema);
