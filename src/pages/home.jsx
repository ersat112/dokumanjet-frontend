// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { VITE_API_URL } from "../utils/api";

function Home({ token }) {
  const [news, setNews] = useState([]);
  const [message, setMessage] = useState("");
  const [ocrResult, setOcrResult] = useState("");

  useEffect(() => {
    if (token) {
      const fetchNews = async () => {
        try {
          const response = await axios.get(`${VITE_API_URL}/news`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setNews(response.data);
        } catch (error) {
          console.error("Haberler alınamadı:", error);
        }
      };
      fetchNews();
    }
  }, [token]);

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
          "Content-Type": "multipart/form-data",
        },
      });
      setOcrResult(res.data.text);
      setMessage("");
    } catch (error) {
      setMessage("Bir hata oluştu.");
    }
  };

  return (
    <div style={{ background: "#f8f9fa", minHeight: "100vh", padding: "2rem" }}>
      <h2>Hoş geldiniz</h2>

      {token && news.length > 0 && (
        <section style={{ marginTop: "2rem" }}>
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
        </section>
      )}

      {token && (
        <section style={{ marginTop: "3rem" }}>
          <h3>Görselden Metin Çıkar (OCR)</h3>
          <form onSubmit={handleOcrSubmit}>
            <input type="file" name="image" accept="image/*" />
            <button type="submit" style={{ marginLeft: "1rem" }}>Gönder</button>
          </form>
          {message && <p>{message}</p>}
          {ocrResult && (
            <div style={{ marginTop: "1rem", background: "#fff", padding: "1rem", border: "1px solid #ccc" }}>
              <strong>Çıkarılan Metin:</strong>
              <p>{ocrResult}</p>
            </div>
          )}
        </section>
      )}
    </div>
  );
}

export default Home;
