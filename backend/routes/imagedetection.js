const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

const upload = multer({
  dest: "uploads/",
});

router.post(
  "/detect",
  upload.single("image"),
  async (req, res) => {
    try {
      const imageBuffer = fs.readFileSync(
        req.file.path
      );

      const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
      });

      const result =
        await model.generateContent([
          {
            inlineData: {
              data: imageBuffer.toString("base64"),
              mimeType: req.file.mimetype,
            },
          },
          `
Analyze this fridge image.

Return ONLY a comma separated list of visible food ingredients.

Example:

egg,tomato,onion,milk

No explanations.
`,
        ]);

      fs.unlinkSync(req.file.path);

      const ingredients =
        result.response.text();

      res.json({
        ingredients,
      });
    } catch (err) {
      console.error(err);

      res.status(500).json({
        message: "Detection failed",
      });
    }
  }
);

module.exports = router;