// Packages
const path = require("node:path");
const { prisma } = require("../../lib/prisma.js");

const postUploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ error: "Endpoint did not receive any file." });
    }

    const { folderId } = req.params;

    const parentId =
      folderId && folderId !== "root" ? parseInt(folderId, 10) : null;

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

const postUpdateFile = async (req, res) => {
  try {
    const id = parseInt(req.params.fileId, 10);
    const { name } = req.body;

    const file = await prisma.file.findUnique({
      where: { id: id },
    });

    if (!file || file.ownerId !== req.user.id) {
      return res.status(404).json({ error: "File was not found." });
    }

    const update = await prisma.file.update({
      where: { id: id },
      data: {
        ...(name !== undefined && { originalName: name.trim() }),
      },
    });

    res.json(update);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Could not update file" });
  }
};

const postDeleteFile = async (req, res) => {
  try {
    const id = parseInt(req.params.fileId, 10);

    const file = await prisma.file.delete({
      where: { id: id },
    });

    return res.status(200).json({ message: "File deleted successfully." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Could not delete file." });
  }
};

module.exports = {
  postUploadFile,
  postUpdateFile,
  postDeleteFile,
};
