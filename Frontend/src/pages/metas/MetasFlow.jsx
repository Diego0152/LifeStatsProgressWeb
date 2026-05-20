import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../data/AuthContext'; // Para sacar el ID del usuario
import AgeStep from '../../components/AgeStages';
import HealthStep from '../../components/HealthStep';
import '../../styles/metas/MetasFlow.css';

const MetasFlow = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth(); // Obtenemos el usuario autenticado

  // Almacenamiento local del progreso antes del guardado final
  const [formData, setFormData] = useState({
    edad: 25,
    estadosSalud: []
  });

  const handleAgeComplete = (selectedAge) => {
    setFormData(prev => ({ ...prev, edad: selectedAge }));
    navigate('/nueva-meta#estado-salud'); // Salto al paso 2
  };

  const handleHealthComplete = async (selectedChips) => {
    // Estructuramos el DTO exactamente como lo espera tu BiometriaDTO de Java
    const biometriaDTO = {
      edad: formData.edad,
      estadosSalud: selectedChips // Envía la lista de Strings (IDs de los Enums)
    };

    try {
      const response = await fetch(`http://localhost:8080/api/usuarios/${user.id}/sincronizar-biometria`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(biometriaDTO),
      });

      if (response.ok) {
        console.log("Sincronización biométrica completada con éxito en el servidor.");
        navigate('/metas'); // Redirección al Dashboard de Metas liberado
      } else {
        console.error("Fallo en la respuesta del servidor al sincronizar.");
      }
    } catch (error) {
      console.error("Error de red al conectar con el servidor táctico:", error);
    }
  };

  const renderStep = () => {
    switch (location.hash) {
      case '#edad':
        return <AgeStep onNext={handleAgeComplete} currentAge={formData.edad} />;
      case '#estado-salud':
        return <HealthStep onNext={handleHealthComplete} />;
      default:
        return <AgeStep onNext={handleAgeComplete} currentAge={formData.edad} />;
    }
  };

  return (
    <div className="setup-screen-xl">
      <div className="step-indicator-bar">
        <div className={`step-node ${location.hash !== '#estado-salud' ? 'active' : ''}`}>
          <span className="step-num">01</span> <span className="step-tag">CRONOLOGÍA</span>
        </div>
        <div className="step-connector-line"></div>
        <div className={`step-node ${location.hash === '#estado-salud' ? 'active' : ''}`}>
          <span className="step-num">02</span> <span className="step-tag">BIO_INTEGRIDAD</span>
        </div>
      </div>
      
      <div className="flow-component-wrapper">
        {renderStep()}
      </div>
    </div>
  );
};

export default MetasFlow;