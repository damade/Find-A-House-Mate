const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const HouseMate = require("../models/HouseMate");
const User = require("../models/User");
const {
  fmCodeValidation
} = require("../validation/validate");
const _ = require('lodash');
const { use } = require("./addPortal");



// Home page
router.get("/", async (req, res) => {

  try {
    //Retrieving Sessions and User Id.
    let sess = req.session;
    let user = sess.user
    var obj = {};
    obj.data = await getDataToShare(user);
    obj.error_message = "";
    obj.count = 1;
    obj.peopleCount = await getTotalCount(user);
    obj.lfah = user.lookingForAHouse;
    obj.lfafm = user.lookingForHouseMate;
    obj.user = user;
    obj.pref = await getMyPref(user)
    return res.render("main", obj);

  } catch (e) {
    return res.render("internalserver", { exception: e });
  }
})


// Home page
router.get(['/all', '/all/:page'], async (req, res) => {

  try {
    //Retrieving Sessions and User Id.
    let sess = req.session;
    let user = sess.user
    var obj = {};

    //Pagination Info
    var perPage = 20
    var page = req.params.page || 1

    obj.data = await getPaginatedDataToShare(user,page, perPage);
    obj.error_message = "";
    obj.count = 1;
    obj.lfah = user.lookingForAHouse;
    obj.lfafm = user.lookingForHouseMate;
    obj.current = page;
    obj.pages = Math.ceil((await getTotalCount(user)) / perPage);
    return res.render("AllViews/paginatedVa", obj);

  } catch (e) {
    return res.render("internalserver", { exception: e });
  }
})


//Add page
router.get("/add", async (req, res) => {
  try {
    var obj = {};
    obj.error_message = "";
    return res.render("addHmRequest", obj);

  } catch (e) {
    return res.render("internalserver", { exception: e });
  }
  //res.render("main")
})

async function getMyPref(users) {
  var result = null;
  if (users.lookingForAHouse) {
    result = await HouseMate.findOne({
      user: mongoose.Types.ObjectId(users._id),
      houseOwner: false
    });
  }
  else if (users.lookingForHouseMate) {
    result = await HouseMate.findOne({ user: mongoose.Types.ObjectId(users._id), houseOwner: true })
  }

  return result;
}

async function getDataToShare(users) {
  var result = null;
  var newData = null;
  if (users.lookingForAHouse) {
    result = await HouseMate.findOne({
      user: mongoose.Types.ObjectId(users._id),
      houseOwner: false
    });
    newData = await HouseMate.find({
      religion: result.religion, gender: result.gender,
      tribe: result.tribe, duration: result.duration,
      houseOwner: !result.houseOwner,
    })
      .sort({ date: "desc" })
      .limit(10)
      .populate("user")
      .populate("houseInfo");
  }
  else if (users.lookingForHouseMate) {
    result = await HouseMate.findOne({ user: mongoose.Types.ObjectId(users._id), houseOwner: true })
    newData = await HouseMate.find({
      religion: result.religion, gender: result.gender,
      tribe: result.tribe, duration: result.duration,
      houseOwner: !result.houseOwner,
    })
      .sort({ date: "desc" })
      .limit(10)
      .populate("user");
  }
  return newData;
}

async function getPaginatedDataToShare(users, page, perPage) {
  var result = null;
  var newData = null;
  if (users.lookingForAHouse) {
    result = await HouseMate.findOne({
      user: mongoose.Types.ObjectId(users._id),
      houseOwner: false
    });
    newData = await HouseMate.find({
      religion: result.religion, gender: result.gender,
      tribe: result.tribe, duration: result.duration,
      houseOwner: !result.houseOwner,
    })
      .skip((perPage * page) - perPage)
      .limit(perPage)
      .sort({ date: "desc" })
      .populate("user")
      .populate("houseInfo");
  }
  else if (users.lookingForHouseMate) {
    result = await HouseMate.findOne({ user: mongoose.Types.ObjectId(users._id), houseOwner: true })
    newData = await HouseMate.find({
      religion: result.religion, gender: result.gender,
      tribe: result.tribe, duration: result.duration,
      houseOwner: !result.houseOwner,
    })
      .skip((perPage * page) - perPage)
      .limit(perPage)
      .sort({ date: "desc" })
      .populate("user");
  }
  return newData;
}

async function getTotalCount(users) {
  var result = null;
  var count = 0;
  if (users.lookingForAHouse) {
    result = await HouseMate.findOne({
      user: mongoose.Types.ObjectId(users._id),
      houseOwner: false
    });
    count = await HouseMate.countDocuments({
      religion: result.religion, gender: result.gender,
      tribe: result.tribe, duration: result.duration,
      houseOwner: !result.houseOwner,
    }).exec();

  }
  else if (users.lookingForHouseMate) {
    result = await HouseMate.findOne({ user: mongoose.Types.ObjectId(users._id), houseOwner: true })
    count = await HouseMate.countDocuments({
      religion: result.religion, gender: result.gender,
      tribe: result.tribe, duration: result.duration,
      houseOwner: !result.houseOwner,
    }).exec();
  }

  return count;
}

//user:{$ne: mongoose.Types.ObjectId(users._id)}
module.exports = router;