import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { endpoints } from '../config';
import axios from 'axios';

export default function Home({ token }) {
  const [news, setNews] = useState([]);
  const [weather, setWeather] = useState(null);
  const [visitorCount, setVisitorCount] = useState(0);

  // Hava durumu verisi çekme
  const fetchWeather = async (lat, lon) => {
    try {
      const response = await axios.get(`${endpoints.weather}?lat=${lat}&lon=${lon}`);
      setWeather(response.data);
    } catch (error) {
      console.error('Weather fetch error:', error);
    }
  };

  // Haber verilerini çekme
  const fetchNews = async () => {
    try {
      const response = await axios.get(endpoints.news);
      setNews(response.data);
    } catch (error) {
      console.error('News fetch error:', error);
    }
  };

  // Ziyaretçi verisi çekme
  const fetchVisitors = async () => {
    try {
      const response = await axios.get(endpoints.visitors);
      setVisitorCount(response.data.count || 0);
    } catch (error) {
      console.error('Visitors fetch error:', error);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeather(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.error('Konum alınamadı:', error);
          // Eğer konum alınamazsa Ankara'nın koordinatları
          fetchWeather(39.9334, 32.8597);
        }
      );
    } else {
      console.error('Tarayıcı konum desteği yok.');
      fetchWeather(39.9334, 32.8597);
    }

    fetchNews();
    fetchVisitors();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-4xl font-bold mb-8 text-center text-gray-800"
      >
        DokumanJet'e Hoşgeldiniz
      </motion.h1>

      {/* Hava Durumu */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="bg-blue-100 p-6 rounded-lg shadow-md mb-8"
      >
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Anlık Hava Durumu</h2>
        {weather ? (
          <div className="text-gray-800">
            <p><strong>Şehir:</strong> {weather.city}</p>
            <p><strong>Sıcaklık:</strong> {weather.temperature}°C</p>
            <p><strong>Durum:</strong> {weather.description}</p>
          </div>
        ) : (
          <p>Hava durumu yükleniyor...</p>
        )}
      </motion.div>

      {/* Haberler */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {news.map((item, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
            {item.image && (
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{item.title}</h3>
              {item.description && <p className="text-gray-600 mb-4">{item.description}</p>}
              {item.link && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Haberi Oku →
                </a>
              )}
            </div>
          </div>
        ))}
      </motion.div>

      {/* Ziyaretçi Sayacı */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="mt-10 text-center text-gray-600"
      >
        <p>Şu anda <strong>{visitorCount}</strong> kullanıcı bizimle!</p>
      </motion.div>
    </div>
  );
}

