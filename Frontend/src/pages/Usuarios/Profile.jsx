import React, { useState } from 'react';
import { useAuth } from '../../data/AuthContext';
import '../../styles/Usuarios/Profile.css';

const Profile = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  if (!user) return <div className="access-denied">CRITICAL_ERROR: CORE_DUMPED_UNAUTHORIZED</div>;

  return (
    <div className="profile-max-terminal">
      
      {/* DECORACIÓN SUPERIOR DE LA TERMINAL: REJILLAS Y ESTATUS GLOBAL */}
      <div className="terminal-top-chasis">
        <div className="chasis-lines"><span></span><span></span><span></span><span></span><span></span></div>
        <div className="chasis-serial">CORE_SPEC_v4.2.0 // NODE_LOC_S7</div>
      </div>

      {/* 1. BANNER XL DE AGENTE */}
      <div className="agent-banner-xl">
        <div className="crt-overlay"></div> {/* Efecto de líneas de monitor */}
        
        <div className="banner-flex-layout">
          <div className="avatar-tactical-module">
            <div className="avatar-outer-hexagon">
              <div className="avatar-inner-display">
                <span>{user.nombre.substring(0, 2).toUpperCase()}</span>
                <div className="glitch-line-deco"></div>
              </div>
              {/* Soporte angular HUD */}
              <div className="hud-bracket tl"></div>
              <div className="hud-bracket br"></div>
            </div>
            <span className="serial-barcode">||||| | |||| ||| {user.id?.toString().padStart(4, '0')}</span>
          </div>

          <div className="agent-profile-core">
            <div className="classification-row">
              {/* El bloque Classified se ha eliminado para limpiar la interfaz */}
              <span className={`status-node-pulse ${user.activo ? 'active' : 'alert'}`}>
                {user.activo ? '● NODE_CONNECTED' : '▲ SYSTEM_FAILURE'}
              </span>
            </div>
            
            <h1 className="heavy-glitch-name" data-text={user.nombre.toUpperCase()}>
              {user.nombre.toUpperCase()}
            </h1>
            
            <div className="meta-sub-row">
              <span className="comms-frequency">COMMS_LINK: <span className="text-white">{user.correo.toLowerCase()}</span></span>
              <span className="division-tag">SECTOR: {user.rango || 'RECLUTA_SIN_ASIGNAR'}</span>
            </div>
          </div>
        </div>

        {/* Pestañas de Interfaz Integradas */}
        <div className="tactical-tabs-row">
          <button 
            className={`tab-cyber-btn ${activeTab === 'overview' ? 'selected' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            [ VISTA_DE_EXPEDIENTE ]
          </button>
          <button 
            className={`tab-cyber-btn ${activeTab === 'stats' ? 'selected' : ''}`}
            onClick={() => setActiveTab('stats')}
          >
            [ REGISTRO_NEURAL_MÉTRICAS ]
          </button>
        </div>
      </div>

      {/* 2. REJILLA ASIMÉTRICA XL */}
      <div className="terminal-main-grid-xl">
        
        {/* PANEL BIO-MÉTRICO IZQUIERDO */}
        <div className="tactical-panel bio-chassis">
          <div className="panel-corner-decor"></div>
          <div className="panel-header-sub">
            <span className="panel-num">// 01</span>
            <h2>BIOMETRÍA_FÍSICA</h2>
          </div>
          
          <div className="cyber-bio-specs">
            <div className="spec-item-box">
              <div className="spec-meta">
                <span className="spec-title">EDAD_DEL_SUJETO</span>
                <span className="spec-data">{user.edad || 'E_99'} <span className="unit">AÑOS</span></span>
              </div>
              <div className="mini-progress-tick"><div className="tick-fill" style={{width: user.edad ? `${user.edad}%` : '30%'}}></div></div>
            </div>

            <div className="spec-item-box">
              <div className="spec-meta">
                <span className="spec-title">ESTADO_VITAL</span>
                <span className={`spec-data ${user.estadoSalud ? 'text-green' : 'text-red'}`}>
                  {user.estadoSalud || 'CRÍTICO / NO_DATA'}
                </span>
              </div>
              <div className="mini-progress-tick">
                <div className={`tick-fill ${user.estadoSalud ? 'bg-green' : 'bg-red'}`} style={{width: '100%'}}></div>
              </div>
            </div>

            <div className="spec-item-box">
              <div className="spec-meta">
                <span className="spec-title">ESTADO_DE_CUENTA</span>
                <span className="spec-data text-cyan">{user.activo ? 'OPERATIVO' : 'RESTRINGIDO'}</span>
              </div>
            </div>
          </div>

          <div className="chassis-footer-log">
            <p>&gt; SECURE_DATA_ENCRYPTION_AES256_ACTIVE</p>
          </div>
        </div>

        {/* PANEL DE MÉTRICAS DE RENDIMIENTO DERECHO */}
        <div className="tactical-panel performance-chassis">
          <div className="panel-corner-decor"></div>
          <div className="panel-header-sub">
            <span className="panel-num">// 02</span>
            <h2>EVALUACIÓN_DE_APTITUDES_DE_COMBATE</h2>
          </div>

          <div className="cyber-metrics-container">
            {/* Nodo Atributo 1 */}
            <div className="cyber-progress-node">
              <div className="node-top-label">
                <span className="node-code">ATR_01 // FUERZA_BRUTA</span>
                <span className="node-score-value">70 / 100</span>
              </div>
              <div className="cyber-bar-container">
                <div className="cyber-bar-fill-neon cian" style={{ width: '70%' }}></div>
                <div className="bar-grid-overlay-blocks"></div>
              </div>
            </div>

            {/* Nodo Atributo 2 */}
            <div className="cyber-progress-node">
              <div className="node-top-label">
                <span className="node-code">ATR_02 // DISCIPLINA_EJECUCIÓN</span>
                <span className="node-score-value text-green">90 / 100</span>
              </div>
              <div className="cyber-bar-container">
                <div className="cyber-bar-fill-neon verde" style={{ width: '90%' }}></div>
                <div className="bar-grid-overlay-blocks"></div>
              </div>
            </div>

            {/* Nodo Atributo 3 */}
            <div className="cyber-progress-node">
              <div className="node-top-label">
                <span className="node-code">ATR_03 // CONSISTENCIA_TEMPORAL</span>
                <span className="node-score-value text-amber">45 / 100</span>
              </div>
              <div className="cyber-bar-container">
                <div className="cyber-bar-fill-neon ambar" style={{ width: '45%' }}></div>
                <div className="bar-grid-overlay-blocks"></div>
              </div>
            </div>
          </div>

          {/* Gráfico Analítico Simulado de radar interactivo */}
          <div className="radar-mainframe-simulation">
            <div className="grid-scope-line"></div>
            <div className="radar-sweeper"></div>
            <div className="radar-status-logs">
              <span>SCANNER: ONLINE</span>
              <span>TARGET: ACQUIRED</span>
              <span>POTENTIAL: OPTIMAL</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;