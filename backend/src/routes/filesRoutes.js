const express = require("express");
const filesRoutes = express.Router();

const upload = require("../multer.js");
const ensureAuthenticated = require("../controllers/ensureAuth.js");
const filesControllers = require("../controllers/filesControllers.js")

filesRoutes.post("/upload/:fileId", ensureAuthenticated, upload.single("file"), filesControllers.postUploadFile);
filesRoutes.post("/update/:fileId", ensureAuthenticated, filesControllers.postUpdateFile);
filesRoutes.post("/delete/:fileId", ensureAuthenticated, filesControllers.postDeleteFile)
module.exports = filesRoutes;
