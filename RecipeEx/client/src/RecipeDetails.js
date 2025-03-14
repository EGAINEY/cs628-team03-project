import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

// Recipe details function, uses the recipe id for params and state for recipe data.
function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  // Get the recipe by id.
  useEffect(() => {
    fetch(`/recipes/${id}`)
      .then((res) => res.json())
      .then((data) => setRecipe(data))
      .catch((err) => console.error("Error fetching recipe:", err));
  }, [id]);

  // Formats text to capitalize the first letter of each word and lowercase the rest.
  const formatText = (text) => {
    return text
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  // Displays a loading message while the recipe is loading.
  if (!recipe) return <p style={{ color: "white", textAlign: "center", fontSize: "20px" }}>Loading...</p>;

  // Defines the page for the recipe details.
  return (
    <div 
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1e1e2e, #3a3a5a)",
        color: "#ffffff",
        textAlign: "center",
        padding: "40px",
        paddingTop: "60px"
      }}
    >
      <h1 
        style={{ 
          fontSize: "42px", 
          fontWeight: "bold", 
          textTransform: "uppercase",
          letterSpacing: "2px",
          color: "#ff9800",
          marginBottom: "20px",
          animation: "fadeIn 1.5s ease-in-out"
        }}
      >
        {formatText(recipe.title)}
      </h1>

      <div 
        style={{
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          borderRadius: "15px",
          boxShadow: "0 4px 15px rgba(255, 152, 0, 0.3)",
          overflow: "hidden",
          width: "80%",
          maxWidth: "700px",
          padding: "20px",
          animation: "fadeIn 2s ease-in-out"
        }}
      >
        <img
          src={recipe.image}
          alt={recipe.title}
          style={{
            width: "100%",
            maxWidth: "400px",
            borderRadius: "12px",
            boxShadow: "0 2px 8px rgba(255, 152, 0, 0.2)",
            transition: "transform 0.3s ease",
            cursor: "pointer"
          }}
          onMouseOver={(e) => e.target.style.transform = "scale(1.05)"}
          onMouseOut={(e) => e.target.style.transform = "scale(1)"}
        />

        <table 
          style={{ 
            width: "100%", 
            borderCollapse: "collapse", 
            marginTop: "20px",
            fontSize: "18px",
            color: "#ffffff",
            textAlign: "left",
          }}
        >
          <tbody>
            <tr style={{ backgroundColor: "rgba(255, 255, 255, 0.2)", borderRadius: "10px" }}>
              <th style={{ padding: "15px", textAlign: "left", color: "#ff9800" }}>Ingredients</th>
              <td style={{ padding: "15px" }}>
                {recipe.ingredients.map((ingredient) => formatText(ingredient)).join(", ")}
              </td>
            </tr>
            <tr style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.2)" }}>
              <th style={{ padding: "15px", textAlign: "left", color: "#ff9800" }}>Instructions</th>
              <td style={{ padding: "15px" }}>{formatText(recipe.instructions)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <Link to="/recipes">
        <button 
          style={{
            marginTop: "30px",
            padding: "12px 24px",
            fontSize: "18px",
            fontWeight: "bold",
            background: "linear-gradient(90deg, #ff9800, #ff5722)",
            color: "white",
            border: "none",
            borderRadius: "30px",
            cursor: "pointer",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            boxShadow: "0px 4px 10px rgba(255, 152, 0, 0.4)"
          }}
          onMouseOver={(e) => {
            e.target.style.transform = "scale(1.05)";
            e.target.style.boxShadow = "0px 6px 15px rgba(255, 152, 0, 0.6)";
          }}
          onMouseOut={(e) => {
            e.target.style.transform = "scale(1)";
            e.target.style.boxShadow = "0px 4px 10px rgba(255, 152, 0, 0.4)";
          }}
        >
          Back to Recipes
        </button>
      </Link>

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
}

export default RecipeDetails;