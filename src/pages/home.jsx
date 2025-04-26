// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Mic, Image as ImageIcon } from 'lucide-react';

const categories = ['Haber', 'Finans', 'Hava Durumu', 'Spor'];

export default function Home() {
  const [newsList, setNewsList] = useState([]);
  const [weather, setWeather] = useState(null);
  const [visitors, setVisitors] = useState(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    // Haberleri çek
    fetch('/api/news')
      .then((res) => res.json())
      .then((data) => setNewsList(data))
      .catch((err) => console.error('News fetch error:', err));

    // Hava durumu çek
    fetch('/api/weather')
      .then((res) => res.json())
      .then((data) => setWeather(data))
      .catch((err) => console.error('Weather fetch error:', err));

    // Ziyaretçi sayısı çek
    fetch('/api/visitors')
      .then((res) => res.json())
      .then((data) => setVisitors(data.count))
      .catch((err) => console.error('Visitors fetch error:', err));
  }, []);

  const handleSearch = () => {
    // Arama işlemi backend ile entegre edilecek
    console.log('Search query:', query);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-8">
      <motion.div
        className="text-center space-y-4"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <img src="/logo.png" alt="DokumanJet Logo" className="w-32 h-32 mx-auto" />
        <h1 className="text-5xl font-extrabold text-gray-800">
          Yapay Zeka Destekli Arama Motoru
        </h1>
        <p className="text-lg text-gray-600">
          Belgelerinize jet hızıyla ulaşın
        </p>
      </motion.div>

      <motion.div
        className="mt-8 w-full max-w-2xl flex items-center space-x-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <Search className="text-gray-500" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          placeholder="Ara..."
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700"
        >
          Ara
        </button>
        <button className="border border-gray-300 px-4 py-2 rounded-full flex items-center hover:bg-gray-100">
          <Mic className="mr-1 text-gray-600" /> Sesle Ara
        </button>
        <button className="border border-gray-300 px-4 py-2 rounded-full flex items-center hover:bg-gray-100">
          <ImageIcon className="mr-1 text-gray-600" /> Görsel Ara
        </button>
      </motion.div>

      <motion.nav
        className="mt-6 flex space-x-6"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        {categories.map((cat) => (
          <button
            key={cat}
            className="text-gray-700 font-medium hover:text-blue-600"
          >
            {cat}
          </button>
        ))}
      </motion.nav>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
        <motion.div
          className="bg-white shadow-lg rounded-2xl p-6"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
        >
          <h2 className="text-xl font-semibold mb-2">Güncel Haberler</h2>
          <ul className="space-y-1 text-gray-600">
            {newsList.length > 0 ? (
              newsList.map((item, idx) => <li key={idx}>{item.title}</li>)
            ) : (
              <li>Yükleniyor...</li>
            )}
          </ul>
        </motion.div>

        <motion.div
          className="bg-white shadow-lg rounded-2xl p-6"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.5 }}
        >
          <h2 className="text-xl font-semibold mb-2">Hava Durumu</h2>
          {weather ? (
            <div className="flex items-center space-x-3 text-gray-600">
              <img src={weather.iconUrl} alt="Weather" className="w-8 h-8" />
              <div>
                <p className="font-medium">{weather.location}</p>
                <p>{weather.temperature}&deg;C • {weather.description}</p>
              </div>
            </div>
          ) : (
            <p>Yükleniyor...</p>
          )}
        </motion.div>

        <motion.div
          className="bg-white shadow-lg rounded-2xl p-6 text-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.5 }}
        >
          <h2 className="text-xl font-semibold mb-2">Ziyaretçi Sayısı</h2>
          <p className="text-4xl font-bold text-blue-600">
            {visitors !== null ? visitors : '...'}
          </p>
        </motion.div>
      </div>

      <footer className="mt-16 text-gray-500 text-sm">
        © {new Date().getFullYear()} DokumanJet. Tüm hakları saklıdır.
      </footer>
    </div>
  );
}

