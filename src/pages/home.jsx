import { useEffect, useState } from "react";
import axios from "axios";
import "./../main.css";

function Home({ token }) {
  const [news, setNews] = useState([]);
  const [weather, setWeather] = useState(null);
  const [message, setMessage] = useState("");
  const [ocrResult, setOcrResult] = useState("");

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/news`);
        setNews(response.data.articles || []);
      } catch (error) {
        console.error("Haberler yüklenemedi:", error);
      }
    };

    const fetchWeather = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/weather`);
        setWeather(response.data);
      } catch (error) {
        console.error("Hava durumu alınamadı:", error);
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
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/ocr`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });
      setOcrResult(response.data.text);
      setMessage("Metin başarıyla çıkarıldı.");
    } catch (error) {
      console.error("OCR hatası:", error);
      setMessage("Metin çıkarılamadı.");
    }
  };

  return (
    <div className="container">
      <h2>Hoş geldiniz</h2>

      {/* Hava Durumu */}
      {weather && (
        <div className="card">
          <h3>Hava Durumu</h3>
          <p>{weather.name}: {weather.main.temp}°C</p>
        </div>
      )}

      {/* Haber Kutusu */}
      {news.length > 0 && (
        <div className="card">
          <h3>Güncel Haberler</h3>
          <ul>
            {news.slice(0, 5).map((item, idx) => (
              <li key={idx}>
                <a href={item.link} target="_blank" rel="noreferrer">
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* OCR Kutusu */}
      {token && (
        <div className="card">
          <h3>Görselden Metin Çıkar (OCR)</h3>
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
