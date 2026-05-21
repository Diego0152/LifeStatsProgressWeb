import { useState, useMemo } from "react";
import { useProfile } from "../../../data/ProfileContext";
import "../../../styles/components/AgeStages.css";

const AgeStep = ({ onNext, currentAge }) => {
  const { getEtapa, CONFIG_MATRIZ } = useProfile();
  const [age, setAge] = useState(currentAge || 25);
  
  const etapa = useMemo(() => getEtapa(age), [age, getEtapa]);

  return (
    <div className="age-scanner-container" style={{ '--stage-color': etapa.color }}>
      {/* Elementos Estéticos de la Interfaz HUD */}
      <div className="hud-corner top-left"></div>
      <div className="hud-corner top-right"></div>
      <div className="hud-corner bottom-left"></div>
      <div className="hud-corner bottom-right"></div>
      <div className="scan-line"></div>
      
      {/* Panel Izquierdo: Entrada de Mandos */}
      <div className="controls-side">
        <header className="scanner-header">
          <h1 className="text-age">BIOMETRIC_SYNC</h1>
          <p className="scanner-subtitle">CALIBRACIÓN DE NODO TEMPORAL ACTIVA</p>
        </header>

        <div className="slider-chassis">
          <input 
            type="range" 
            min="14" 
            max="100" 
            value={age} 
            onChange={(e) => setAge(parseInt(e.target.value))} 
            className="tactical-range-slider"
          />

          <div className="slider-markers">
            {CONFIG_MATRIZ.etapasEdad.map((e) => (
              <div 
                key={e.key} 
                className={`marker ${age >= e.min && age <= e.max ? 'current' : ''} ${age >= e.min ? 'passed' : ''}`} 
                onClick={() => setAge(e.min)}
              >
                <span className="marker-node"></span>
                <span className="marker-value">{e.min}</span>
              </div>
            ))}
            <div className={`marker ${age === 100 ? 'current passed' : ''}`} onClick={() => setAge(100)}>
              <span className="marker-node"></span>
              <span className="marker-value">100</span>
            </div>
          </div>
        </div>

        <div className="action-chassis">
          <button className="btn-tactical-confirm" onClick={() => onNext(age)}>
            CONFIRMAR_NODO_TEMPORAL
          </button>
        </div>
      </div>

      {/* Panel Derecho: Monitor de Datos Holográfico */}
      <div className="visual-side">
        <div className="avatar-frame">
          <span className="avatar-icon">{etapa.icon}</span>
        </div>
        <div className="age-counter-view">
          {age}<span className="age-unit">YRS</span>
        </div>
        <div className="status-badge">
          {etapa.label ? etapa.label.toUpperCase() : "DESCONOCIDO"}
        </div>
      </div>
    </div>
  );
};

export default AgeStep;