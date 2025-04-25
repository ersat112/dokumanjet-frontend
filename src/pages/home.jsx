import React, { useEffect, useState } from "react";
import axios from "axios";
import { api, VITE_API_URL } from "../utils/api";

function Home({ token }) {
  const [news, setNews] = useState([]);
  const [weather, setWeather] = useState(null);
  const [ocrResult, setOcrResult] = useState("");
  const [message, setMessage] = useState("");

  // Haber verilerini çek
  useEffect(() => {
    axios.get(`${VITE_API_URL}/news`)
      .then(res => setNews(res.data))
      .catch(() => console.error("Haberler alınamadı."));
  }, []);

  // Hava durumu verisini çek
  useEffect(() => {
    axios.get(`${VITE_API_URL}/weather`)
      .then(res => setWeather(res.data))
      .catch(() => console.error("Hava durumu alınamadı."));
  }, []);

  // OCR form gönderme işlemi
  const handleOcrSubmit = async (e) => {
    e.preventDefault();
    const file = e.target.image.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setMessage("Metin çıkarılıyor...");
      const res = await axios.post(`${VITE_API_URL}/ocr`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        },
      });
      setOcrResult(res.data.text);
      setMessage("Metin başarıyla çıkarıldı.");
    } catch {
      setMessage("OCR işlemi başarısız.");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>DokumanJet Ana Sayfa</h1>

      {/* Hava durumu kutusu */}
      {weather && (
        <div style={{ background: "#f0f0f0", padding: "1rem", marginBottom: "2rem" }}>
          <h2>Hava Durumu</h2>
          <p>{weather.city}: {weather.temperature}°C, {weather.description}</p>
        </div>
      )}

      {/* Haber kutusu */}
      {news.length > 0 && (
        <div style={{ background: "#eff", padding: "1rem", marginBottom: "2rem" }}>
          <h2>Güncel Haberler</h2>
          <ul>
            {news.slice(0, 5).map((item, idx) => (
              <li key={idx}>
                <a href={item.link} target="_blank" rel="noreferrer">{item.title}</a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* OCR kutusu */}
      {token && (
        <div style={{ background: "#f5f5f5", padding: "1rem", marginBottom: "2rem" }}>
          <h2>Görselden Metin Çıkar (OCR)</h2>
          <form onSubmit={handleOcrSubmit}>
            <input type="file" name="image" accept="image/*" required />
            <button type="submit">Yükle</button>
          </form>
          <p>{message}</p>
          {ocrResult && (
            <div>
              <h4>Çıkarılan Metin:</h4>
              <pre>{ocrResult}</pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
