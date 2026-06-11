const express = require("express");
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const axios = require("axios");

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

router.post("/search", async (req, res) => {
  try {
    const { ingredients, mealtype,cuisine } = req.body;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
You are a recipe assistant.

Available ingredients:
${ingredients}

Meal type:
${mealtype}

cuisine:
${cuisine}

Generate exactly 5 recipes.

Return ONLY valid JSON.

Format:

[
  {
    "id": 1,
    "title": "",
    "cookTime": "",
    "ingredients": [],
    "instructions": []
  }
]

Use the available ingredients as much as possible.
Do not include explanations outside the JSON.
`;

    const result = await model.generateContent(prompt);

    let text = result.response.text();

    // remove markdown code fences if Gemini adds them
    text = text.replace(/```json/g, "");
    text = text.replace(/```/g, "");
    text = text.trim();

    const recipes = JSON.parse(text);

for (let recipe of recipes) {
  try {
    const imageResponse = await axios.get(
      "https://api.pexels.com/v1/search",
      {
        headers: {
          Authorization: process.env.PEXELS_API_KEY,
        },
        params: {
          query: recipe.title,
          per_page: 1,
        },
      }
    );

    recipe.image =
      imageResponse.data.photos.length > 0
        ? imageResponse.data.photos[0].src.medium
        : "";
  } catch {
    recipe.image = "";
  }
}

res.json(recipes);

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Error generating recipes",
    });
  }
});

module.exports = router;