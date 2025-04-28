import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [news, setNews] = useState([]);
  const [weather, setWeather] = useState(null);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [city, setCity] = useState('');

  // Haber akışı
  useEffect(() => {
    fetch('/api/v1/news?limit=6')
      .then(res => res.json())
      .then(data => setNews(data.articles))
      .catch(err => console.error('News fetch error:', err));
  }, []);

  // Hava durumu
  useEffect(() => {
    if (!city) return;
    fetch(`/api/v1/weather?city=${encodeURIComponent(city)}`)
      .then(res => res.json())
      .then(data => setWeather(data))
      .catch(err => console.error('Weather fetch error:', err));
  }, [city]);

  // Arama
  const handleSearch = async e => {
    e.preventDefault();
    if (!query.trim()) return;
    try {
      const res = await fetch(`/api/v1/search?query=${encodeURIComponent(query)}`);
      const data = await res.json();
      setResults(data.results);
    } catch (err) {
      console.error('Search error:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with ads, logo, auth links */}
      <div className="max-w-6xl mx-auto flex items-center justify-between py-4">
        <div className="w-1/6">
          <div className="bg-gray-200 h-24">Google Reklamı</div>
        </div>
        <div className="flex-1 text-center">
          <img src="/logo.png" alt="DokumanJet" className="w-32 mx-auto mb-2" />
          <h1 className="text-3xl font-bold">DOKUMANJET</h1>
        </div>
        <div className="w-1/6 flex justify-end space-x-4">
          <Link to="/login" className="text-blue-600 hover:underline">Giriş Yap</Link>
          <Link to="/register" className="text-blue-600 hover:underline">Kayıt Ol</Link>
        </div>
      </div>

      {/* Search section */}
      <div className="bg-white p-6 rounded shadow max-w-2xl mx-auto mt-6">
        <form onSubmit={handleSearch} className="flex">
          <input
            type="text"
            placeholder="Arama yap..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="flex-grow p-2 border rounded-l-md focus:outline-none"
          />
          <button type="submit" className="bg-blue-600 text-white px-4 rounded-r-md">
            Ara
          </button>
        </form>
        <div className="mt-4 flex space-x-4 justify-center">
          <Link to="/favorites" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
            Favorilerim
          </Link>
          <Link to="/ocr/upload" className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600">
            OCR Yükle
          </Link>
        </div>
      </div>

      {/* Main content with ads, news & weather */}
      <div className="max-w-6xl mx-auto grid grid-cols-6 gap-4 mt-8 px-4">
        <div className="col-span-1">
          <div className="bg-gray-200 h-full">Google Reklamı</div>
        </div>
        <div className="col-span-4 space-y-8">
          {/* Search Results */}
          {results.length > 0 && (
            <section>
              <h2 className="text-2xl font-semibold mb-4">Arama Sonuçları</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {results.map(item => (
                  <div key={item.id} className="p-4 bg-white rounded shadow">
                    <h3 className="font-bold mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{item.snippet}</p>
                    <a href={item.url || '#'} className="text-blue-600 hover:underline">
                      Detaya Git
                    </a>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Haberler */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Haberler</h2>
            <div className="space-y-4">
              {news.map((article, idx) => (
                <a
                  key={idx}
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 bg-white rounded shadow hover:bg-gray-100 transition"
                >
                  <h3 className="font-bold mb-1">{article.title}</h3>
                  <p className="text-sm text-gray-600">{article.description}</p>
                </a>
              ))}
            </div>
          </section>

          {/* Hava Durumu */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Hava Durumu</h2>
            <div className="flex mb-4">
              <input
                type="text"
                placeholder="Şehir girin..."
                value={city}
                onChange={e => setCity(e.target.value)}
                className="flex-grow p-2 border rounded-l-md focus:outline-none"
              />
              <button
                onClick={() => city && setCity(city)}
                className="bg-blue-600 text-white px-4 rounded-r-md"
              >
                Getir
              </button>
            </div>
            {weather && (
              <div className="p-4 bg-white rounded shadow">
                <h3 className="font-bold text-xl mb-2">{weather.city}</h3>
                <p className="text-lg">
                  {weather.temperature}°C - {weather.description}
                </p>
                <p className="text-sm text-gray-600">
                  Nem: {weather.humidity}% | Rüzgar: {weather.wind_speed} m/s
                </p>
              </div>
            )}
          </section>
        </div>
        <div className="col-span-1">
          <div className="bg-gray-200 h-full">Google Reklamı</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
