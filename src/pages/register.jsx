import { useState } from "react";
import axios from "../utils/api";
import { useNavigate } from "react-router-dom";

function Register({ onLogin }) {
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
      const res = await axios.post("/auth/register", {
        email: email.trim(),
        password
      });
      const token = res.data.access_token;
      onLogin(token);
      navigate("/");
    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 409) {
        setErrorMsg("Bu e-posta zaten kayıtlı.");
      } else {
        setErrorMsg("Kayıt başarısız. Lütfen bilgileri kontrol edin.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Kayıt Ol</h2>
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
          placeholder="Şifre (en az 6 karakter)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Kayıt yapılıyor..." : "Kayıt Ol"}
        </button>
      </form>
      {errorMsg && <p className="error">{errorMsg}</p>}
    </div>
  );
}

export default Register;
