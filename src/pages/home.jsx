import { useState, useEffect } from "react";
import axios from "../utils/api";

function Home({ token }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState(null);
  const [news, setNews] = useState([]);
  const [message, setMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Arama fonksiyonu
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
        setMessage("Sonuç bulunamadı.");
      }
      setResults(response.data);
    } catch (err) {
      console.error(err);
      setErrorMsg("Arama işlemi sırasında hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  // Hava durumu ve haber çekme
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await axios.get("/weather");
        setWeather(res.data);
      } catch (err) {
        console.error("Hava durumu alınamadı", err);
      }
    };

    const fetchNews = async () => {
      try {
        const res = await axios.get("/news");
        setNews(res.data.articles || []);
      } catch (err) {
        console.error("Haber verisi alınamadı", err);
      }
    };

    fetchWeather();
    fetchNews();
  }, []);

  return (
    <div className="container">
      <h1>DokumanJet Arama</h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="Belge ya da konu ara..."
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
        {results.map((doc, idx) => (
          <li key={idx}>
            <h3>{doc.title}</h3>
            <p>{doc.content}</p>
            <small>Skor: {doc.score}</small>
          </li>
        ))}
      </ul>

      {!token && (
        <p style={{ color: "#777" }}>Favorilere erişmek için giriş yapınız.</p>
      )}

      <hr />

      {/* Hava durumu kutusu */}
      {weather && (
        <div style={{ background: "#eef", padding: "1rem", marginTop: "2rem" }}>
          <h2>Hava Durumu ({weather.city})</h2>
          <p>{weather.description} – {weather.temp}°C</p>
        </div>
      )}

      {/* Haber kutusu */}
      {news.length > 0 && (
        <div style={{ background: "#ffe", padding: "1rem", marginTop: "2rem" }}>
          <h2>Güncel Haberler</h2>
          <ul>
            {news.slice(0, 5).map((item, idx) => (
              <li key={idx}>
                <a href={item.link} target="_blank" rel="noreferrer">{item.title}</a>
              </li>
            ))}
          </ul>
        </div>
            {/* OCR kutusu */}
      {token && (
        <div style={{ background: "#f5f5f5", padding: "1rem", marginTop: "2rem" }}>
          <h2>Görselden Metin Çıkar (OCR)</h2>
          <form
            encType="multipart/from-data"
            onSubmit={async (e) => {
              e.preventDefault();
              const file = e.target.image.files[0];
              if (!file) return;

              const formData = new FormData();
              formData.append("file", file);

              try {
                setMessage("Metin çıkarılıyor...");
                const res = await axios.post("/ocr", formData, {
                  headers: {"Content-Type": "multipart/form-data"}
                });
                setMessage(`Çıkarılan metin: ${res.data.text}`);
              } catch (err) {
                console.error("OCR hatası:", err);
                setErrorMsg("Görsel işlenemedi. Lütfen geçerli bir resim yükleyin.");
              }
            }}
          >
            <input type="file" name="image" accept="image/*" />
            <button type="submit">Gönder</button>
          </form>
        </div>
      )}
      )}
    </div>
  );
}

export default Home;
