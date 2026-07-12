// Packages
const path = require("node:path");
const { prisma } = require("../../lib/prisma.js");

const getFavorites = async (req, res) => {
  try {
    const [folders, files] = await Promise.all([
      prisma.folderFavorites.findMany({
        where: {
          userId: req.user.id,
        },
        include: {
          folder: {
            include: {
              owner: {
                select: {
                  firstname: true,
                  lastname: true,
                },
              },
            },
          },
        },
      }),

      prisma.fileFavorites.findMany({
        where: {
          userId: req.user.id,
        },
        include: {
          file: {
            include: {
              owner: {
                select: {
                  firstname: true,
                  lastname: true,
                },
              },
            },
          },
        },
      }),
    ]);

    res.json({
      folders: folders.map((f) => ({ ...f.folder, favorite: true })),
      files: files.map((f) => ({ ...f.file, favorite: true })),
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Could not fetch favorite items." });
  }
};

const postFavoriteFolders = async (req, res) => {
  try {
    const id = parseInt(req.params.folderId, 10);

    const folder = await prisma.folder.findUnique({
      where: {
        id: id,
      },
    });

    if (!folder || folder.ownerId !== req.user.id) {
      return res.status(404).json({ error: "Folder not found" });
    }

    const favorite = await prisma.folderFavorites.create({
      data: {
        userId: req.user.id,
        folderId: id,
      },
    });

    return res.status(201).json({ message: "Successfully favorited folder." });
  } catch (err) {
    if (err.code === "P2002") {
      return res.status(409).json({
        error: "Folder already favorited.",
      });
    }
    console.error(err);
    return res.status(500).json({ error: "Could not favorite folder" });
  }
};

const postUnfavoriteFolders = async (req, res) => {
  try {
    const id = parseInt(req.params.folderId, 10);

    const folder = await prisma.folderFavorites.delete({
      where: {
        userId_folderId: {
          userId: req.user.id,
          folderId: id,
        },
      },
    });

    return res
      .status(200)
      .json({ message: "Successfully unfavorited folder." });
  } catch (err) {
    if (err.code === "P2025") {
      return res.status(404).json({
        error: "Favorite not found.",
      });
    }
    console.error(err);
    return res.status(500).json({ error: "Could not unfavorite folder" });
  }
};

const postFavoriteFiles = async (req, res) => {
  try {
    const id = parseInt(req.params.fileId, 10);

    const file = await prisma.file.findUnique({
      where: {
        id: id,
      },
    });

    if (!file || file.ownerId !== req.user.id) {
      return res.status(404).json({ error: "Folder not found" });
    }

    const favorite = await prisma.fileFavorites.create({
      data: {
        userId: req.user.id,
        fileId: id,
      },
    });

    return res.status(201).json({ message: "Successfully favorited file." });
  } catch (err) {
    if (err.code === "P2002") {
      return res.status(409).json({
        error: "File already favorited.",
      });
    }
    console.error(err);
    return res.status(500).json({ error: "Could not favorite file" });
  }
};

const postUnfavoriteFiles = async (req, res) => {
  try {
    const id = parseInt(req.params.fileId, 10);

    const file = await prisma.fileFavorites.delete({
      where: {
        userId_fileId: {
          userId: req.user.id,
          fileId: id,
        },
      },
    });

    return res.status(200).json({ message: "Successfully unfavorited file." });
  } catch (err) {
    if (err.code === "P2025") {
      return res.status(404).json({
        error: "Favorite not found.",
      });
    }
    console.error(err);
    return res.status(500).json({ error: "Could not unfavorite file" });
  }
};

module.exports = {
  getFavorites,
  postFavoriteFolders,
  postUnfavoriteFolders,
  postFavoriteFiles,
  postUnfavoriteFiles,
};
