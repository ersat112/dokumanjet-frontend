import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Header({ token, onLogout }) {
  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white shadow-md py-4 px-6 flex justify-between items-center"
    >
      <Link to="/" className="text-2xl font-bold text-gray-800 hover:text-blue-600">
        DokumanJet
      </Link>
      <nav className="space-x-4">
        <Link to="/" className="text-gray-700 hover:text-blue-600">
          Ana Sayfa
        </Link>
        {token && (
          <Link to="/favorites" className="text-gray-700 hover:text-blue-600">
            Favoriler
          </Link>
        )}
        {token ? (
          <button
            onClick={onLogout}
            className="text-gray-700 hover:text-red-600 focus:outline-none"
          >
            Çıkış Yap
          </button>
        ) : (
          <>
            <Link to="/login" className="text-gray-700 hover:text-blue-600">
              Giriş
            </Link>
            <Link to="/register" className="text-gray-700 hover:text-blue-600">
              Kayıt
            </Link>
          </>
        )}
      </nav>
    </motion.header>
}
