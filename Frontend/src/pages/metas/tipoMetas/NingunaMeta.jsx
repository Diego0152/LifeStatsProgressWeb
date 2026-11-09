import React from 'react';
import { useNavigate } from 'react-router-dom';

const NingunaMeta = () => {
  const navigate = useNavigate();

  return (
    <div className="ninguna-meta-container">
      {/* Indicadores de sub-sistema dentro del marco principal */}
      <div className="hud-subtag top-left-tag">[SYS_NEXUS // SEC_07]</div>
      <div className="hud-subtag top-right-tag">STATUS: NULL</div>

      {/* Alerta / Icono */}
      <div className="alert-wrapper">
        <span className="warning-icon">⚠</span>
      </div>

      {/* Contenido principal */}
      <h1 className="empty-title">¿AÚN NO TE HAS PROPUESTO NADA?</h1>
      
      <p className="empty-description">
        EL SISTEMA ESTÁ EN MODO ESPERA. REGISTRA TU PRIMERA META DIRECTIVA PARA INICIAR EL MONITORIZADO TÁCTICO.
      </p>

      {/* Botón adaptado a las variables y botones de Home/CTA */}
      <button 
        className="btn-huge-action" 
        onClick={() => navigate('/nueva-meta')}
        >
        ESTABLECER_PRIMERA_META
        </button>

      {/* Mini Consola / Logs de terminal */}
      <div className="terminal-logs-box">
        <p className="motivational-code">
          <span className="log-prefix">&gt; Error:</span> No directives found in sectors 7-G.
        </p>
        <p className="motivational-code">
          <span className="log-prefix">&gt; Status:</span> Awaiting user input...
        </p>
      </div>
    </div>
  );
};

export default NingunaMeta;