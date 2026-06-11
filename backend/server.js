const express = require("express");
const cors = require("cors");
require("dotenv").config();
const authMiddleware = require("./middleware/authMiddleware");
const recipeRoutes = require("./routes/recipeRoutes");
const recipeDetailsRoutes = require("./routes/recipeDetails");
const savedRecipeRoutes = require("./routes/savedrecipe");
const geminiRecipeRoutes =
require("./routes/geminisearch.js");
const imageRoutes = require("./routes/imageRoutes");
const imageDetectionRoutes =
require("./routes/imagedetection.js");



const authRoutes = require("./routes/authRoutes");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/recipes", recipeRoutes);
app.use("/recipe", recipeDetailsRoutes);
app.use("/saved-recipes", savedRecipeRoutes);
app.use("/gemini-recipes", geminiRecipeRoutes);
app.use("/images", imageRoutes);
app.use(
  "/image-detection",
  imageDetectionRoutes
);

app.get("/", (req, res) => {
  res.send("Smart Pantry API Running");
});
app.get("/profile", authMiddleware, (req, res) => {
  res.json({
    message: "Protected Route",
    user: req.user,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});