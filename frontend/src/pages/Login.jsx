import { useState } from "react";
import API from "../api";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);

      navigate("/dashboard");
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background:
        "linear-gradient(135deg,#fff7ed,#ffedd5,#fed7aa)",
    }}
  >
    <div
      style={{
        background: "rgba(255,255,255,0.9)",
        padding: "40px",
        borderRadius: "20px",
        width: "350px",
        boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#7c2d12",
        }}
      >
        🥗 Smart Pantry
      </h1>

      <h2
        style={{
          textAlign: "center",
          color: "#9a3412",
        }}
      >
        Login
      </h2>

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "15px",
          borderRadius: "10px",
          border: "1px solid #fdba74",
        }}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "20px",
          borderRadius: "10px",
          border: "1px solid #fdba74",
        }}
      />

      <button
        onClick={handleLogin}
        style={{
          width: "100%",
          padding: "12px",
          background: "#ea580c",
          color: "white",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        Login
      </button>

      <p
        style={{
          textAlign: "center",
          marginTop: "15px",
        }}
      >
        No account?{" "}
        <Link
          to="/register"
          style={{
            color: "#ea580c",
            fontWeight: "bold",
          }}
        >
          Register
        </Link>
      </p>
    </div>
  </div>
);
}

export default Login;