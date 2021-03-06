const { render } = require("ejs");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const HouseInfo = require("../models/HouseInfo");
const HouseMate = require("../models/HouseMate");
const User = require("../models/User");
const {
  fmCodeValidation
} = require("../validation/validate");

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

    obj.data = await getPaginatedDataToShare(user, page, perPage);
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

// Delete Screen.
router.get("/del", async (req, res) => {

  try {
    //Retrieving Sessions and User Id.
    let sess = req.session;
    let user = sess.user
    
    console.log(await delData(user));

    if (await delData(user)) {
      sess.user.lookingForHouseMate = false;
      sess.user.lookingForAHouse = false;
      res.redirect("/hm")
    }
    else {
      return res.render("internalserver", { exception: "Something went wrong, Kindly contact the Admin." });
    }

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
      .populate("houseInfo");
  }

  return result;
}

async function delData(users) {
  var result = null;
  var isDeleted = false;
  if (users.lookingForAHouse) {

    HouseMate.deleteMany({ user: mongoose.Types.ObjectId(users._id) }, function (err) {
      if (err) {
        isDeleted = false;
        return false;
      }
      else {
        User.findByIdAndUpdate(users._id, { lookingForAHouse: false },
          function (err) {
            if (err) {
              isDeleted = false;
              return false;
            }
            else {
              isDeleted = true;
              return true
            }
          });
      }
    });

    isDeleted = true;

  }
  else if (users.lookingForHouseMate) {

    result = await HouseMate.findOne({ user: mongoose.Types.ObjectId(users._id), houseOwner: true })

    HouseInfo.findByIdAndDelete(result.houseInfo, function (err) {
      if (err) {
        isDeleted = false;
        return false;
      }
      else {
        HouseMate.deleteMany({ user: mongoose.Types.ObjectId(users._id) }, function (err) {
          if (err) {
            isDeleted = false;
            return false;
          }
          else {
            User.findByIdAndUpdate(users._id, { lookingForAHouse: false },
              function (err) {
                if (err) {
                  isDeleted = false;
                  return false;
                }
                else {
                  isDeleted = true;
                  return true
                }
              });
          }
        });
      }
    });
    isDeleted = true;
  }
  return isDeleted;
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