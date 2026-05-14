import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/components/ErrorPage.css';

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="error-screen">
      {/* Capas de efectos ambientales */}
      <div className="noise"></div>
      <div className="overlay-glow"></div>
      <div className="scanline"></div>

      <div className="error-content-wrapper">
        <h1 className="glitch-text" data-text="404">404</h1>
        
        <div className="error-info-panel">
          <div className="status-badge">SISTEMA CORRUPTO</div>
          <p className="error-msg">ACCESO AL SECTOR DENEGADO</p>
          <p className="error-sub">La ruta solicitada no existe o ha sido borrada por el protocolo de seguridad.</p>
        </div>

        <div className="terminal-window">
          <div className="terminal-header">
            <div className="dots">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
            <span className="terminal-id">ERR_LOG_v3.0.4</span>
          </div>
          <div className="terminal-content">
            <p className="t-line"> localizing_data... <span className="t-fail">NOT_FOUND</span></p>
            <p className="t-line"> kernel_status... <span className="t-fail">CRITICAL</span></p>
            <p className="t-line">recommended_action: <span className="t-blink">REBOOT</span></p>
          </div>
        </div>

        <button className="btn-reboot-system" onClick={() => navigate('/')}>
          EJECUTAR REINICIO FORZADO
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;