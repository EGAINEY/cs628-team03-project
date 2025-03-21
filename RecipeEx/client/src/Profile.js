import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

// Profile function uses the state to manage users and their recipes.
function Profile() {
  const [user, setUser] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  // Fetch the user details, if they don't exist, redirect them to the login page.
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      navigate("/login");
      return;
    }

    // Set the user state.
    setUser(storedUser);
    fetchUserRecipes(storedUser._id);
  }, [navigate]);

  // Fetch all of the recipes attributed to the current user.
  const fetchUserRecipes = async (userId) => {
    try {
      const response = await fetch(`/recipes?createdBy=${userId}`);
      const data = await response.json();
      setRecipes(data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  // Handle recipe deletion.
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this recipe?")) return;

    try {
      const response = await fetch(`/recipes/${id}`, { method: "DELETE" });
      const data = await response.json();

      if (response.ok) {
        alert("Recipe deleted successfully!");
        setRecipes(recipes.filter((recipe) => recipe._id !== id));
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch {
      alert("Failed to delete recipe.");
    }
  };

  if (!user) return null;

  // Defines the Profile page.
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
        Profile
      </h1>

      <div 
        style={{
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          borderRadius: "15px",
          boxShadow: "0 4px 15px rgba(255, 152, 0, 0.3)",
          width: "80%",
          maxWidth: "500px",
          padding: "25px",
          textAlign: "left",
          animation: "fadeIn 2s ease-in-out"
        }}
      >
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>

      <h2 
      style={{ 
        marginTop: "30px", 
        fontSize: "28px", 
        fontWeight: "bold", 
        color: "#ff9800",
        animation: "fadeIn 2.5s ease-in-out" 
        }}
        >
        My Recipes
      </h2>

      <div 
        style={{
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          borderRadius: "15px",
          boxShadow: "0 4px 15px rgba(255, 152, 0, 0.3)",
          width: "80%",
          maxWidth: "700px",
          padding: "20px",
          marginTop: "20px",
          animation: "fadeIn 2.8s ease-in-out"
        }}
      >
        {recipes.length === 0 ? (
          <p style={{ color: "#ffffff", opacity: "0.8" }}>No recipes yet.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {recipes.map((recipe) => (
              <li 
                key={recipe._id} 
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.2)"
                }}
              >
                <Link 
                  to={`/recipes/${recipe._id}`} 
                  style={{ 
                    textDecoration: "none", 
                    fontSize: "18px", 
                    fontWeight: "bold",
                    color: "#ff9800",
                    transition: "color 0.3s ease"
                  }}
                  onMouseOver={(e) => e.target.style.color = "#ffcc80"}
                  onMouseOut={(e) => e.target.style.color = "#ff9800"}
                >
                  {recipe.title}
                </Link>

                <div style={{ display: "flex", gap: "10px" }}>
                  {/* Edit Button */}
                  <button 
                    onClick={() => navigate(`/recipes/${recipe._id}/edit`)}
                    style={{
                      padding: "8px 16px",
                      fontSize: "16px",
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
                    Edit
                  </button>

                  {/* Delete Button */}
                  <button 
                    onClick={() => handleDelete(recipe._id)}
                    style={{
                      padding: "8px 16px",
                      fontSize: "16px",
                      fontWeight: "bold",
                      background: "#ff4444",
                      color: "white",
                      border: "none",
                      borderRadius: "30px",
                      cursor: "pointer",
                      transition: "transform 0.3s ease, box-shadow 0.3s ease"
                    }}
                    onMouseOver={(e) => {
                      e.target.style.transform = "scale(1.05)";
                      e.target.style.boxShadow = "0px 6px 15px rgba(255, 0, 0, 0.6)";
                    }}
                    onMouseOut={(e) => {
                      e.target.style.transform = "scale(1)";
                      e.target.style.boxShadow = "0px 4px 10px rgba(255, 0, 0, 0.4)";
                    }}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
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

export default Profile;