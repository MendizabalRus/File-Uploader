const express = require("express");
const foldersRoutes = express.Router();

const ensureAuthenticated = require("../controllers/ensureAuth.js");
const foldersControllers = require("../controllers/foldersControllers.js");

foldersRoutes.post("/create", ensureAuthenticated, foldersControllers.postCreateFolder);
foldersRoutes.get("/:folderId", ensureAuthenticated, foldersControllers.getFolder);
foldersRoutes.post("/update/:folderId", ensureAuthenticated, foldersControllers.postUpdateFolder);
foldersRoutes.post("/delete/:folderId", ensureAuthenticated, foldersControllers.postDeleteFolder);

module.exports = foldersRoutes;
