import React, { useState } from 'react';
import '../styles/components/AgeStages.css';

const ageStages = [
  { min: 0, max: 3, label: 'INFANTE', icon: '👶', desc: 'Fase de inicio' },
  { min: 4, max: 12, label: 'NIÑO', icon: '🧒', desc: 'Desarrollo cognitivo' },
  { min: 13, max: 17, label: 'ADOLESCENTE', icon: '🧑‍💻', desc: 'Expansión de red' },
  { min: 18, max: 66, label: 'ADULTO', icon: '👤', desc: 'Fase operativa' },
  { min: 67, max: 100, label: 'SENIOR', icon: '👴', desc: 'Legado y sabiduría' }
];

const AgeStep = () => {
  const [age, setAge] = useState(25);

  // Buscamos en qué etapa estamos según la edad actual
  const currentStage = ageStages.find(s => age >= s.min && age <= s.max) || ageStages[3];

  return (
    <div className="age-scanner-container">
      <div className="scanner-header">
        <h2 className="glitch-text" data-text="SCANNING_BIOMETRICS">SCANNING_BIOMETRICS</h2>
        <p className="scanner-subtitle">DEFINE TU POSICIÓN EN LA LÍNEA TEMPORAL</p>
      </div>

      <div className={`avatar-display ${currentStage.label.toLowerCase()}`}>
        <div className="avatar-frame">
          <span className="avatar-icon">{currentStage.icon}</span>
          <div className="scanner-line"></div>
        </div>
        <div className="stage-info">
          <span className="stage-label">{currentStage.label}</span>
          <span className="stage-desc">{currentStage.desc}</span>
        </div>
      </div>

      <div className="timeline-wrapper">
        <div className="age-display">{age} <span className="unit">AÑOS</span></div>
        <input 
          type="range" 
          min="0" 
          max="100" 
          value={age} 
          onChange={(e) => setAge(parseInt(e.target.value))}
          className="age-slider"
        />
        <div className="timeline-markers">
          <span>0</span>
          <span>25</span>
          <span>50</span>
          <span>75</span>
          <span>100</span>
        </div>
      </div>

      <button className="btn-continue">VINCULAR_DATOS</button>
    </div>
  );
};

export default AgeStep;