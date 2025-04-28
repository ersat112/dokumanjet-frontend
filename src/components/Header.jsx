// src/components/Header.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Logo from '../assets/logo.png';
import { endpoints } from '../config';

export default function Header({ token, onLogout }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleToggle = () => setMobileOpen(prev => !prev);

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={Logo} alt="DokumanJet Logo" className="h-8 w-auto" />
          <span className="ml-2 text-2xl font-bold text-gray-800">DOKUMANJET</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="text-gray-700 hover:text-blue-600">Ana Sayfa</Link>
          {token && <Link to="/favorites" className="text-gray-700 hover:text-blue-600">Favoriler</Link>}
          <Link to="/ocr/upload" className="text-gray-700 hover:text-blue-600">OCR</Link>
        </nav>

        {/* Auth & Mobile Toggle */}
        <div className="flex items-center">
          {!token ? (
            <>
              <Link to="/login" className="text-gray-700 hover:text-blue-600 mr-4">Giriş</Link>
              <Link to="/register" className="text-gray-700 hover:text-blue-600">Kayıt</Link>
            </>
          ) : (
            <button onClick={onLogout} className="text-gray-700 hover:text-red-600">Çıkış</button>
          )}
          <button
            onClick={handleToggle}
            aria-label="Mobil menüyü aç/kapa"
            className="md:hidden ml-4 focus:outline-none"
          >
            <svg className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <nav className="md:hidden bg-white shadow-inner">  
          <ul className="flex flex-col p-4 space-y-2">
            <li><Link to="/" onClick={handleToggle} className="block text-gray-700 hover:text-blue-600">Ana Sayfa</Link></li>
            {token && <li><Link to="/favorites" onClick={handleToggle} className="block text-gray-700 hover:text-blue-600">Favoriler</Link></li>}
            <li><Link to="/ocr/upload" onClick={handleToggle} className="block text-gray-700 hover:text-blue-600">OCR</Link></li>
            {!token && (
              <>
                <li><Link to="/login" onClick={handleToggle} className="block text-gray-700 hover:text-blue-600">Giriş</Link></li>
                <li><Link to="/register" onClick={handleToggle} className="block text-gray-700 hover:text-blue-600">Kayıt</Link></li>
              </>
            )}
            {token && <li><button onClick={() => { onLogout(); handleToggle(); }} className="block text-gray-700 hover:text-red-600 text-left">Çıkış</button></li>}
          </ul>
        </nav>
      )}
    </motion.header>
  );
}
