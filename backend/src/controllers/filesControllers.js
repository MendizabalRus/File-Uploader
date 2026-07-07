// packages
const path = require("node:path");

const postFile = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file upload" });
  }

  res.status(201).json({
    message: "File uploaded successfully",
    file: {
      originalName: req.file.originalname,
      filename: req.filename,
      size: req.file.size,
      mimeType: req.file.mimetype,
    },
  });
};

module.exports = {
  postFile,
};
