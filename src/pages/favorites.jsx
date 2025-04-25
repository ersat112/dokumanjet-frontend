import React, { useEffect, useState } from "react";
import { api } from "../utils/api";

function Favorites({ token }) {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await api.get("/favorites", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFavorites(res.data);
      } catch (error) {
        console.error("Favoriler alınamadı:", error);
        setErrorMsg("Favori kayıtlar yüklenemedi.");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchFavorites();
    }
  }, [token]);

  if (!token) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>Favoriler</h2>
        <p>Favorileri görüntülemek için giriş yapmalısınız.</p>
      </div>
    );
  }

  return (
    <div style={{ background: "#f8f9fa", minHeight: "100vh", padding: "2rem" }}>
      <h2>Favori Aramalarım</h2>

      {loading && <p>Yükleniyor...</p>}

      {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}

      {favorites.length === 0 && !loading && <p>Henüz favori kaydınız yok.</p>}

      <ul style={{ listStyle: "none", padding: 0 }}>
        {favorites.map((fav) => (
          <li key={fav.id} style={listItemStyle}>
            <strong>{fav.keyword}</strong>
            <br />
            <small>{fav.user_email}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}

const listItemStyle = {
  background: "#ffffff",
  padding: "1rem",
  marginBottom: "1rem",
  border: "1px solid #ddd",
  borderRadius: "4px",
};

export default Favorites;
