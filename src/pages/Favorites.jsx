// src/pages/Favorites.jsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { endpoints, getAuthHeader } from '../config';

export default function Favorites({ token }) {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [removingId, setRemovingId] = useState(null);

  // Fetch favorites
  useEffect(() => {
    if (!token) {
      setError('Lütfen giriş yapın.');
      setLoading(false);
      return;
    }
    fetch(endpoints.favorites, {
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(token),
      },
    })
      .then(async res => {
        if (!res.ok) throw new Error(await res.text());
        return res.json();
      })
      .then(data => setFavorites(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [token]);

  // Remove favorite
  const handleRemove = (id) => {
    setRemovingId(id);
    fetch(`${endpoints.favorites}/${id}`, {
      method: 'DELETE',
      headers: getAuthHeader(token),
    })
      .then(res => {
        if (!res.ok) throw new Error('Silme hatası');
        setFavorites(favorites.filter(f => f.id !== id));
      })
      .catch(err => setError(err.message))
      .finally(() => setRemovingId(null));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-6"
      >
        <h2 className="text-2xl font-bold mb-4">Favorilerim</h2>

        {loading ? (
          <p>Yükleniyor...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : favorites.length === 0 ? (
          <p>
            Henüz favoriniz yok.{' '}
            <a href="/" className="text-blue-600 underline">
              Aramaya dön
            </a>
          </p>
        ) : (
          <ul className="space-y-4">
            {favorites.map(item => (
              <li key={item.id} className="flex justify-between items-start border-b pb-2">
                <div>
                  <a
                    href={item.url || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 font-medium hover:underline"
                  >
                    {item.keyword}
                  </a>
                  {item.snippet && <p className="text-gray-600 text-sm mt-1">{item.snippet}</p>}
                </div>
                <button
                  onClick={() => handleRemove(item.id)}
                  disabled={removingId === item.id}
                  className="text-red-500 hover:text-red-700 ml-4"
                >
                  {removingId === item.id ? 'Siliniyor...' : 'Kaldır'}
                </button>
              </li>
            ))}
          </ul>
        )}
      </motion.div>
    </div>
  );
}
