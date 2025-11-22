// I still need to add authentication and other functionality
const express = require("express");
const path = require("path");
const morgan = require("morgan");

// routes
const indexRouter = require("../routes/index");
const fishRouter = require("../routes/fish");

const app = express();

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
app.use("/fish", fishRouter);

module.exports = app;
