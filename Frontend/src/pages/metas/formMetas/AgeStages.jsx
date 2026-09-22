import { useState, useMemo } from "react";
import { useProfile } from "../../../data/ProfileContext";
import "../../../styles/components/AgeStages.css";

const AgeStep = ({ onNext, currentAge }) => {
  const { getEtapa, CONFIG_MATRIZ } = useProfile();
  const [age, setAge] = useState(currentAge || 18);

  const etapa = useMemo(() => getEtapa(age), [age, getEtapa]);

  const handleIncrement = (val) => {
    setAge((prev) => Math.min(100, Math.max(14, prev + val)));
  };

  return (
    <div className="age-scanner-container" style={{ '--stage-color': etapa.color }}>
      <div className="hud-corner top-left"></div>
      <div className="hud-corner top-right"></div>
      <div className="hud-corner bottom-left"></div>
      <div className="hud-corner bottom-right"></div>
      <div className="scan-line"></div>

      {/* LADO IZQUIERDO: SELECCIÓN CYBER-WHEEL */}
      <div className="controls-side">
        <header className="scanner-header">
          <h1 className="text-age">AGE_SYNCRONIZE</h1>
          <p className="scanner-subtitle">ESCOGE TU EDAD:</p>
        </header>

        {/* Nodos de Acceso Rápido por Etapas */}
        <div className="quick-nodes-bar">
          {CONFIG_MATRIZ.etapasEdad.map((e) => (
            <button
              key={e.key}
              type="button"
              className={`node-chip ${age >= e.min && age <= e.max ? 'active' : ''}`}
              onClick={() => setAge(e.min)}
            >
              {e.min}
            </button>
          ))}
        </div>

        {/* Control Rueda/Ajuste de Edad */}
        <div className="wheel-control-chassis">
          <button 
            type="button" 
            className="btn-step-adjust" 
            onClick={() => handleIncrement(-1)}
          >
            -
          </button>

          <div className="wheel-display-frame">
            {age > 14 ? (
              <span className="wheel-sub-number">{age - 1}</span>
            ) : (
              <span className="wheel-sub-number hidden-slot"></span>
            )}
            <div className="wheel-active-number">
              <span>{age}</span>
              <small className="wheel-unit">AÑOS</small>
            </div>
            {age < 100 ? (
              <span className="wheel-sub-number">{age + 1}</span>
            ) : (
              <span className="wheel-sub-number hidden-slot"></span>
            )}
          </div>

          <button 
            type="button" 
            className="btn-step-adjust" 
            onClick={() => handleIncrement(1)}
          >
            +
          </button>
        </div>

        <div className="action-chassis">
          <button className="btn-tactical-confirm" onClick={() => onNext(age)}>
            CONFIRMAR_NODO_TEMPORAL
          </button>
        </div>
      </div>

      {/* LADO DERECHO: MONITOR HOLOGRÁFICO */}
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