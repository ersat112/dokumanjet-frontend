import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Logo from '../assets/logo.png';

export default function Home() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim() !== '') {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      {/* Logo */}
      <motion.img
        src={Logo}
        alt="DokumanJet Logo"
        className="w-24 h-24 mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      />

      {/* DOKUMANJET Yazısı */}
      <motion.h1
        className="text-4xl font-bold text-gray-800 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        DÖKÜMANJET
      </motion.h1>

      {/* Arama Çubuğu */}
      <motion.form
        onSubmit={handleSearch}
        className="flex w-full max-w-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Aramak istediğiniz belgeyi yazın..."
          className="flex-1 p-3 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="px-6 bg-blue-600 text-white font-semibold rounded-r-lg hover:bg-blue-700"
        >
          Ara
        </button>
      </motion.form>

      {/* Kategoriler */}
      <motion.div
        className="flex gap-6 mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        <a href="/search?q=haberler" className="text-blue-600 hover:underline">Haberler</a>
        <a href="/search?q=spor" className="text-blue-600 hover:underline">Spor</a>
        <a href="/search?q=finans" className="text-blue-600 hover:underline">Finans</a>
        <a href="/search?q=hava durumu" className="text-blue-600 hover:underline">Hava Durumu</a>
      </motion.div>
    </div>
  );
}

