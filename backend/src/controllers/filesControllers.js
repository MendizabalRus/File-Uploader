// Packages
const path = require("node:path");
const { prisma } = require("../../lib/prisma.js");

const postFile = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ error: "Endpoint did not receive any file." });
    }

    const { folderId } = req.params;

    const parentId = folderId && folderId !== "root" ? parseInt(folderId, 10) : null;

    const file = await prisma.file.create({
      data: {
        originalName: req.file.originalname,
        filename: req.file.filename,
        size: req.file.size,
        mimetype: req.file.mimetype,
        ownerId: req.user.id,
        folderId: parentId,
      },
      include: {
        owner: {
          select: {
            firstname: true,
            lastname: true,
          },
        },
      },
    });

    res.status(201).json({
      message: "File uploaded successfully",
      file: {
        originalName: req.file.originalname,
        filename: req.filename,
        size: req.file.size,
        mimeType: req.file.mimetype,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Could not upload file." });
  }
};

module.exports = {
  postFile,
};
