import React, { useEffect, useState } from "react";
import api from "../utils/api";

function Home({ token }) {
  const [news, setNews] = useState([]);
  const [message, setMessage] = useState("");
  const [ocrResult, setOcrResult] = useState("");

  const [weather, setWeather] = useState(null);

  useEffect(() => {
  // Haberleri çek
  const fetchNews = async () => {
    try {
      const res = await api.get('/news');
      setNews(res.data);
    } catch (err) {
      console.error("Haber hatası:", err);
    }
  };

  // Hava durumunu çek
  const fetchWeather = async () => {
    try {
      const res = await api.get('/weather');
      setWeather(res.data);
    } catch (err) {
      console.error("Hava durumu hatası:", err);
    }
  };

  fetchNews();
  fetchWeather();
}, []);

  const handleOcrSubmit = async (e) => {
    e.preventDefault();
    const file = e.target.image.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setMessage("Metin çıkarılıyor...");

    try {
      const response = await api.post("/ocr", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setOcrResult(response.data.text || "Metin bulunamadı.");
      setMessage("");
    } catch (error) {
      console.error("OCR hatası:", error);
      setMessage("Hata oluştu.");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Hoş geldiniz</h2>

     

      {/* OCR kutusu */}
      {token && (
        <div style={{ background: "#f5f5f5", padding: "1rem", marginTop: "2rem" }}>
          <h3>Görselden Metin Çıkar (OCR)</h3>
          <form onSubmit={handleOcrSubmit}>
            <input type="file" name="image" accept="image/*" />
            <button type="submit" style={{ marginLeft: "1rem" }}>Gönder</button>
          </form>
          {message && <p>{message}</p>}
          {ocrResult && (
            <div style={{ marginTop: "1rem" }}>
              <strong>Çıkarılan Metin:</strong>
              <p>{ocrResult}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
