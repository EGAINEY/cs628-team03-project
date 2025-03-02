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
    <div>
      <h1>Create a Recipe</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Recipe Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <textarea placeholder="Ingredients (comma-separated)" value={ingredients} onChange={(e) => setIngredients(e.target.value)} required />
        <textarea placeholder="Instructions" value={instructions} onChange={(e) => setInstructions(e.target.value)} required />
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        {image && <img src={image} alt="Recipe Preview" style={{ maxWidth: "200px", marginTop: "10px" }} />}
        <button type="submit">Create Recipe</button>
      </form>
    </div>
  );
}

export default CreateRecipe;