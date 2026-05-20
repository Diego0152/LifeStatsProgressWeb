import React, { useState } from 'react';
import { useProfile } from '../data/ProfileContext';
import '../styles/components/HealthStep.css';

const HealthStep = ({ onNext }) => {
  const { CONFIG_MATRIZ } = useProfile();
  const [selectedIds, setSelectedIds] = useState([]);

  // Lógica para alternar selección y validar conflictos
  const toggleStatus = (key) => {
    // Si ya está seleccionado, lo quitamos
    if (selectedIds.includes(key)) {
      setSelectedIds(selectedIds.filter(i => i !== key));
      return;
    }

    // Comprobamos conflicto contra la lista de conflictos del Contexto
    const conflicto = CONFIG_MATRIZ.CONFLICTOS?.find(c => 
      (c.a === key && selectedIds.includes(c.b)) || 
      (c.b === key && selectedIds.includes(c.a))
    );

    if (conflicto) {
      alert(`BLOQUEO_CRÍTICO: ${key} es incompatible con ${conflicto.a === key ? conflicto.b : conflicto.a}`);
      return;
    }

    setSelectedIds([...selectedIds, key]);
  };

  // Cálculo de estado para la UI
  const hasConflict = CONFIG_MATRIZ.CONFLICTOS?.some(c => 
    selectedIds.includes(c.a) && selectedIds.includes(c.b)
  );

  const allOptions = [...CONFIG_MATRIZ.salud, ...CONFIG_MATRIZ.mentales];
  const lastSelectedOption = allOptions.find(o => o.key === selectedIds[selectedIds.length - 1]);

  return (
    <div className="health-step-container">
      <header className="step-header">
        <h2 className="glitch-text" data-text="BIO_INTEGRITY_SCAN">BIO_INTEGRITY_SCAN</h2>
        <p className="system-msg">Mapea los vectores de rendimiento de tu organismo.</p>
      </header>

      <div className="status-sections-grid">
        {['salud', 'mentales'].map(category => (
          <div key={category} className="category-tactical-block">
            <h4 className="category-title-tag">// {category.toUpperCase()}_MATRICIAL</h4>
            <div className="chips-tactical-layout">
              {CONFIG_MATRIZ[category].map(opt => {
                const isSelected = selectedIds.includes(opt.key);
                return (
                  <button
                    key={opt.key}
                    className={`cyber-chip-card ${isSelected ? 'selected' : ''}`}
                    onClick={() => toggleStatus(opt.key)}
                    style={{ 
                      '--chip-target-color': opt.color,
                      borderLeft: `3px solid ${opt.color}` 
                    }}
                  >
                    <div className="chip-header-info">
                      <span className="c-label">{opt.label}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className={`scan-feedback-terminal ${hasConflict ? 'critical-alert' : ''}`}>
        <div className="terminal-cursor-dot"></div>
        <span className="feedback-stream">
          {hasConflict 
            ? "CRITICAL_WARNING: Conflictos detectados en matriz de rendimiento." 
            : lastSelectedOption 
              ? `STATUS_UPDATE › ${lastSelectedOption.label} integrado`
              : "AWAITING_ORGANISM_SELECTION..."}
        </span>
      </div>

      <button 
        className="btn-complete-onboarding" 
        disabled={selectedIds.length === 0 || hasConflict}
        onClick={() => onNext(selectedIds)}
      >
        VINCULAR_EXPEDIENTE_E_INICIAR
      </button>
    </div>
  );
};

export default HealthStep;