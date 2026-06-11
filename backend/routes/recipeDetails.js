const express = require("express");
const axios = require("axios");
require("dotenv").config();

const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const response = await axios.get(
      `https://api.spoonacular.com/recipes/${id}/information`,
      {
        params: {
          apiKey: process.env.SPOONACULAR_API_KEY,
        },
      }
    );

    res.json(response.data);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching recipe details" });
  }
});

module.exports = router;