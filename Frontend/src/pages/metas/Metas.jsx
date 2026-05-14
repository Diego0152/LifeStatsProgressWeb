import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AgeStep from '../../components/AgeStages.jsx';
import HealthStep from '../../components/HealthStatus.jsx';
import './Metas.css';

const Metas = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Estado para almacenar los datos del "escaneo" inicial
  const [profileData, setProfileData] = useState({
    age: null,
    status: []
  });

  // Control de flujo por Hash
  const currentHash = location.hash || '#edad';

  const handleAgeComplete = (age) => {
    setProfileData({ ...profileData, age });
    navigate('#estado-salud');
  };

  const handleHealthComplete = (selectedStatus) => {
    setProfileData({ ...profileData, status: selectedStatus });
    // Aquí podrías hacer el POST al backend con JPA antes de navegar
    navigate('/metas/objetivos');
  };

  return (
    <div className="metas-interface">
      {/* Barra de progreso superior */}
      <div className="setup-progress-bar">
        <div className={`progress-segment ${currentHash === '#edad' ? 'active' : ''}`}>01_CHRONOS</div>
        <div className={`progress-segment ${currentHash === '#estado-salud' ? 'active' : ''}`}>02_BIO_INTEGRITY</div>
      </div>

      <main className="metas-content">
        {currentHash === '#edad' && (
          <AgeStep onNext={handleAgeComplete} />
        )}
        
        {currentHash === '#estado-salud' && (
          <HealthStep onNext={handleHealthComplete} />
        )}
      </main>

      {/* Decoración de fondo estilo rejilla */}
      <div className="grid-overlay"></div>
    </div>
  );
};

export default Metas;