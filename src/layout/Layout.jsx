import { Outlet } from 'react-router-dom';
import NavBar from './Navbar.jsx';
import Background from '../components/Background';

export default function Layout() {
  return (
    <div
      className="app"
      style={{
        position: 'relative',
        minHeight: '100vh',
        isolation: 'isolate',
        overflow: 'hidden',
      }}
    >
      {/* Persistent animated background behind everything */}
      <Background />

      {/* Navbar above the canvas */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <NavBar />
      </div>

      {/* Page content above the canvas */}
      <main
        className="page"
        style={{
          position: 'relative',
          zIndex: 1,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Outlet />
      </main>
    </div>
  );
}
