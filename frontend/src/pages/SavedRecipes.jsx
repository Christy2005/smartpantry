import { useEffect, useState } from "react";
import API from "../api";

function SavedRecipes() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetchSavedRecipes();
  }, []);

  const fetchSavedRecipes = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/saved-recipes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setRecipes(res.data);
    } catch (err) {
      console.error(err);
      alert("Error loading saved recipes");
    }
  };

  const deleteRecipe = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await API.delete(`/saved-recipes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchSavedRecipes();
    } catch (err) {
      console.error(err);
      alert("Error deleting recipe");
    }
  };

  return (
    <div style={{
    minHeight: "100vh",
    background:
      "linear-gradient(135deg,#fff7ed,#ffedd5,#fed7aa)",
    padding: "30px",
  }}>
      <h1>Saved Recipes</h1>

      {recipes.length === 0 ? (
        <p>No saved recipes yet.</p>
      ) : (
        recipes.map((recipe) => (
          <div
            key={recipe.id}
            style={{
  background: "rgba(255,255,255,0.9)",
  borderRadius: "20px",
  padding: "20px",
  marginBottom: "20px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
}}
          >
            <h2>{recipe.recipe_name}</h2>

            <img
              src={recipe.image_url}
              alt={recipe.recipe_name}
              width="200"
            />
            <div
              dangerouslySetInnerHTML={{
                __html: recipe.ingredients,
              }}
            />

            <div
              dangerouslySetInnerHTML={{
                __html: recipe.instructions,
              }}
            />

            <button
              onClick={() => deleteRecipe(recipe.id)}
              style={{
    padding: "10px 20px",
    background: "#dc2626",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
  }}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default SavedRecipes;