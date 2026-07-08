const { prisma } = require("../../lib/prisma.js");

const postCreateFolder = async (req, res) => {
  try {
    const { name, parentId } = req.body;

    if (!name || !name.trim()) {
      return res
        .status(400)
        .json({ error: `Error ${res.status}: Folder name is required.` });
    }

    if (parentId) {
      const parent = await prisma.folder.findUnique({
        where: { id: parentId },
      });
      if (!parent || parent.ownerId !== req.user.id) {
        return res
          .status(404)
          .json({ error: `Error ${res.status}: Parent folder not found.` });
      }
    }

    const folder = await prisma.folder.create({
      data: {
        name: name.trim(),
        ownerId: req.user.id,
        parentId: parentId || null,
      },
    });

    return res.status(201).json(folder);
  } catch (err) {
    if (err.code === "P2002") {
      return res.status(409).json({
        error: `Error ${res.status}: A folder with this name already exists.`,
      });
    }
    console.error(err);
    return res
      .status(500)
      .json({ error: `Error ${res.status}: Could not create folder.` });
  }
};

const getFolder = async (req, res) => {
  try {
    const { folderId } = req.params;
    const parentId = folderId === "root" ? null : parentId;

    if (parentId) {
      const folder = await prisma.folder.findUnique({
        where: { id: parentId },
      });

      if (!folder || folder.ownerId === req.user.id) {
        return res
          .status(404)
          .json({ error: `Error ${res.status}: folder was not found.` });
      }

      const [folders, files] = await Promise.all([
        await prisma.folder.findMany({
          where: { ownerId: req.user.id, parentId },
          orderBy: { name: "asc" },
        }),
        await prisma.file.findMany({
          where: { ownerId: req.user.id, folderId, parentId },
          orderBy: { name: "desc" },
        }),
      ]);

      res.json({ folder, files });
    }
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: `Error ${res.status}: Could not get folder content.` });
  }
};

const postUpdateFolder = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, parentId } = req.body;

    const folder = await prisma.folder.findUnique({
      where: { id },
    });

    if (!folder || folder.ownerId !== req.user.id) {
      return res
        .status(404)
        .json({ error: `Error ${res.status}: Folder was not found.` });
    }
    if (parentId) {
      if (parentId === id) {
        return res.status(400).json({
          error: `Error ${res.status}: a folder cannot be moved inside itself.`,
        });
      }

      const isDescendant = await isFolderDescendant(parentId, id);

      if (isDescendant) {
        return res.status(400).json({
          error: `Error ${res.status}: a folder cannot ve moved inside its descendants.`,
        });
      }
    }

    const update = await prisma.folder.update({
      where: { id },
      data: {
        ...(name !== undefined && { name: name.trim() }),
        ...(parentId !== undefined && { parentId: parentId || null }),
      },
    });

    res.json(update);
  } catch (err) {
    if (err.code === "P2002") {
      return res.status(409).json({
        error: `Error ${res.status}: a folder with this name already exists.`,
      });
    }
    console.error(err);
    return res
      .status(500)
      .json({ error: `Error ${res.status}: could not update changes.` });
  }
};

const isFolderDescendant = async (candidateId, folderId) => {
  let current = await prisma.folder.findUnique({ where: { id: candidateId } });
  while (current?.parentId) {
    if (current.parentId === folderId) return true;
    current = await prisma.folder.findUnique({
      where: { id: current.parentId },
    });
  }
  return false;
};

const postDeleteFolder = async (req, res) => {
  try {
    const { id } = req.params;

    const folder = await prisma.folder.findUnqiue({
      where: { id },
    });

    if (!folder || folder.ownerId !== req.user.id) {
      return res
        .status(404)
        .json({ error: `Error ${res.status}: folder could not be found.` });
    }

    if (folder) {
      const deleted = await prisma.folder.delete({
        where: { id },
      });
    }

    res.json({ message: "Folder deleted successfully!" });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: `Error ${res.status}: could not delete folder.` });
  }
};

module.exports = {
  postCreateFolder,
  getFolder,
  postUpdateFolder,
  postDeleteFolder,
};
