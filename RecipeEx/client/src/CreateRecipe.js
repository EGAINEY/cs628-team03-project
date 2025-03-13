import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateRecipe() {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImage(reader.result);
      };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      setError("You must be logged in to create a recipe.");
      return;
    }

    const newRecipe = {
      title,
      ingredients: ingredients.split(",").map((item) => item.trim()),
      instructions,
      image,
      createdBy: user._id,
    };

    try {
      const response = await fetch("/recipes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRecipe),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.error);
      } else {
        alert("Recipe created successfully!");
        navigate("/recipes");
      }
    } catch (error) {
      setError("Error creating recipe.");
    }
  };

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
        Create a Recipe
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
        {error && <p style={{ color: "#ff4c4c", fontSize: "16px", textAlign: "center" }}>{error}</p>}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <input 
            type="text" 
            placeholder="Recipe Title" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
            style={{
              padding: "12px",
              fontSize: "16px",
              border: "none",
              borderRadius: "8px",
              background: "rgba(255, 255, 255, 0.2)",
              color: "white",
              outline: "none",
              transition: "0.3s",
              textAlign: "center"
            }}
            onFocus={(e) => e.target.style.background = "rgba(255, 255, 255, 0.4)"}
            onBlur={(e) => e.target.style.background = "rgba(255, 255, 255, 0.2)"}
          />

          <textarea 
            placeholder="Ingredients (comma-separated)" 
            value={ingredients} 
            onChange={(e) => setIngredients(e.target.value)} 
            required 
            style={{
              padding: "12px",
              fontSize: "16px",
              border: "none",
              borderRadius: "8px",
              background: "rgba(255, 255, 255, 0.2)",
              color: "white",
              outline: "none",
              transition: "0.3s",
              textAlign: "center",
              resize: "none",
              height: "80px"
            }}
            onFocus={(e) => e.target.style.background = "rgba(255, 255, 255, 0.4)"}
            onBlur={(e) => e.target.style.background = "rgba(255, 255, 255, 0.2)"}
          />

          <textarea 
            placeholder="Instructions" 
            value={instructions} 
            onChange={(e) => setInstructions(e.target.value)} 
            required 
            style={{
              padding: "12px",
              fontSize: "16px",
              border: "none",
              borderRadius: "8px",
              background: "rgba(255, 255, 255, 0.2)",
              color: "white",
              outline: "none",
              transition: "0.3s",
              textAlign: "center",
              resize: "none",
              height: "120px"
            }}
            onFocus={(e) => e.target.style.background = "rgba(255, 255, 255, 0.4)"}
            onBlur={(e) => e.target.style.background = "rgba(255, 255, 255, 0.2)"}
          />

          <input 
            type="file" 
            accept="image/*" 
            onChange={handleImageUpload} 
            style={{
              padding: "12px",
              fontSize: "16px",
              border: "none",
              borderRadius: "8px",
              background: "rgba(255, 255, 255, 0.2)",
              color: "white",
              outline: "none",
              transition: "0.3s",
              textAlign: "center"
            }}
          />

          {image && <img src={image} alt="Recipe Preview" style={{ maxWidth: "200px", marginTop: "10px", borderRadius: "8px" }} />}

          <button 
            type="submit"
            style={{
              padding: "12px",
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
            Create Recipe
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateRecipe;