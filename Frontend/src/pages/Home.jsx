import React from 'react';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      {/* Sección de Bienvenida / Stats */}
      <header className="home-header">
        <h1 className="glitch-text" data-text="SYSTEM_ACTIVE">SYSTEM_ACTIVE</h1>
        <div className="user-stats">
          <div className="stat-item">
            <span>LEVEL</span>
            <div className="stat-value">12</div>
          </div>
          <div className="stat-item">
            <span>XP</span>
            <div className="xp-bar-container">
              <div className="xp-bar-fill" style={{ width: '65%' }}></div>
            </div>
          </div>
        </div>
      </header>

      {/* Contenedor de misiones */}
      <section className="mission-grid">
        <div className="mission-card">
          <div className="card-tag">DAILY_QUEST</div>
          <h3>Entrenamiento de Fuerza</h3>
          <p>Completa 4 series de dominadas para ganar 50 XP.</p>
          <button className="btn-action">INICIAR FASE</button>
        </div>

        <div className="mission-card highlight">
          <div className="card-tag">MAIN_STORY</div>
          <h3>Hidratación Óptima</h3>
          <p>Has bebido 1.5L / 3L hoy.</p>
          <div className="progress-mini">
             <div className="progress-fill" style={{ width: '50%' }}></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;