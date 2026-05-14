import React from 'react';
import { useAuth } from '../../data/AuthContext'; // Ajusta la ruta según tu proyecto
import '../../styles/Usuarios/Profile.css';

const Profile = () => {
  const { user } = useAuth();

  if (!user) return <div className="access-denied">ERROR: SESIÓN NO INICIADA</div>;

  return (
    <div className="profile-wrapper">
      <div className="profile-container">
        {/* Decoración de escaneo */}
        <div className="scan-line"></div>
        
        <div className="profile-header">
          <div className="avatar-section">
            <div className="profile-avatar-large">
              {/* Círculo de carga decorativo alrededor del avatar */}
              <div className="avatar-ring"></div>
            </div>
            <span className="id-tag">ID_{user.id?.toString().padStart(4, '0')}</span>
          </div>

          <div className="profile-titles">
            <h1 className="glitch-text" data-text={user.nombre.toUpperCase()}>
              {user.nombre.toUpperCase()}
            </h1>
            <div className="badges-row">
              <span className="badge">NIVEL: {user.activo ? 'OPERATIVO' : 'INACTIVO'}</span>
              <br />
              <span className="badge secondary">RANGO: {user.rango || 'SIN REGISTRAR'}</span>
            </div>
          </div>
        </div>

        <div className="info-grid">
          <div className="info-box">
            <span className="label">CORREO_ELECTRONICO</span>
            <span className="value">{user.correo}</span>
          </div>
          <div className="info-box">
            <span className="label">EDAD_SUJETO</span>
            <span className="value">{user.edad || '??'} AÑOS</span>
          </div>
          <div className="info-box">
            <span className="label">ESTADO_SALUD</span>
            <span className="value status-ok">{user.estadoSalud || 'SIN REGISTRAR'}</span>
          </div>
        </div>

        <h3 className="section-title">ANÁLISIS DE ATRIBUTOS</h3>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-header">
              <span className="stat-label">FUERZA</span>
              <span className="stat-value">70%</span>
            </div>
            <div className="stat-bar"><div className="fill" style={{width: '70%'}}></div></div>
          </div>
          
          <div className="stat-card">
            <div className="stat-header">
              <span className="stat-label">DISCIPLINA</span>
              <span className="stat-value">90%</span>
            </div>
            <div className="stat-bar"><div className="fill pulse" style={{width: '90%'}}></div></div>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <span className="stat-label">CONSISTENCIA</span>
              <span className="stat-value">45%</span>
            </div>
            <div className="stat-bar"><div className="fill warning" style={{width: '45%'}}></div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;