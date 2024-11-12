// util.js
const path = require("path");
const fs = require("fs");
const fetch = require("node-fetch");
const multer = require("multer");
const axios = require("axios");
const FormData = require("form-data");
const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");
require("dotenv").config();


function getFileExtensionFromContentType(contentType) {
  const mimeTypes = {
    "application/pdf": ".pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      ".docx",
  };
  return mimeTypes[contentType] || "";
}

async function uploadToFileIO(file) {
  const form = new FormData();
  form.append("file", file.buffer, file.originalname);

  const response = await fetch("https://file.io", {
    method: "POST",
    body: form,
  });

  const data = await response.json();
  if (!data.success) {
    throw new Error("File upload to file.io failed");
  }
  return data.link;
}

const uploadFileIO = async (req, res, next) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const fileLink = await uploadToFileIO(file);
    req.fileLink = fileLink;
    next();
  } catch (error) {
    console.error("File upload error:", error);
    return res.status(500).json({ error: "File upload failed" });
  }
};

module.exports = {
  getFileExtensionFromContentType,
  uploadFileIO,
};
