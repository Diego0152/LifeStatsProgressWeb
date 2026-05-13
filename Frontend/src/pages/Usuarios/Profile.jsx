import React from 'react';
import '../../styles/Usuarios/Profile.css';

const Profile = () => {
  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-avatar-large"></div>
        <div className="profile-titles">
          <h1>ADMIN_USER</h1>
          <span className="badge">LEGENDARY_LEVEL</span>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-label">FUERZA</span>
          <div className="stat-bar"><div className="fill" style={{width: '70%'}}></div></div>
        </div>
        <div className="stat-card">
          <span className="stat-label">DISCIPLINA</span>
          <div className="stat-bar"><div className="fill" style={{width: '90%'}}></div></div>
        </div>
        <div className="stat-card">
          <span className="stat-label">CONSISTENCIA</span>
          <div className="stat-bar"><div className="fill" style={{width: '45%'}}></div></div>
        </div>
      </div>
    </div>
  );
};

export default Profile;