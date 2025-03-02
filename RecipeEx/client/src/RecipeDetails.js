import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetch(`/recipes/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setRecipe(data);
        setTitle(data.title);
        setIngredients(data.ingredients.join(", "));
        setInstructions(data.instructions);
        setImage(data.image || "");
      })
      .catch((err) => console.error("Error fetching recipe:", err));
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

  const handleEdit = async (e) => {
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

      if (!response.ok) {
        const data = await response.json();
        setError(data.error);
      } else {
        setRecipe({ ...recipe, ...updatedRecipe });
        setIsEditing(false);
      }
    } catch (error) {
      setError("Error updating recipe.");
    }
  };

  if (!recipe) return <h1>Loading...</h1>;

  return (
    <div>
      {isEditing ? (
        <form onSubmit={handleEdit}>
          <h1>Edit Recipe</h1>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
          <textarea value={ingredients} onChange={(e) => setIngredients(e.target.value)} required />
          <textarea value={instructions} onChange={(e) => setInstructions(e.target.value)} required />
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          {image && <img src={image} alt="Recipe Preview" style={{ maxWidth: "200px", marginTop: "10px" }} />}
          <button type="submit">Save Changes</button>
          <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
        </form>
      ) : (
        <>
          <h1>{recipe.title}</h1>
          {recipe.image && <img src={recipe.image} alt={recipe.title} style={{ maxWidth: "300px" }} />}
          <p><strong>Ingredients:</strong> {recipe.ingredients.join(", ")}</p>
          <p><strong>Instructions:</strong> {recipe.instructions}</p>
          {user && user._id === recipe.createdBy && (
            <button type="button" onClick={() => setIsEditing(true)}>Edit</button>
          )}
          <button type="button" onClick={() => navigate(-1)}>Back</button>
        </>
      )}
    </div>
  );
}

export default RecipeDetails;