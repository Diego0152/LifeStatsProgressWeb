import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom'; // Importamos Link
import '../styles/components/NavBar.css';
import UserPanel from './UserPanel'; // Importamos tu nuevo componente
import { useAuth } from '../data/AuthContext'; // Importamos el contexto de autenticación

const NavBar = () => {
  const {user, logout} = useAuth(); // Usamos el contexto global para saber si hay un usuario logueado
  const location = useLocation(); // Para saber en qué página estamos
  const [showDropdown, setShowDropdown] = useState(false); // Estado para mostrar/ocultar el dropdown

  return (
    <nav className="navbar">
      <div className="logo-container">
        <div className="logo-icon-wrapper">
          <div className="logo-ring"></div>
          <div className="logo-triangle"></div>
          <div className="logo-scanner"></div>
        </div>
        <div className="logo-text-group">
          <span className="logo-main-text">
            ASC<span className="text-accent-y">Y</span>DLE
          </span>
          <span className="logo-sub-text">
            ASCENSION_MIND_CORE
          </span>
        </div>
      </div>
      
      <div className="nav-links">
        <Link to="/" className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>
          INICIO
        </Link>
        {/* Solo mostramos "MIS METAS" si el usuario está logueado */} 
        <Link to="/metas" className={`nav-item ${location.pathname === '/metas' ? 'active' : ''}`}>
          MIS METAS
        </Link>
      </div>

      <div className="nav-user-panel">
        <div 
          className={`logged-in-container ${user ? 'online' : 'offline'} ${showDropdown ? 'active' : ''}`}
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <div className="logged-in-zone">
            <div className="user-info">
              <span className="user-rank">
                {user ? 'ESTADO: OPERATIVO' : 'SISTEMA: OFFLINE'}
              </span>
              <span className="user-name">
                {user ? user.nombre.toUpperCase() : 'NO IDENTIFICADO'}
              </span>
            </div>
            {user ? (
            <div className="user-avatar">
              <div className="avatar-status"></div>
            </div>
            ) : (
            <div className="user-avatar offline">
              <div className="avatar-status"></div>
            </div>
            )}
            
          </div>

          {/* El Dropdown se mantiene igual, pero ahora se verá afectado por el color del padre */}
          {showDropdown && (
            <div className="user-dropdown">
              <div className="dropdown-arrow"></div>
              {user ? (
                <>
                  <Link to="/profile" className="dropdown-item">👤 MI PERFIL</Link>
                  <div className="dropdown-divider"></div>
                  <button onClick={logout} className="dropdown-item logout">⚠️ CERRAR SESIÓN</button>
                </>
              ) : (
                <>
                  <Link to="/login" className="dropdown-item offline">🔑 INICIAR SESIÓN</Link>
                  <Link to="/register" className="dropdown-item offline">📝 CREAR CUENTA</Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;