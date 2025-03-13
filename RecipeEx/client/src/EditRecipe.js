import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditRecipe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/recipes/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          setTitle(data.title);
          setIngredients(data.ingredients.join(", "));
          setInstructions(data.instructions);
          setImage(data.image || "");
          setLoading(false);
        } else {
          setError(data.error);
        }
      })
      .catch(() => setError("Failed to fetch recipe."));
  }, [id]);

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

    const updatedRecipe = {
      title,
      ingredients: ingredients.split(",").map((item) => item.trim()),
      instructions,
      image,
    };

    try {
      const response = await fetch(`/recipes/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedRecipe),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.error);
      } else {
        alert("Recipe updated successfully!");
        navigate(`/recipes/${id}`);
      }
    } catch {
      setError("Error updating recipe.");
    }
  };

  if (loading) return <h1>Loading...</h1>;

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
      <h1 style={{ fontSize: "42px", fontWeight: "bold", color: "#ff9800" }}>
        Edit Recipe
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
          textAlign: "left"
        }}
      >
        {error && <p style={{ color: "#ff4c4c", textAlign: "center" }}>{error}</p>}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
            style={{ padding: "12px", borderRadius: "8px", background: "rgba(255, 255, 255, 0.2)", color: "white", textAlign: "center" }}
          />

          <textarea 
            value={ingredients} 
            onChange={(e) => setIngredients(e.target.value)} 
            required 
            style={{ padding: "12px", borderRadius: "8px", background: "rgba(255, 255, 255, 0.2)", color: "white", resize: "none", height: "80px" }}
          />

          <textarea 
            value={instructions} 
            onChange={(e) => setInstructions(e.target.value)} 
            required 
            style={{ padding: "12px", borderRadius: "8px", background: "rgba(255, 255, 255, 0.2)", color: "white", resize: "none", height: "120px" }}
          />

          <input 
            type="file" 
            accept="image/*" 
            onChange={handleImageUpload} 
            style={{ padding: "12px", borderRadius: "8px", background: "rgba(255, 255, 255, 0.2)", color: "white" }}
          />

          {image && <img src={image} alt="Recipe Preview" style={{ maxWidth: "200px", borderRadius: "8px" }} />}

          <button 
            type="submit"
            style={{ padding: "12px", fontSize: "18px", fontWeight: "bold", background: "#ff9800", color: "white", borderRadius: "30px", cursor: "pointer" }}
          >
            Save Changes
          </button>

          <button 
            type="button" 
            onClick={() => navigate(`/recipes/${id}`)}
            style={{ padding: "12px", fontSize: "18px", fontWeight: "bold", background: "#ff4c4c", color: "white", borderRadius: "30px", cursor: "pointer" }}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditRecipe;