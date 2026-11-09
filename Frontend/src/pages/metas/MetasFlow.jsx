import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../data/AuthContext';
import AgeStep from './formMetas/AgeStages';
import HealthStep from './formMetas/HealthStep';
import '../../styles/metas/MetasFlow.css';

const MetasFlow = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  // 1. Inicialización correcta leyendo de sessionStorage
  const [formData, setFormData] = useState(() => {
    const savedAge = sessionStorage.getItem('edad');
    return {
      edad: savedAge ? parseInt(savedAge, 10) : null,
      estadosSalud: []
    };
  });

  const [edadConfirmada, setEdadConfirmada] = useState(() => {
    return sessionStorage.getItem('edadConfirmada') === 'true';
  });

  // 2. Guardián de seguridad: Revisa sessionStorage para no rebotar tras el remontaje
  useEffect(() => {
    const estaConfirmada = sessionStorage.getItem('edadConfirmada') === 'true';

    if (location.hash === '#estado-salud' && !estaConfirmada) {
      console.warn("⚠️ Redirigiendo a #edad por falta de confirmación.");
      navigate('/nueva-meta#edad', { replace: true });
    }
  }, [location.hash, navigate]);

  const handleAgeComplete = (selectedAge) => {
    // Persistimos en sessionStorage ANTES de navegar
    sessionStorage.setItem('edad', selectedAge);
    sessionStorage.setItem('edadConfirmada', 'true');

    setFormData(prev => ({ ...prev, edad: selectedAge }));
    setEdadConfirmada(true);

    navigate('/nueva-meta#estado-salud');
  };

  const handleHealthComplete = async (selectedChips) => {
    const userId = user?.id || user?.usuario?.id;

    if (!userId) {
      console.error("❌ No se pudo obtener el ID del usuario.");
      return;
    }

    const edadFinal = formData.edad || parseInt(sessionStorage.getItem('edad'), 10);

    const datosParciales = {
      edad: edadFinal,
      estadoSalud: selectedChips
    };

    try {
      const response = await fetch(`http://localhost:8088/api/usuarios/${userId}`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user?.token}`
        },
        body: JSON.stringify(datosParciales),
      });

      if (response.ok) {
        console.log("✅ Datos biométricos actualizados con éxito.");
        // Limpiamos la memoria temporal al terminar
        sessionStorage.removeItem('edad');
        sessionStorage.removeItem('edadConfirmada');
        navigate('/metas');
      } else {
        console.error("❌ Error al actualizar datos. Status:", response.status);
      }
    } catch (error) {
      console.error("Error de red al conectar con el servidor táctico:", error);
    }
  };

  const renderStep = () => {
    switch (location.hash) {
      case '#edad':
        return <AgeStep onNext={handleAgeComplete} currentAge={formData.edad || 18} />;
      case '#estado-salud':
        return <HealthStep onNext={handleHealthComplete} />;
      default:
        return <AgeStep onNext={handleAgeComplete} currentAge={formData.edad || 18} />;
    }
  };

  return (
    <div className="setup-screen-xl">
      {/* Nodo 01: Cronología */}
      <div className={`step-node ${location.hash !== '#estado-salud' ? 'current passed' : 'passed'}`}>
        <div className="node-status-glow"></div>
        <span className="step-num">01</span>
        <span className="step-tag">CRONOLOGÍA</span>
      </div>

      {/* Conector Central */}
      <div className={`step-connector-line ${location.hash === '#estado-salud' ? 'energized' : ''}`}>
        <div className="connector-pulse"></div>
      </div>

      {/* Nodo 02: Bio-Integridad */}
      <div className={`step-node ${location.hash === '#estado-salud' ? 'current' : 'pending'}`}>
        <div className="node-status-glow"></div>
        <span className="step-num">02</span>
        <span className="step-tag">BIO_INTEGRIDAD</span>
      </div>
      
      <div className="flow-component-wrapper">
        {renderStep()}
      </div>
    </div>
  );
};

export default MetasFlow;