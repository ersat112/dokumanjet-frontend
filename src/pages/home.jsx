import { useState } from "react";
import axios from "../utils/api";

function Home({ token }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [message, setMessage] = useState("");

  const handleSearch = async () => {
    if (!query.trim()) {
      setMessage("Lütfen bir arama terimi girin.");
      return;
    }

    setLoading(true);
    setMessage("");
    setErrorMsg("");
    try {
      const response = await axios.get(`/search?q=${encodeURIComponent(query)}`);
      if (response.data.length === 0) {
        setMessage("Aramanızla eşleşen sonuç bulunamadı.");
      }
      setResults(response.data);
    } catch (err) {
      console.error(err);
      setErrorMsg("Arama işlemi sırasında bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="container">
      <h1>DokumanJet Arama</h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="Belge, anahtar kelime ya da başlık girin..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={handleSearch}>Ara</button>
      </div>

      {loading && <p>Yükleniyor...</p>}
      {errorMsg && <p className="error">{errorMsg}</p>}
      {message && <p>{message}</p>}

      <ul className="result-list">
        {results.map((item, index) => (
          <li key={index}>
            <h3>{item.title}</h3>
            <p>{item.content}</p>
            <small>Skor: {item.score}</small>
          </li>
        ))}
      </ul>

      {!token && (
        <p style={{ color: "#888" }}>
          Favori kayıt yapmak için lütfen giriş yapınız.
        </p>
      )}
    </div>
  );
}

export default Home;
