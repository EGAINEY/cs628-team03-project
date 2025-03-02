import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      navigate("/login");
      return;
    }

    setUser(storedUser);
    fetchUserRecipes(storedUser._id);
  }, [navigate]);

  const fetchUserRecipes = async (userId) => {
    try {
      const response = await fetch(`/recipes?createdBy=${userId}`);
      const data = await response.json();
      setRecipes(data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  if (!user) return null;

  return (
    <div>
      <h1>Profile</h1>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <h2>My Recipes</h2>
      {recipes.length === 0 ? <p>No recipes yet.</p> : (
        <ul>
          {recipes.map((recipe) => (
            <li key={recipe._id}>
              <Link to={`/recipes/${recipe._id}`}>
                <strong>{recipe.title}</strong>
              </Link>
              <button onClick={() => navigate(`/recipes/${recipe._id}`)}>Edit</button>  {/* ✅ New Edit Button */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Profile;