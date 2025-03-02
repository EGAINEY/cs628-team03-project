import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Recipes() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch("/recipes")  // Using relative path.
      .then((res) => res.json())
      .then((data) => setRecipes(data))
      .catch((err) => console.error("Error fetching recipes:", err));
  }, []);

  return (
    <div>
      <h1>All Recipes</h1>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe._id} style={{ marginBottom: "15px" }}>
            <Link to={`/recipes/${recipe._id}`}>
              <strong>{recipe.title}</strong>
            </Link>
            {recipe.image && (
              <div>
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  style={{ maxWidth: "150px", display: "block", marginTop: "5px" }}
                />
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Recipes;