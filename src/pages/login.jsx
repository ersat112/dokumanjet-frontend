import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../utils/api";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await api.post("/auth/login", { email, password });
      const token = res.data.access_token;
      onLogin(token);
      navigate("/");
    } catch (error) {
      console.error("Giriş hatası:", error);
      setErrorMsg("Giriş başarısız. Bilgilerinizi kontrol edin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: "#f8f9fa", minHeight: "100vh", padding: "2rem" }}>
      <h2>Giriş Yap</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "2rem auto" }}>
        <input
          type="email"
          placeholder="E-posta"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={inputStyle}
        />
        <input
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle} disabled={loading}>
          {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
        </button>
      </form>
      {errorMsg && <p style={{ color: "red", textAlign: "center" }}>{errorMsg}</p>}
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "0.8rem",
  marginBottom: "1rem",
  border: "1px solid #ccc",
  borderRadius: "4px",
};

const buttonStyle = {
  width: "100%",
  padding: "0.8rem",
  backgroundColor: "#007bff",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

export default Login;
