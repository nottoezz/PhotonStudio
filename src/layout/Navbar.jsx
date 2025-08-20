import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/useAuth.js';
import CartButton from '../components/CartButton.jsx';
import { useEffect, useState } from 'react';

export default function NavBar() {
  const { isLoggedIn, name, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Close menu on route change
  useEffect(() => { setOpen(false); }, [location.pathname]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    if (open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className="navbar">
      <div className="brand">Photon Studio™</div>

      {/* Burger toggle (hidden on wide screens via CSS) */}
      <button
        className="menu-toggle"
        aria-label="Toggle menu"
        aria-controls="primary-navigation"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {/* simple SVG icon toggles */}
        {!open ? (
          <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6 6l12 12M18 6l-12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        )}
      </button>

      <nav>
        <ul
          id="primary-navigation"
          className="nav-links"
          data-open={open ? 'true' : 'false'}
        >
          <li><NavLink to="/" end className="nav-link">Home</NavLink></li>
          <li><NavLink to="/products" className="nav-link">Products</NavLink></li>
          <li><NavLink to="/about" className="nav-link">About</NavLink></li>

          {!isLoggedIn ? (
            <>
              <li><NavLink to="/login" className="nav-link">Login</NavLink></li>
              <li><NavLink to="/register" className="nav-link">Register</NavLink></li>
            </>
          ) : (
            <>
              <li className="nav-link" style={{ opacity: .9 }}>Hi, {name}</li>
              <li>
                <button
                  className="nav-link"
                  style={{ border: 0, background: 'transparent', cursor: 'pointer' }}
                  onClick={handleLogout}
                >
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
