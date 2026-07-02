// packages
const express = require("express");
const authRouter = express.Router();
const passport = require("passport")

// files
const authController = require("../controllers/authControllers.js");

authRouter.post("/register", authController.postRegister);
authRouter.post("/log-in", passport.authenticate("local"), authController.postLogIn);
authRouter.post("/log-out", authController.postLogOut);
authRouter.get("/auth/me", authController.getAuthMe);

module.exports = authRouter;
