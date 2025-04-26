// src/utils/api.js
import { endpoints } from '../config';

/**
 * Generic GET request
 * @param {string} url - The endpoint URL
 * @returns {Promise<any>} - Parsed JSON response
 */
export async function getRequest(url) {
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'API GET request failed');
  }
  return res.json();
}

/**
 * Generic POST request
 * @param {string} url - The endpoint URL
 * @param {object} body - Payload to send
 * @param {boolean} auth - Include Authorization header
 * @returns {Promise<any>} - Parsed JSON response
 */
export async function postRequest(url, body, auth = false) {
  const headers = { 'Content-Type': 'application/json' };
  if (auth) {
    const token = localStorage.getItem('token');
    if (token) headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'API POST request failed');
  }

  return data;
}

/**
 * Exported shortcuts for each endpoint
 */
export const api = {
  fetchNews: () => getRequest(endpoints.news),
  fetchWeather: () => getRequest(endpoints.weather),
  fetchVisitors: () => getRequest(endpoints.visitors),
  login: (credentials) => postRequest(endpoints.auth.login, credentials),
  register: (info) => postRequest(endpoints.auth.register, info),
  fetchFavorites: () => getRequest(endpoints.favorites),
};
