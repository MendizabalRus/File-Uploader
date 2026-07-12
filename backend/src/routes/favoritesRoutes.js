const express = require("express");
const favoritesRoutes = express.Router();

const ensureAuthenticated = require("../controllers/ensureAuth.js");
const favoritesControllers = require("../controllers/favoritesControllers.js")

favoritesRoutes.get("/", ensureAuthenticated, favoritesControllers.getFavorites);

favoritesRoutes.post("/update/folders/:folderId", ensureAuthenticated, favoritesControllers.postFavoriteFolders)
favoritesRoutes.post("/delete/folders/:folderId", ensureAuthenticated, favoritesControllers.postUnfavoriteFolders)

favoritesRoutes.post("/update/files/:fileId", ensureAuthenticated, favoritesControllers.postFavoriteFiles)
favoritesRoutes.post("/delete/files/:fileId", ensureAuthenticated, favoritesControllers.postUnfavoriteFiles)

module.exports = favoritesRoutes;