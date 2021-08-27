const express = require("express");
const router = express.Router();
const {
  registerValidation,
  loginValidation,
  reportValidation,
} = require("../validation/validate");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const mongoose = require("mongoose");
var sess;


//Admin Home page
router.get("/", async (req, res) => {
  try {
    let sess = req.session;
    if (!sess.user) {
      return res.redirect("/login");
    }
    else if (sess) {
      return res.redirect('/hm');
    }
    else {
      return res.render("pagenotfound");
    }
  } catch (e) {
    return res.render("internalserver", { exception: e })
  }
  //res.render("main")
})


//Admin Home page
router.post("/signup", async (req, res) => {
  try {
    console.log("I got here")
    //Passes all the info to render
    var obj = {};

    let registerForm = {
      fullName: req.body.fullname, state: req.body.states,
      address: req.body.address, email: req.body.email,
      password: req.body.password, phoneNumber: req.body.phonenumber
    }
    const { error } = registerValidation(registerForm);
    if (error) {
      var log_message = error.details[0].message;
      obj.error_message = log_message;
      return res.render("login", obj);
    }
    //check if user exist in DB before sending
    const EmailExist = await User.findOne({ email: req.body.email });
    if (EmailExist) {
      obj.error_message = "User Exist in DB";
      return res.render("login", obj);
    }

    //Hash Password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //     //save user to DB
    const user = new User({
      fullName: req.body.fullname,
      email: req.body.email,
      address: req.body.address,
      phoneNumber: req.body.phonenumber,
      state: req.body.states,
      password: hashedPassword,
    });

    try {
      await user.save();
      obj.error_message = "created";
      return res.render("login", obj);
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

    return res.redirect('/hm');
  }
  catch (e) {
    return res.render("internalserver", { exception: e });
  }
});

// Log a user out
router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return console.log(err);
    }
    res.redirect('/');
  });
});

router.get("/getsession", async (req, res) => {
  let userSess = req.session;
  console.log(userSess);
  if (!userSess.user) {
    return res.json("");
  }
  return res.json(userSess.user);
});

module.exports = router;