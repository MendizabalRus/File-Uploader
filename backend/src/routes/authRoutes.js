// packages
const express = require("express");
const authRouter = express.Router();

// files
const authController = require("../controllers/authControllers.js");

authRouter.post("/register", authController.postRegister);
//authRouter.post("/log-in", authController.postLogIn);
//authRouter.post("/log-out", authController.postLogOut);
authRouter.post("/auth/me", authController.postAuthMe);

module.exports = authRouter;
