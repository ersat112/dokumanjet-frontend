import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import Logo from '../assets/logo.png';
import { endpoints } from '../config';

export default function SearchResults() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('q') || '';

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSearchResults = async () => {
    try {
      const response = await axios.post(endpoints.search, { query });
      setResults(response.data.results || []);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query) {
      fetchSearchResults();
    }
  }, [query]);

  return (
    <div className="flex flex-col items-center p-4 bg-gray-50 min-h-screen">
      {/* Logo */}
      <motion.img
        src={Logo}
        alt="DokumanJet Logo"
        className="w-20 h-20 mb-3"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      />

      {/* DOKUMANJET Başlığı */}
      <motion.h1
        className="text-3xl font-bold text-gray-800 mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        DÖKÜMANJET
      </motion.h1>

      {/* Arama Sonuçları */}
      {loading ? (
        <p className="text-gray-600">Aranıyor...</p>
      ) : results.length > 0 ? (
        <div className="w-full max-w-4xl space-y-6">
          {results.map((item, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 text-xl font-semibold hover:underline"
              >
                {item.title}
              </a>
              <p className="text-gray-600 mt-2">{item.snippet}</p>
              <p className="text-sm text-gray-400 mt-1">{item.url}</p>
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">Sonuç bulunamadı.</p>
      )}
    </div>
  );
}
