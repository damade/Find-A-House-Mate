const express = require("express");
const router = express.Router();
const uest = require('uest')
const { addHouseFinderValidation, stateValidation
  , addHouseOwnerValidation, houseInfoValidation } = require("../validation/validate");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const HouseMate = require("../models/HouseMate");
const HouseInfo = require("../models/HouseInfo");
const mongoose = require("mongoose");
var sess;


//Adding House Owner
router.post("/create/ho", async (req, res) => {
  try {
    //Retrieving Sessions and User Id.
    let sess = req.session;
    let ID = sess.user._id

    console.log(req.body);

    //Passes all the info to render
    var obj = {};

    const address = req.body.address;
    const houseType = req.body.houseType;
    const description = req.body.description;

    const { houseInfoError } = houseInfoValidation({address, houseType, description});
    const { error } = stateValidation({state: req.body.state});
    
    if (houseInfoError || error) {
      var log_message = error.details[0].message || houseInfoError.details[0].message;
      obj.error_message = log_message;
      return res.render("addHmRequest", obj);
    }

    try {  
      const savedHouseInfo = await newHouseInfo.save();
      console.log(savedHouseInfo);

      const newFinder = new HouseMate({
        gender: req.body.gender,
        tribe: req.body.tribe,
        religion: req.body.religion,
        duration: req.body.duration,
        music: req.body.music,
        personality: req.body.personality,
        state: req.body.state,
        houseOwner: true,
        comment: (!!req.body.comment.trim() ? req.body.comment : "Nothing To Say"),
        
        user: ID,
      });

      const savedRequest = await newFinder.save();
      console.log(savedRequest);

      User.findByIdAndUpdate(ID, { lookingForAHouse: true },
        function (err) {
          if (err) {
            return res.render("internalserver", { exception: err })
          }
          else {
            sess.user.lookingForHouseMate = true;
            sess.user.lookingForAHouse = false;
            return res.redirect("/hm");
          }
        });
    } catch (err) {
      return res.render("internalserver", { exception: err })
    }
  } catch (e) {
    return res.render("internalserver", { exception: e })
  }
})


//Adding House Finder
router.post("/create/hf", async (req, res) => {
  try {

    //Retrieving Sessions and User Id.
    let sess = req.session;
    let ID = sess.user._id

    //Passes all the info to render
    var obj = {};

    const { error } = addHouseFinderValidation(req.body);

    if (error) {
      var log_message = error.details[0].message;
      obj.error_message = log_message;
      return res.render("addHmRequest", obj);
    }

    const newFinder = new HouseMate({
      gender: req.body.genderf,
      tribe: req.body.tribef,
      religion: req.body.religionf,
      duration: req.body.durationf,
      music: req.body.musicf,
      personality: req.body.personalityf,
      state: req.body.statef,
      comment: (!!req.body.commentf.trim() ? req.body.commentf : "Nothing To Say"),
      user: ID,
    });
    try {
      const savedReport = await newFinder.save();
      console.log(savedReport)
      User.findByIdAndUpdate(ID, { lookingForAHouse: true },
        function (err) {
          if (err) {
            return res.render("internalserver", { exception: err })
          }
          else {
            sess.user.lookingForAHouse = true;
            sess.user.lookingForHouseMate = false;
            return res.redirect("/hm");
          }
        });
    } catch (err) {
      return res.render("internalserver", { exception: err })
    }
  } catch (e) {
    return res.render("internalserver", { exception: e })
  }
})



router.get("/login", (req, res) => {
  var obj = {};
  obj.error_message = "";
  return res.render("login", obj);
});

router.post("/login", async (req, res, next) => {
  console.log(req.body);

  //Passes all the info to render
  var obj = {};

  try {

    const { error } = loginValidation(req.body);

    if (error) {
      var log_message = error.details[0].message;
      obj.error_message = log_message;
      return res.render("login", obj);
    }
    const user = await User.findOne({ email: req.body.loginEmail });

    if (!user) {
      obj.error_message = "Incorrect Email or User Not found, kindly proceed to register";
      return res.render("login", obj);
    }
    const validPassword = await bcrypt.compare(req.body.loginPassword, user.password);
    if (!validPassword) {
      obj.error_message = "Invalid Password";
      return res.render("login", obj);
    }

    sess = req.session;
    sess.user = user

    console.log(sess)

    return res.redirect('/hm/add');
  }
  catch (e) {
    return res.render("internalserver", { exception: e });
  }
});


module.exports = router;