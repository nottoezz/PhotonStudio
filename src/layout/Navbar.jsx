import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth.js';
import CartButton from '../components/CartButton.jsx';

export default function NavBar() {
  const { isLoggedIn, name, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="navbar">
      <div className="brand">Photon Studio™</div>
      <nav>
        <ul className="nav-links">
          <li><NavLink to="/" end className="nav-link">Home</NavLink></li>
          <li><NavLink to="/products" className="nav-link">Products</NavLink></li>
          <li><NavLink to="/about" className="nav-link">About</NavLink></li>

          {/* Right-side auth area */}
          {!isLoggedIn ? (
            <>
              <li><NavLink to="/login" className="nav-link">Login</NavLink></li>
              <li><NavLink to="/register" className="nav-link">Register</NavLink></li>
            </>
          ) : (
            <>
              <li className="nav-link" style={{ opacity: .9 }}>Hi, {name}</li>
              <li>
                <button className="nav-link" style={{ border: 0, background: 'transparent', cursor: 'pointer' }} onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          )}
          <li><CartButton /></li>
        </ul>
      </nav>
    </header>
  );
}
