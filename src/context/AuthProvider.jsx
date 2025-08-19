import { useEffect, useMemo, useState } from 'react';
import { AuthContext } from './auth-context.js';

const STORAGE_KEY = 'store_auth_v1';

export function AuthProvider({ children }) {
  // hydrate from localStorage so login survives refresh
  const [state, setState] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      return saved && typeof saved === 'object'
        ? { isLoggedIn: !!saved.isLoggedIn, name: saved.name || '' }
        : { isLoggedIn: false, name: '' };
    } catch {
      return { isLoggedIn: false, name: '' };
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const login = (name) => setState({ isLoggedIn: true, name });
  const logout = () => setState({ isLoggedIn: false, name: '' });

  const value = useMemo(() => ({
    isLoggedIn: state.isLoggedIn,
    name: state.name,
    login, logout,
  }), [state]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
