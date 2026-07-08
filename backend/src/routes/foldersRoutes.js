const express = require("express");
const foldersRoutes = express.Router();

const ensureAuthenticated = require("../controllers/ensureAuth.js");
const foldersControllers = require("../controllers/foldersControllers.js");

foldersRoutes.post("/", ensureAuthenticated, foldersControllers.postCreateFolder);
foldersRoutes.get("/", ensureAuthenticated, foldersControllers.getFolder);
foldersRoutes.post("/update/foder:id", ensureAuthenticated, foldersControllers.postUpdateFolder);
foldersRoutes.post("/delete/folder:id", ensureAuthenticated, foldersControllers.postDeleteFolder);

module.exports = foldersControllers;
