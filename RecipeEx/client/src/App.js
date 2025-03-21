import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import Recipes from "./Recipes";
import RecipeDetails from "./RecipeDetails";
import EditRecipe from "./EditRecipe";
import Profile from "./Profile";
import CreateRecipe from "./CreateRecipe";
import Navbar from "./Navbar";

// Defines the router specification.
function App() {
  return (
    <Router basename="/">
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/recipes/:id" element={<RecipeDetails />} />
          <Route path="/recipes/:id/edit" element={<EditRecipe />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-recipe" element={<CreateRecipe />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;