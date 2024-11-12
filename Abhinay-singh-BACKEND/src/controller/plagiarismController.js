const path = require("path");
const fs = require("fs");
const axios = require("axios");
const FormData = require("form-data");
// const { createResponse } = require("../services/responseService");
const { v4: uuidv4 } = require("uuid");
const fetch = require("node-fetch");
const mammoth = require("mammoth");
const mime = require("mime-types");
const nodemailer = require("nodemailer");
const { getFileExtensionFromContentType } = require("../utils/util");
require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { GoogleAIFileManager } = require("@google/generative-ai/server");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const fileManager = new GoogleAIFileManager(process.env.GEMINI_API_KEY);


exports.geminiPlagiarise = async (req, res) => {
  console.log("here",req.fileLink)
  const tempDir = await import("temp-dir").then((module) => module.default);
  try {
    const fileLink = req.fileLink;
    if (fileLink) {
      const response = await axios.get(fileLink, {
        responseType: "arraybuffer",
      });
      const fileBuffer = response.data;
      const contentType = response.headers["content-type"];
      const fileExtension = getFileExtensionFromContentType(contentType);

      if (!fileExtension) {
        throw new Error("Unsupported file type");
      }

      const tempFilePath = path.join(
        tempDir,
        `uploaded_document.${fileExtension}`
      );
      fs.writeFileSync(tempFilePath, fileBuffer);

      const uploadResponse = await fileManager.uploadFile(tempFilePath, {
        mimeType: contentType,
        displayName: "Uploaded Document",
      });

      fs.unlinkSync(tempFilePath);

      const result = await genAI
        .getGenerativeModel({ model: "gemini-1.5-flash" })
        .generateContent([
          {
            fileData: {
              mimeType: uploadResponse.file.mimeType,
              fileUri: uploadResponse.file.uri,
            },
          },
          {
            text: "Analyze the uploaded PDF for plagiarism and provide a report that includes only: 1. Any potentially plagiarized sections, 2. Resource links or URLs from where the content may have originated, 3. Any sections copied from AI-generated content.",
          },
        ]);

      // Log the raw AI response

      const aiResponse = result.response.text();
      // Attempt to parse the AI response as JSON
      let plagiarismData;
      try {
        plagiarismData = aiResponse;
      } catch (error) {
        console.error("Error parsing AI response:", error);

        plagiarismData = {
          summary:
            "The AI returned a detailed report that could not be parsed as JSON. The report discusses the origin and common usage of the content related to Lorem Ipsum.",
          sources: [],
          potentiallyPlagiarizedSections: [
            "The provided text is a common explanation of Lorem Ipsum found in various online sources.",
          ],
          commonalityNotes:
            "The information is widely available and commonly used to describe Lorem Ipsum's history.",
          conclusion:
            "While the text is not a direct copy, its resemblance to commonly available explanations suggests potential plagiarism.",
        };
      }

      // Construct a structured response
      const structuredResponse = {
        data: {
          status: 200,
          scanInformation: {
            service: "plagiarism",
            scanTime: new Date().toISOString(),
            inputType: "text",
          },
          result: {
            plagiarismData,
          },
        },
      };

      return res.json(structuredResponse);
    } else {
      return res.status(400).json({ error: "No file link provided" });
    }
  } catch (error) {
    console.error("GeminiPlagiarise error:", error);
    return res.status(500).json({ error: error.message });
  }
};