const express = require("express");
const router = express.Router();
const multer = require("multer");

const { uploadFileIO } = require("../utils/util");
const plagiarismController = require("../controller/plagiarismController");

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post(
  "/gemini-plagiarism",
  upload.single("file"),
  uploadFileIO,
  plagiarismController.geminiPlagiarise
);

module.exports = router;
