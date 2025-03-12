import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Recipes() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch("/recipes")
      .then((res) => res.json())
      .then((data) => setRecipes(data))
      .catch((err) => console.error("Error fetching recipes:", err));
  }, []);

  return (
    <div 
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1e1e2e, #3a3a5a)",
        color: "#ffffff",
        textAlign: "center",
        padding: "40px"
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
        All Recipes
      </h1>

      <div 
        style={{
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(8px)",
          borderRadius: "15px",
          boxShadow: "0 4px 15px rgba(255, 152, 0, 0.3)",
          overflow: "hidden",
          width: "80%",
          maxWidth: "900px",
          padding: "20px",
          animation: "fadeIn 2s ease-in-out"
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse", color: "#ffffff" }}>
          <thead>
            <tr style={{ backgroundColor: "rgba(255, 255, 255, 0.2)", fontSize: "18px" }}>
              <th style={{ padding: "15px", width: "30%" }}>Image</th>
              <th style={{ padding: "15px" }}>Recipe Name</th>
            </tr>
          </thead>
          <tbody>
            {recipes.map((recipe) => (
              <tr key={recipe._id} style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.2)" }}>
                <td style={{ padding: "15px", textAlign: "center" }}>
                  {recipe.image && (
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      style={{
                        width: "100px",
                        height: "100px",
                        borderRadius: "10px",
                        transition: "transform 0.3s ease",
                        cursor: "pointer",
                        boxShadow: "0 2px 8px rgba(255, 152, 0, 0.2)"
                      }}
                      onMouseOver={(e) => e.target.style.transform = "scale(1.1)"}
                      onMouseOut={(e) => e.target.style.transform = "scale(1)"}
                    />
                  )}
                </td>
                <td style={{ padding: "15px", textAlign: "center" }}>
                  <Link 
                    to={`/recipes/${recipe._id}`} 
                    style={{ 
                      textDecoration: "none", 
                      fontSize: "20px", 
                      fontWeight: "bold",
                      color: "#ff9800",
                      transition: "color 0.3s ease",
                      textTransform: "capitalize"
                    }}
                    onMouseOver={(e) => e.target.style.color = "#ffcc80"}
                    onMouseOut={(e) => e.target.style.color = "#ff9800"}
                  >
                    {recipe.title}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Link to="/">
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
          Back to Home
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

export default Recipes;
