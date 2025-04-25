import { useEffect, useState } from "react";
import axios from "../utils/api";

function Favorites({ token }) {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await axios.get("/favorites");
        setFavorites(res.data);
      } catch (err) {
        console.error(err);
        setErrorMsg("Favori verileri alınamadı. Lütfen giriş yaptığınızdan emin olun.");
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchFavorites();
  }, [token]);

  if (loading) return <p>Yükleniyor...</p>;

  return (
    <div className="container">
      <h2>Favori Aramalarım</h2>
      {errorMsg && <p className="error">{errorMsg}</p>}
      {favorites.length === 0 ? (
        <p>Henüz hiç favori kaydınız yok.</p>
      ) : (
        <ul className="result-list">
          {favorites.map((fav) => (
            <li key={fav.id}>
              <strong>{fav.keyword}</strong>
              <br />
              <small>{fav.user_email}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Favorites;
