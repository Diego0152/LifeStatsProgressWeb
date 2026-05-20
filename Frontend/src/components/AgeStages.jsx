import React, { useState } from 'react';
import { useProfile } from '../data/ProfileContext'; // Ajusta la ruta de importación
import '../styles/components/AgeStages.css';

const AgeStep = ({ onNext, currentAge }) => {
  const { CONFIG_MATRIZ, getEtapa } = useProfile();
  const [age, setAge] = useState(currentAge || 25);

  // Lógica local: el contexto nos da la etapa instantáneamente
  const etapa = getEtapa(age); 
  const visualConfig = { color: etapa.color, icon: etapa.icon };

  return (
    <div className="age-scanner-container">
      <div className="scanner-header">
        <h2 className="glitch-text" data-text="SCANNING_BIOMETRICS">SCANNING_BIOMETRICS</h2>
        <p className="scanner-subtitle">EVOLUCIÓN EN LA LÍNEA TEMPORAL DEL PROYECTO</p>
      </div>

      <div className="avatar-display-card" style={{ '--stage-color': visualConfig.color }}>
        <div className="avatar-tactical-frame">
          <span className="avatar-icon">{visualConfig.icon}</span>
        </div>
        <div className="stage-metadata">
          <span className="stage-main-label">{etapa.label}</span>
        </div>
      </div>
      
      <input 
        type="range" min="0" max="100" value={age} 
        onChange={(e) => setAge(parseInt(e.target.value))} 
        className="tactical-range-slider"
      />
        
      <div className="timeline-markers-ticks">
        <span>00</span><span>25</span><span>50</span><span>75</span><span>100</span>
      </div>

      {/* LÓGICA ACTIVA: Envía la edad seleccionada al flujo padre al hacer clic */}
      <button className="btn-tactical-confirm" onClick={() => onNext(age)}>
        FIJAR_LÍNEA_TEMPORAL_›
      </button>
    </div>
  );
};

export default AgeStep;