// src/components/Header.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Header({ token, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  return (
    <header
      style={{
        background: "#ffffff",
        borderBottom: "1px solid #e0e0e0",
        padding: "1rem 2rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <Link to="/" style={{ textDecoration: "none", color: "#2c3e50", fontWeight: "bold", fontSize: "20px" }}>
        DokumanJet
      </Link>

      <nav>
        {token ? (
          <>
            <Link to="/favorites" style={linkStyle}>Favoriler</Link>
            <button onClick={handleLogout} style={buttonStyle}>Çıkış</button>
          </>
        ) : (
          <>
            <Link to="/login" style={linkStyle}>Giriş</Link>
            <Link to="/register" style={{ ...linkStyle, marginLeft: "1rem" }}>Kayıt</Link>
          </>
        )}
      </nav>
    </header>
  );
}

const linkStyle = {
  marginRight: "1rem",
  textDecoration: "none",
  color: "#007bff",
  fontWeight: "500"
};

const buttonStyle = {
  padding: "0.4rem 0.8rem",
  backgroundColor: "#dc3545",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

export default Header;
