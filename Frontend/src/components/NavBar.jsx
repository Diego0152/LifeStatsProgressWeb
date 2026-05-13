import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom'; // Importamos Link
import '../styles/components/NavBar.css';
import UserPanel from './UserPanel'; // Importamos tu nuevo componente

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation(); // Para saber en qué página estamos

  return (
    <nav className="navbar">
      <div className="nav-logo">
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <span className="logo-icon">▲</span>
          <span className="logo-text">OBJECTIVE_OS</span>
        </Link>
      </div>
      
      <div className="nav-links">
        <Link to="/" className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>
          DASHBOARD
        </Link>
        <Link to="/misiones" className={`nav-item ${location.pathname === '/misiones' ? 'active' : ''}`}>
          MISSIONS
        </Link>
      </div>

      <div className="nav-user-panel">
        {isLoggedIn ? (
          <div className="logged-in-zone">
            <div className="user-info">
              <span className="user-rank">RANK: ELITE</span>
              {/* Enlace al perfil */}
              <Link to="/profile" className="user-name">ADMIN USER</Link>
            </div>
            <div className="user-avatar" onClick={() => setIsLoggedIn(false)}></div>
          </div>
        ) : (
          <div className="auth-zone">
            {/* Ahora estos botones son Links a tus nuevos componentes */}
            <Link to="/login" className="btn-auth login">
              INICIAR SESIÓN
            </Link>
            <Link to="/register" className="btn-auth register">
              CREAR CUENTA
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;