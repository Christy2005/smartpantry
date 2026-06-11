import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Recipes from "./pages/Recipes.jsx";
import SavedRecipes from "./pages/SavedRecipes.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/saved-recipes" element={<SavedRecipes />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;