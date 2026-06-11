import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import "../pages/Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const [ingredients, setIngredients] = useState("");
  const [mealtype,setmealtype]=useState("");
  const [cuisine,setcuisine]=useState("");
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loadingRecipes, setLoadingRecipes] = useState(false);
const [loadingImage, setLoadingImage] = useState(false);
const [savingRecipe, setSavingRecipe] = useState(false);
const [voiceListening, setVoiceListening] = useState(false);
const [imagePreview, setImagePreview] = useState(null);


  // Auth Guard
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  // Fetch recipe list based on ingredients
  const searchRecipes = async () => {
    setLoadingRecipes(true);
    try {
      const res = await API.post("/gemini-recipes/search", { ingredients,mealtype,cuisine});
      setRecipes(res.data);
      setSelectedRecipe(null); // Clear active selection on a new search
    } catch (err) {
      alert("Error fetching recipes");
    }finally {
    setLoadingRecipes(false);
  }
  };

  // Fetch specific recipe details
  const detectIngredients = async () => {
  if (!selectedImage) {
    alert("Select an image first");
    return;
  }
 setLoadingImage(true);
  try {
    const formData = new FormData();

    formData.append("image", selectedImage);

    const res = await API.post(
      "/image-detection/detect",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    setIngredients(res.data.ingredients);

  } catch (err) {
    console.error(err);
    alert("Failed to detect ingredients");
  }finally {
 setLoadingImage(false);
}
};
const logout = () => {
  localStorage.removeItem("token");
  navigate("/");
};
const startVoiceInput = () => {
  const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Speech Recognition not supported");
    return;
  }

  const recognition = new SpeechRecognition();
setVoiceListening(true);
  recognition.lang = "en-US";

  recognition.onresult = (event) => {
    const transcript =
      event.results[0][0].transcript;

    setIngredients(transcript);
  };

  recognition.start();
  recognition.onend = () => {
  setVoiceListening(false);
};
};
  const saveRecipe=async()=>{
    setSavingRecipe(true);
    try{
      const token=localStorage.getItem("token");
       await API.post(
      "/saved-recipes/save",
      {
        recipe_id: selectedRecipe.id,
        recipe_name: selectedRecipe.title,
        image_url: selectedRecipe.image,
        instructions: selectedRecipe.instructions.join("\n"),
        ingredients: selectedRecipe.ingredients.join(", "),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Recipe Saved!");
    }catch (err) {
    console.error(err);
    alert("Error saving recipe");
  }finally {
 setSavingRecipe(false);
}
  };

  return (
    <div className="dashboard-container"
    >
     <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px"
  }}
>
  <div>
    <h1>🥗 Smart Pantry</h1>
    <p>
      AI Powered Recipe Discovery
    </p>
  </div>

  <div >
    <button
      onClick={() =>
        navigate("/saved-recipes")
      }
      className="primary-btn"
    >
      Saved Recipes
    </button>

    <button
      onClick={logout} 
      style={{
        marginLeft: "10px"
      }}
      className="primary-btn"
    >
      Logout
    </button>
  </div>
</div>
      <hr />

      <div  className="dashboard-card"
      >
        <h2>Find Recipes</h2>
        <input
          placeholder="Enter ingredients (egg,tomato,onion)"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          className="input-field"
          
        />
        <button
  onClick={startVoiceInput}
  disabled={voiceListening}
  className="primary-btn"
>
  {voiceListening
    ? "Listening..."
    : "🎤 Speak Ingredients"}
</button>
<br />
<p>Upload ingredients image</p>
        <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files[0];

          if (file) {
            setSelectedImage(file);
            setImagePreview(URL.createObjectURL(file));
          }
        }}
      />
      {imagePreview && (
  <div
    style={{
      marginTop: "15px",
      textAlign: "center",
    }}
  >
    <img
      src={imagePreview}
      alt="Fridge Preview"
      style={{
        width: "250px",
        maxHeight: "250px",
        objectFit: "cover",
        borderRadius: "15px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
      }}
    />

    <p
      style={{
        marginTop: "10px",
        color: "#7c2d12",
      }}
    >
      Selected Image
    </p>
  </div>
)}

<button
  onClick={detectIngredients}
  disabled={loadingImage}
  className="primary-btn"
>
  {loadingImage
    ? "Detecting..."
    : "Detect Ingredients"}
</button>
{ingredients && (
  <div
    style={{
      marginTop: "15px",
      background: "#fffaf5",
      padding: "15px",
      borderRadius: "12px",
    }}
  >
    <h4>Detected Ingredients</h4>
    <p>{ingredients}</p>
  </div>
)}
        <br />
        <select
        value={mealtype}
        onChange={(e) => setmealtype(e.target.value)}
        className="input-field"
        
      >
        <option value="" disabled>Select meal type</option>
        <option value="breakfast">Breakfast</option>
        <option value="lunch">Lunch</option>
        <option value="dinner">Dinner</option>
        <option value="snack">Snack</option>
      </select>
      <select
        value={cuisine}
        onChange={(e) => setcuisine(e.target.value)}
        className="input-field"
        
      >
        <option value="" disabled>Select meal type</option>
        <option value="South Indian">South Indian</option>
        <option value="North Indian">North Indian</option>
        <option value="Italian">Italian</option>
        <option value="French">French</option>
      </select>

        <button onClick={searchRecipes} disabled={loadingRecipes} className="primary-btn" style={{ padding: "8px 12px" }}>
          {loadingRecipes ? "Generating..." : "Search Recipes"}
        </button>
      </div>

      {/* Main Layout Grid */}
      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        
        {/* Left Column: Recipe Results List */}
        <div style={{ flex: 1 }}>
          <h3>Search Results</h3>
          {recipes.length === 0 && <p>No recipes found. Try searching above!</p>}
          
          {recipes.map((r) => (
            <div
              key={r.id}
              onClick={() => setSelectedRecipe(r)}
              className={`recipe-card ${
  selectedRecipe?.id === r.id ? "selected" : ""
}`} // Trigger the API fetch on click
              
            >
              <img className="recipe-image"
            src={r.image}
            alt={r.title}
            width="80"
            style={{
              borderRadius: "8px"
            }}
          />

          <div>
            <h4>{r.title}</h4>
            <p>⏱ {r.cookTime}</p>
          </div>
              
            </div>
          ))}
        </div>

        {/* Right Column: Selected Recipe Details View */}
        <div className="recipe-details">
          {selectedRecipe ? (
            <div>
              <h2>{selectedRecipe.title}</h2>
              <img className="recipe-image"
  src={selectedRecipe.image}
  alt={selectedRecipe.title}
  width="300"
  
/>

              <h3>Ingredients</h3>
              <ul>
                {selectedRecipe.ingredients?.map((ing,index) => (
                  <li key={index}>{ing}</li>
                ))}
              </ul>

              <h3>Instructions</h3>

              <ol>
  {selectedRecipe.instructions?.map((step, index) => (
    <li key={index} style={{
          marginBottom: "10px"
        }}>{step}</li>
  ))}
</ol>
            </div>
          ) : (
            <p style={{ color: "#666", fontStyle: "italic" }}>
              Select a recipe from the list to view its details.
            </p>
          )}
          <button
  onClick={saveRecipe}
  disabled={savingRecipe}
  className="primary-btn"
>
  {savingRecipe
    ? "Saving..."
    : "Save Recipe"}
</button>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;