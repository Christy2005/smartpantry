/*const express = require("express");
const router = express.Router();
const axios = require("axios");
require("dotenv").config();

router.post("/search", async (req, res) => {
  try {
    const { ingredients ,mealtype,cuisine} = req.body;

    const response = await axios.get(
      `https://api.spoonacular.com/recipes/findByIngredients`,
      {
        params: {
          ingredients: ingredients,
          number: 10,
          ranking: 2,
          ignorePantry: true,
          apiKey: process.env.SPOONACULAR_API_KEY,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching recipes" });
  }
});

module.exports = router;*/


const express = require("express");
const router = express.Router();
const axios = require("axios");
require("dotenv").config();

router.post("/search", async (req, res) => {
  try {
    const { ingredients, mealtype} = req.body;

    const response = await axios.get(
      "https://api.spoonacular.com/recipes/complexSearch",
      {
        params: {
          includeIngredients: ingredients,
          //cuisine: cuisine || undefined,
          type: mealtype || undefined,
          number: 10,
          addRecipeInformation: true,
          apiKey: process.env.SPOONACULAR_API_KEY,
        },
      }
    );

    res.json(response.data.results);

  } catch (error) {
    console.error(error.response?.data || error.message);

    res.status(500).json({
      message: "Error fetching recipes",
    });
  }
});

module.exports = router;