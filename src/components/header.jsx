import { Link, useNavigate } from "react-router-dom";

function Header({ token, onLogout }) {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    onLogout();
    navigate("/login");
  };

  return (
    <nav className="header">
      <Link to="/" className="logo">DokumanJet</Link>
      <div className="nav-links">
        {token ? (
          <>
            <Link to="/favorites">Favoriler</Link>
            <button onClick={handleLogoutClick}>Çıkış</button>
          </>
        ) : (
          <>
            <Link to="/login">Giriş</Link>
            <Link to="/register">Kayıt</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Header;
