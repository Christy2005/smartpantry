const express = require("express");
const router = express.Router();
const pool = require("../db");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/save", authMiddleware, async (req, res) => {
  try {
    const { recipe_id, recipe_name, image_url, instructions ,ingredients} = req.body;

    await pool.query(
      `INSERT INTO saved_recipes
       (user_id, recipe_id, recipe_name, image_url, instructions,ingredients)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        req.user.id,
        recipe_id,
        recipe_name,
        image_url,
        instructions,
        ingredients
      ]
    );

    res.json({
      message: "Recipe saved successfully"
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error saving recipe"
    });
  }
});
router.get("/", authMiddleware, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM saved_recipes
       WHERE user_id = $1
       ORDER BY created_at DESC`,
      [req.user.id]
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error fetching recipes",
    });
  }
});
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await pool.query(
      `DELETE FROM saved_recipes
       WHERE id = $1 AND user_id = $2`,
      [req.params.id, req.user.id]
    );

    res.json({
      message: "Recipe deleted",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error deleting recipe",
    });
  }
});

module.exports = router;