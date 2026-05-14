import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AgeStep from '../../components/AgeStages';
import HealthStep from '../../components/HealthStatus';
import '../../styles/components/MetasFlow.css';


const MetasFlow = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Renderizado condicional basado en el hash de la URL
  const renderStep = () => {
    switch (location.hash) {
      case '#edad':
        return <AgeStep onNext={() => navigate('#estado-salud')} />;
      case '#estado-salud':
        return <HealthStep onNext={() => navigate('/metas/objetivos')} />;
      default:
        return <AgeStep />;
    }
  };

  return (
    <div className="setup-screen">
      <div className="step-indicator">
        <div className={`step ${location.hash === '#edad' ? 'active' : ''}`}>01</div>
        <div className={`step ${location.hash === '#estado-salud' ? 'active' : ''}`}>02</div>
        <div className="step-line"></div>
      </div>
      
      {renderStep()}
    </div>
  );
};

export default MetasFlow;