import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AgeStep from '../../components/AgeStages.jsx';
import HealthStep from '../../components/HealthStep.jsx';
import '../../styles/metas/Metas.css';

const Metas = () => {
  const navigate = useNavigate();
  
  // Este estado vendría de tu base de datos mediante un useEffect
  const [metas, setMetas] = useState([]); 

  return (
    <div className="metas-container">
      {metas.length > 0 ? (
        // CASO A: TIENE METAS
        <div className="metas-dashboard">
          <header className="dashboard-header">
            <h2 className="glitch-text" data-text="MIS_DIRECTIVAS">MIS_DIRECTIVAS</h2>
            <button className="btn-add-meta" onClick={() => navigate('#crear')}>
              + NUEVO_OBJETIVO
            </button>
          </header>
          <div className="metas-grid">
            {metas.map(meta => <MetaCard key={meta.id} meta={meta} />)}
          </div>
        </div>
      ) : (
        // CASO B: PANTALLA EN GRANDE (EMPTY STATE)
        <div className="empty-metas-screen">
          <div className="warning-icon">⚠</div>
          <h1 className="empty-title">¿AÚN NO TE HAS PROPUESTO NADA?</h1>
          <p className="empty-subtitle">
            EL SISTEMA ESTÁ EN MODO ESPERA. TU POTENCIAL ESTÁ SIENDO DESPERDICIADO.
          </p>
          <div className="scanline"></div>
          
          <button 
            className="btn-huge-action" 
            onClick={() => navigate('/nueva-meta#edad')}
          >
            ESTABLECER_PRIMERA_META
          </button>
          
          <p className="motivational-code">
            Error: No directives found in sectors 7-G. <br/>
            Status: Awaiting human input...
          </p>
        </div>
      )}

      {/* Si el hash es #crear, mostramos el formulario sobrepuesto o en esta misma sección */}
      {window.location.hash === '#crear' && (
        <div className="modal-overlay">
           {/* Aquí irá tu nuevo formulario de "Crear Meta" */}
           <div className="create-meta-form">
              <h2>CONFIGURAR_NUEVA_META</h2>
              {/* Inputs para Título, Categoría, Fecha Límite... */}
              <button onClick={() => navigate('/')}>CANCELAR</button>
           </div>
        </div>
      )}
    </div>
  );
};

export default Metas;