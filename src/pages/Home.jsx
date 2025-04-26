import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { endpoints } from '../config';
import axios from 'axios';

export default function Home({ token }) {
  const [news, setNews] = useState([]);
  const [weather, setWeather] = useState(null);
  const [visitorCount, setVisitorCount] = useState(0);

  // Hava durumu için şehir alma
  const fetchWeather = async (latitude, longitude) => {
    try {
      const response = await axios.get(`${endpoints.weather}?lat=${latitude}&lon=${longitude}`);
      setWeather(response.data);
    } catch (error) {
      console.error('Weather fetch error:', error);
    }
  };

  // Haberleri çek
  const fetchNews = async () => {
    try {
      const response = await axios.get(endpoints.news);
      setNews(response.data);
    } catch (error) {
      console.error('News fetch error:', error);
    }
  };

  // Ziyaretçi sayısını çek
  const fetchVisitors = async () => {
    try {
      const response = await axios.get(endpoints.visitors);
      setVisitorCount(response.data.count || 0);
    } catch (error) {
      console.error('Visitors fetch error:', error);
    }
  };

  useEffect(() => {
    // Tarayıcıdan konum bilgisi iste
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeather(latitude, longitude);
        },
        (error) => {
          console.error('Konum bilgisi alınamadı:', error);
          // Konum alınamazsa varsayılan şehir kullanabiliriz (örneğin Ankara)
          fetchWeather(39.9334, 32.8597); // Ankara koordinatları
        }
      );
    } else {
      console.error('Tarayıcı konum desteği yok.');
      // Tarayıcı desteklemiyorsa varsayılan konum
      fetchWeather(39.9334, 32.8597);
    }

    fetchNews();
    fetchVisitors();
  }, []);

  return (
    <div className="p-6">
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-4xl font-bold mb-6 text-center text-gray-800"
      >
        DokumanJet'e Hoşgeldiniz
      </motion.h1>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Hava Durumu */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Hava Durumu</h2>
          {weather ? (
            <div>
              <p><strong>Şehir:</strong> {weather.city}</p>
              <p><strong>Sıcaklık:</strong> {weather.temperature}°C</p>
              <p><strong>Durum:</strong> {weather.description}</p>
            </div>
          ) : (
            <p>Hava durumu verisi yükleniyor...</p>
          )}
        </div>

        {/* Güncel Haberler */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Güncel Haberler</h2>
          <ul className="list-disc pl-5 space-y-2">
            {news.map((item, index) => (
              <li key={index}>{item.title}</li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* Ziyaretçi Sayacı */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="mt-8 text-center text-gray-600"
      >
        <p>Şu anda {visitorCount} kullanıcı bizimle!</p>
      </motion.div>
    </div>
  );
}
