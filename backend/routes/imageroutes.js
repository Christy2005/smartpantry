const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/:recipeName", async (req, res) => {
  try {
    const recipeName = req.params.recipeName;

    const response = await axios.get(
      "https://api.pexels.com/v1/search",
      {
        headers: {
          Authorization: process.env.PEXELS_API_KEY,
        },
        params: {
          query: recipeName,
          per_page: 1,
        },
      }
    );

    if (response.data.photos.length > 0) {
      res.json({
        image: response.data.photos[0].src.medium,
      });
    } else {
      res.json({
        image: "",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error fetching image",
    });
  }
});

module.exports = router;