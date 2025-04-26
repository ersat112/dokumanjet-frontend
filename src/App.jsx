import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import Login from './pages/Login';
import Register from './pages/Register';
import Favorites from './pages/Favorites';
import Header from './components/Header';

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  // ...

  return (
    <Router>
      <Header token={token} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register onLogin={handleLogin} />} />
        <Route path="/favorites" element={<Favorites token={token} />} />
      </Routes>
    </Router>
  );
}

export default App;

