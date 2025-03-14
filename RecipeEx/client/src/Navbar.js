import { Link, useNavigate, useLocation } from "react-router-dom";
import "./index.css"; 

// Navbar function gets the logged in user and hooks for navigation and current route.
function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const location = useLocation(); 

  // Handle user logout.
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      {/* Left-aligned RecipeEx brand */}
      <div className="nav-logo">
        <Link to="/" className="logo">RecipeEx</Link>
      </div>

      {/* Centered navigation links */}
      <div className="nav-center">
        <Link to="/" className={getLinkClass(location.pathname, "/")}>Home</Link>
        <Link to="/recipes" className={getLinkClass(location.pathname, "/recipes")}>Browse Recipes</Link>
        {user && <Link to="/create-recipe" className={getLinkClass(location.pathname, "/create-recipe")}>Create Recipe</Link>}
      </div>

      {/* Right-aligned profile and login/logout links */}
      <div className="nav-right">
        {user ? (
          <>
            <Link to="/profile" className={getLinkClass(location.pathname, "/profile")}>Profile</Link>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className={getLinkClass(location.pathname, "/login")}>Login</Link>
            <Link to="/register" className={getLinkClass(location.pathname, "/register")}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

// Function to apply active class.
const getLinkClass = (currentPath, linkPath) =>
  `nav-link ${currentPath === linkPath ? "active" : ""}`;

export default Navbar;