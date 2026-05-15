import React, { useState } from 'react';
import '../styles/components/HealthStep.css';

const HEALTH_OPTIONS = [
  { id: 'OXIDADO', label: 'OXIDADO', desc: 'Sedentario', cat: 'FISICO' },
  { id: 'INICIADO', label: 'INICIADO', desc: 'Activo', cat: 'FISICO' },
  { id: 'EQUILIBRADO', label: 'EQUILIBRADO', desc: 'Saludable', cat: 'FISICO' },
  { id: 'IMPARABLE', label: 'IMPARABLE', desc: 'Atleta', cat: 'FISICO' },
  { id: 'ELITE', label: 'ELITE', desc: 'Fuerte', cat: 'FISICO' },
  { id: 'HERIDO', label: 'HERIDO', desc: 'En recuperación', cat: 'FISICO' },
  { id: 'REPOSO', label: 'REPOSO', desc: 'Retirado', cat: 'FISICO' },
  { id: 'ZENIT', label: 'ZENIT', desc: 'Mente clara', cat: 'MENTAL' },
  { id: 'EN_FOCO', label: 'EN_FOCO', desc: 'Flow', cat: 'MENTAL' },
  { id: 'QUEMADO', label: 'QUEMADO', desc: 'Burnout', cat: 'MENTAL' },
  { id: 'DIFUSO', label: 'DIFUSO', desc: 'Niebla mental', cat: 'MENTAL' },
  { id: 'INQUEBRANTABLE', label: 'INQUEBRANTABLE', desc: 'Resiliencia', cat: 'MENTAL' }
];

const HealthStep = ({ onNext }) => {
  const [selected, setSelected] = useState([]);

  const toggleStatus = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter(i => i !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  // Lógica de "Conflicto de Datos" para el feedback visual
  const hasConflict = selected.includes('ELITE') && selected.includes('OXIDADO');

  return (
    <div className="health-step-container">
      <header className="step-header">
        <h2 className="glitch-text">BIO_INTEGRITY_SCAN</h2>
        <p className="system-msg">Selecciona todos los estados que definan tu situación actual.</p>
      </header>

      <div className="status-sections">
        {['FISICO', 'MENTAL'].map(category => (
          <div key={category} className="category-group">
            <h4 className="category-title">{category}_STATUS</h4>
            <div className="chips-grid">
              {HEALTH_OPTIONS.filter(opt => opt.cat === category).map(opt => (
                <button
                  key={opt.id}
                  className={`status-chip ${selected.includes(opt.id) ? 'active' : ''}`}
                  onClick={() => toggleStatus(opt.id)}
                >
                  <span className="chip-label">{opt.label}</span>
                  <span className="chip-desc">{opt.desc}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {selected.length > 0 && (
        <div className={`scan-feedback ${hasConflict ? 'warning' : ''}`}>
          <div className="pulse-dot"></div>
          <span className="feedback-text">
            {hasConflict 
              ? "CONFLICTO_DE_DATOS: Parámetros contradictorios detectados." 
              : `SISTEMA: ${selected.length} módulos de integridad vinculados.`}
          </span>
        </div>
      )}

      <button 
        className="btn-continue" 
        disabled={selected.length === 0}
        onClick={() => onNext(selected)}
      >
        VINCULAR_BIO_DATA
      </button>
    </div>
  );
};

export default HealthStep;