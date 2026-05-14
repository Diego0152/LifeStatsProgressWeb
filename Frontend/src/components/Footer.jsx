import React from 'react';
import '../styles/components/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      {/* Sección Izquierda: Status técnico */}
      <div className="footer-section">
        <div className="footer-metrics">
          <div className="metric-item">
            <span className="label">CPU_LOAD</span>
            <div className="progress-bar-mini">
              <div className="fill" style={{ width: '42%' }}></div>
            </div>
          </div>
          <div className="metric-item">
            <span className="label">MEM_USE</span>
            <span className="value">1.42GB</span>
          </div>
          <div className="metric-item">
            <span className="label">LATENCY</span>
            <span className="value">24MS</span>
          </div>
        </div>
        <div className="status-container">
          <span className="status-dot"></span>
          <span className="status-text">DB_STATUS: ACTIVE</span>
        </div>
        <div className="system-path">
          ROOT://OBJECTIVES/PROJECT_BETA
        </div>
      </div>
      
      {/* Sección Centro: Copyright Estilo Terminal */}
      <div className="footer-section central">
        <div className="glitch-footer" data-text="TERMINAL_V.2.0.26">
          TERMINAL_V.2.0.26 // © 2026 DIEGO RAMOS
        </div>
        <div className="security-clearance">CLEARANCE_LEVEL: OMEGA</div>
      </div>

      {/* Sección Derecha: Reloj y Localización */}
      <div className="footer-section right">
        <div className="coords">LAT: 40.4168° N // LON: 3.7038° W</div>
        <div className="footer-clock">
          <span className="clock-icon">🕒</span>
          {new Date().toLocaleTimeString()}
        </div>
      </div>
      
      {/* Barra de escaneo decorativa inferior */}
      <div className="footer-bottom-line"></div>
    </footer>
  );
};

export default Footer;