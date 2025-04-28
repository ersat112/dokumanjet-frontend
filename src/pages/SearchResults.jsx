// src/pages/SearchResults.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { endpoints } from '../config';

export default function SearchResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const initialQuery = params.get('query') || '';

  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialQuery) {
      performSearch(initialQuery);
    }
  }, [initialQuery]);

  const performSearch = async (q) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${endpoints.search}?query=${encodeURIComponent(q)}`);
      if (!res.ok) throw new Error(`Sunucu hatası: ${res.status}`);
      const data = await res.json();
      setResults(data.results || []);
    } catch (err) {
      console.error('Search error:', err);
      setError('Arama sırasında bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/search?query=${encodeURIComponent(query)}`, { replace: false });
    performSearch(query);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Search Bar */}
      <form onSubmit={handleSubmit} className="max-w-md mx-auto flex mb-6">
        <input
          type="text"
          placeholder="Arama yap..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="flex-grow p-2 border rounded-l-md focus:outline-none"
        />
        <button
          type="submit"
          disabled={loading}
          className="btn btn-blue rounded-r-md ml-2 disabled:opacity-50"
        >
          {loading ? 'Aranıyor...' : 'Ara'}
        </button>
      </form>

      {/* Results or Messages */}
      <div className="max-w-4xl mx-auto space-y-4">
        {error && <p className="text-red-500 text-center">{error}</p>}
        {!error && loading && <p className="text-gray-600 text-center">Yükleniyor...</p>}
        {!error && !loading && results.length === 0 && (
          <p className="text-gray-600 text-center">Sonuç bulunamadı.</p>
        )}

        {!error && !loading && results.map((item, index) => (
          <motion.div
            key={item.id || index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="card"
          >
            <a
              href={item.url || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl font-semibold hover:underline"
            >
              {item.title}
            </a>
            <p className="mt-2 text-gray-600">{item.snippet}</p>
            {item.url && (
              <p className="mt-1 text-sm text-gray-400">{item.url}</p>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
