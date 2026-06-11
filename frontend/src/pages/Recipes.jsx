import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api";

function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      const res = await API.get(`/recipe/${id}`);
      setRecipe(res.data);
    };

    fetchRecipe();
  }, [id]);

  if (!recipe) return <p>Loading...</p>;

  return (
    <div>
      <h1>{recipe.title}</h1>

      <img src={recipe.image} width="250" />

      <h2>Ingredients</h2>
      <ul>
        {recipe.extendedIngredients.map((ing) => (
          <li key={ing.id}>{ing.original}</li>
        ))}
      </ul>

      <h2>Instructions</h2>
      <div
        dangerouslySetInnerHTML={{
          __html: recipe.instructions,
        }}
      />
    </div>
  );
}

export default RecipeDetails;