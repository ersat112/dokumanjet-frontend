// src/main.jsx
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import './main.css';

// Lazy-loaded App
const App = React.lazy(() => import('./App'));

// Simple loading spinner
function Loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <svg
        className="animate-spin h-10 w-10 text-blue-600"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v8z"
        ></path>
      </svg>
    </div>
  );
}

// Error Boundary for catching render/runtime errors
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, info: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render shows fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Log to console
    console.error('ErrorBoundary caught an error:', error, info);
    // You could also log to an external reporting service here
    this.setState({ error, info });
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI
      return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md text-center">
            <h1 className="text-2xl font-bold mb-4 text-red-600">Bir hata oluştu</h1>
            <p className="text-gray-700 mb-6">
              Üzgünüz, uygulamada bir sorun çıktı. Lütfen sayfayı yenileyin veya tekrar deneyin.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="btn btn-blue"
            >
              Yeniden Yükle
            </button>
            {this.state.error && (
              <pre className="text-xs text-left mt-4 bg-gray-100 p-2 rounded overflow-x-auto">
                {this.state.error.toString()}
                {'\n'}{this.state.info?.componentStack}
              </pre>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <Router>
        <Suspense fallback={<Loading />}>
          <App />
        </Suspense>
      </Router>
    </ErrorBoundary>
  </React.StrictMode>
);
