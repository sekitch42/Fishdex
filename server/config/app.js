// I still need to add authentication and other functionality
const express = require("express");
const path = require("path");
const morgan = require("morgan");

let mongoose = require('mongoose');
let DB = require('./db');

// routes
let indexRouter = require("../routes/index");
let fishRouter = require("../routes/fish");

let app = express();
// Test DB Connection
mongoose.connect(DB.URI);
let mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console,'Connection error'));
mongoDB.once('open',()=>{
  console.log('Connected to the MongoDB');
})
// view engines
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "ejs");

// static files
app.use(express.static(path.join(__dirname, "../../public")));
app.use(express.static(path.join(__dirname, 'public')));

// middleware
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// use routes
app.use("/", indexRouter);
app.use("/fishs", fishRouter);



module.exports = app;
