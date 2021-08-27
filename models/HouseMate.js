const mongoose = require("mongoose");
const User = require("./User");
const { Schema } = mongoose;

const houseMateSchema = new Schema({
  houseOwner: {
    type: Boolean,
    default: false,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ["Male", "Female"],
  },
  tribe: {
    type: String,
    required: true,
    enum: ["Yoruba", "Igbo","Hausa","Others"],
  },
  religion: {
    type: String,
    required: true,
    enum: ["Christianity", "Islamic","Others"],
  },
  duration: {
    type: String,
    required: true,
    enum: ["Three Months", "Six Months", "A Year", "Two Years"],
  },
  state: {
    type: String,
    required: true,
  },
  music: {
    type: String,
    enum: ["Afro beat","Pop","Reggae","Others"],
  },
  personality: {
    type: String,
    enum: ["Introvert","Extrovert","Others"],
  },
  comment:{
    type: String,
    default: "No Comments"
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  houseInfo: { 
    required: false,  
    type: Schema.Types.ObjectId, ref: 'HouseInfo' 
  },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
});

const HouseMate = mongoose.model("HouseMate", houseMateSchema);

module.exports = HouseMate;
