import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../data/AuthContext'; 
import '../styles/components/UserPanel.css';

const UserPanel = () => {
  // Sacamos 'user' y 'logout' del contexto global
  const { user, logout } = useAuth();

  return (
    <div className="nav-user-panel">
      {user ? (
        /* --- ESTADO: AGENTE CONECTADO --- */
        <div className="logged-in-zone">
          <div className="user-info">
            <span className="user-rank">RANK: AGENT</span>
            {/* Usamos el nombre real que viene de la DB */}
            <Link to="/profile" className="user-name">
              {user.nombre.toUpperCase()}
            </Link>
          </div>
          {/* El avatar ahora ejecuta el logout real */}
          <div className="user-avatar" onClick={logout} title="LOGOUT_SESSION"></div>
        </div>
      ) : (
        /* --- ESTADO: ACCESO REQUERIDO --- */
        <div className="auth-zone">
          <Link to="/login" className="btn-auth login">
            LOG_IN
          </Link>
          <Link to="/register" className="btn-auth register">
            CREATE_ACCOUNT
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserPanel;