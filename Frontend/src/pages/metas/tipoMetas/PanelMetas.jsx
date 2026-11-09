import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../../styles/components/PanelMetas.css';

const PanelMetas = ({ metas, onReloadMetas }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="metas-dashboard-container">
      {metas.length > 0 ? (
        /* VISTA A: LISTADO DE METAS Y OBJETIVOS */
        <div className="metas-dashboard">
          <header className="dashboard-header-hud">
            <h2 className="glitch-title" data-text="MIS_DIRECTIVAS">
              MIS_DIRECTIVAS<span className="cursor-blink">_</span>
            </h2>
            <button className="btn-boyd-primary" onClick={() => navigate('#crear')}>
              + NUEVA_DIRECTIVA
            </button>
          </header>

          <div className="metas-grid">
            {metas.map(meta => (
              <div key={meta.id} className="meta-card-tactical">
                <div className="card-tag">// META_ID: 0{meta.id}</div>
                <h3>{meta.nombre}</h3>
                <p>{meta.descripcion}</p>
                <div className="card-metrics">
                  <span>PORCENTAJE: {meta.porcentajeExito}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* VISTA B: DASHBOARD VACÍO (LISTO PARA CREAR PRIMERA META) */
        <div className="empty-state-viewport">
          <div className="boyd-hud-panel">
            <div className="hud-corner top-l">SYS_STATUS // READY</div>
            <div className="hud-corner top-r">BIOMETRICS: VERIFIED</div>

            <div className="warning-core">
              <div className="warning-icon-glow" style={{ color: '#00f0ff', textShadow: '0 0 18px rgba(0,240,255,0.8)' }}>
                ✚
              </div>
            </div>

            <h1 className="empty-title-glitch">
              PANEL_DE_DIRECTIVAS_VACÍO
            </h1>

            <p className="empty-subtitle-code">
              BIOMETRÍA CONFIRMADA. REGISTRA TU PRIMERA META PRINCIPAL PARA INICIAR EL RASTREO TÁCTICO DE OBJETIVOS.
            </p>

            <div className="action-btn-container">
              <button 
                className="btn-boyd-primary" 
                onClick={() => navigate('#crear')}
              >
                ESTABLECER_PRIMERA_META
              </button>
            </div>

            <div className="terminal-logs">
              <p>[SYS_LOG]: User profile linked successfully.</p>
              <p>Awaiting first directive creation payload...</p>
            </div>

            <div className="hud-corner bottom-l">MODE_STANDBY</div>
            <div className="hud-corner bottom-r">SEC_07</div>
          </div>
        </div>
      )}

      {/* MODAL CREAR META SOBREPUESTO */}
      {location.hash === '#crear' && (
        <div className="modal-overlay-boyd">
          <div className="boyd-modal-box">
            <div className="modal-header-cyber">
              <h3>[ CONFIGURAR_NUEVA_META ]</h3>
              <button className="btn-close" onClick={() => navigate('/metas')}>✕</button>
            </div>
            {/* Aquí situarás tu formulario de crear meta */}
          </div>
        </div>
      )}
    </div>
  );
};

export default PanelMetas;