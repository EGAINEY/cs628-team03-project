import { Link } from "react-router-dom";

function Home() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      <h1>Welcome to RecipeEx!</h1>
      <p>Your place to discover and share recipes.</p>

      <Link to="/recipes">
        <button>Browse Recipes</button>
      </Link>

      {user && (
        <Link to="/create-recipe" style={{ marginLeft: "10px" }}>
          <button>Create Recipe</button>
        </Link>
      )}
    </div>
  );
}

export default Home;