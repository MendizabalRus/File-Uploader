const express = require("express");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const path = require("node:path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const bcrypt = require("bcryptjs");

const app = express();

app.listen(8080, (err) => {
  if (err) throw err;
  console.log("Server initialised - http://localhost:8080");
});
