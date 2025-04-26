export default function Favorites() {
  // …state ve useEffect

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
            <Link to="/" className="text-blue-600 underline">
              Aramaya dön
            </Link>
          </p>
        ) : (
          <ul className="space-y-4">
            {favorites.map(item => (
              <li key={item.id} className="border-b pb-2">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 font-medium hover:underline"
                >
                  {item.title}
                </a>
                <p className="text-gray-600 text-sm mt-1">
                  {item.description}
                </p>
              </li>
            ))}
          </ul>
        )}
      </motion.div>
  );   // ← burası eksikti
}

