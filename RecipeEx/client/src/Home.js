import { Link } from "react-router-dom";

function Home() {
  return (
    <div 
      style={{ 
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: "linear-gradient(135deg, #1e1e2e, #3a3a5a)",
        color: "#ffffff",
        textAlign: "center",
        padding: "20px"
      }}
    >
      <h1 
        style={{ 
          fontSize: "48px", 
          fontWeight: "bold", 
          textTransform: "uppercase",
          letterSpacing: "2px",
          animation: "fadeIn 1.5s ease-in-out"
        }}
      >
        Welcome to <span style={{ color: "#ff9800" }}>RecipeEx</span>!
      </h1>

      <p 
        style={{
          fontSize: "18px", 
          marginTop: "10px",
          opacity: "0.8",
          maxWidth: "600px",
          animation: "fadeIn 2s ease-in-out"
        }}
      >
        Your futuristic place to discover and share recipes with ease.
      </p>

      <Link to="/recipes">
        <button 
          style={{
            marginTop: "20px",
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
          Browse Recipes
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

export default Home;
