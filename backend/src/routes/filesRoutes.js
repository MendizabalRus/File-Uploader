const express = require("express");
const filesRoutes = express.Router();

const upload = require("../multer.js");
const ensureAuthenticated = require("../controllers/ensureAuth.js");
const filesControllers = require("../controllers/filesControllers.js")

filesRoutes.post("/upload", ensureAuthenticated, upload.single("file"), filesControllers.postFile);

module.exports = filesRoutes;
