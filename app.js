const express = require("express");
const ejs = require("ejs");
const app = express();
const port = process.env.PORT || 3040;
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const fileupload = require("express-fileupload");
const bodyParser = require("body-parser");
const session = require("express-session");

const homeRouter = require("./portal/homePortal");
const addRouter = require("./portal/addPortal");
const loginRouter = require("./portal/login");
const {loginRequired} = require("./portal/middleware");
const uest = require('uest')
 
//Favicon
var favicon = require('serve-favicon')
var path = require('path')


const MONGODB_URI = process.env.CONN_STRING;
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  autoIndex: true,
});

// //middleware
app.use(
  express.urlencoded({
    extended: true,
  })
);

//app.use(express.json({limit: '50mb'}));
//app.use(express.urlencoded({limit: '50mb'}));

// app.use(express.json());
app.use(fileupload({ useTempFiles: true }));

//set public directory
app.use(express.static(__dirname + "/public"));

//Setting Favicon
app.use(favicon(path.join(__dirname + '/public/assets/favicon.ico')))

//set ejs as view engine for template
app.set("view engine", "ejs");

app.use(session({
  secret: process.env.SESSION_KEY,
  resave: true,
  saveUninitialized: false
}));

//mongoose connection
let db = mongoose.connection;
//check for connection
db.once("open", () => {
  console.log("mongoDb connection established !!");
});
//check for DB errors
db.on("error", (err) => {
  APIResponse(500, false, "DB error", null);
  console.log(err);
});

app.use(uest())

//General Routes
app.use("/", loginRouter);

// Routes
//app.use("/hm",loginRequired,homeRouter);
app.use("/hm",loginRequired,homeRouter);
app.use("/",loginRequired,addRouter)


app.use((err, req, res, next) => {
  const { statusCode = 500, message = "SOMETHING WENT WRONG !!" } = err;
  res.status(statusCode).json(message);
});

app.use((req, res, next) => {
  next({
      status: 404,
      message: 'Not Found',
  });
});

app.use((err, req, res, next) => {
  if (err.status === 404) {
      return res.render('pagenotfound');
  }

  if (err.status === 500) {
      return res.render('internalserver');
  }

 next();
});

app.listen(port, () => {
  console.log(`server listening at ${port}`);
});



