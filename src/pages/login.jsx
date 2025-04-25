import { useState } from "react";
import axios from "../utils/api";
import { useNavigate } from "react-router-dom";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    try {
      const res = await axios.post("/auth/login", {
        email: email.trim(),
        password
      });
      const token = res.data.access_token;
      onLogin(token); // App.jsx tarafında token’ı kaydeder
      navigate("/");
    } catch (err) {
      console.error(err);
      setErrorMsg("Giriş başarısız. E-posta ya da şifre yanlış olabilir.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Giriş Yap</h2>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="email"
          placeholder="E-posta"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
        </button>
      </form>
      {errorMsg && <p className="error">{errorMsg}</p>}
    </div>
  );
}

export default Login;
