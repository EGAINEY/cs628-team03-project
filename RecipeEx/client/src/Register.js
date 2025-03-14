import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  // State variables for the user input values.
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Handle the submission.
  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);

    // POST the request to the backend.
    try {
      const response = await fetch("/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      // Parse the response and return error if not OK, otherwise, navigate to the profile.
      const data = await response.json();

      if (!response.ok) {
        setError(data.error);
      } else {
        localStorage.setItem("user", JSON.stringify(data));
        navigate("/profile");
      }

    // Catch any errors.
    } catch (error) {
      setError("Something went wrong.");
    }
  };

  // Code to render the Registration Form.
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
        Create an Account
      </h1>

      <div 
        style={{
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          borderRadius: "15px",
          boxShadow: "0 4px 15px rgba(255, 152, 0, 0.3)",
          width: "80%",
          maxWidth: "400px",
          padding: "25px",
          animation: "fadeIn 2s ease-in-out"
        }}
      >
        {error && <p style={{ color: "#ff4c4c", fontSize: "16px" }}>{error}</p>}

        <form onSubmit={handleRegister} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <input 
            type="text" 
            placeholder="Username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
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

          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
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

          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
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
            Register
          </button>
        </form>
      </div>

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

export default Register;