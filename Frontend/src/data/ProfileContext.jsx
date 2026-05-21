import { createContext, useContext, useState } from 'react';

const ProfileContext = createContext();

// Definimos la configuración aquí, eliminando la necesidad de pedirla al backend
const CONFIG_MATRIZ = {
  etapasEdad: [
    { key: 'ADOLESCENTE', label: 'Adolescente', min: 14, max: 17, color: '#d4e309', icon: '🧑' },
    { key: 'JOVEN', label: 'Joven', min: 18, max: 25, color: '#acb800', icon: '👨' },
    { key: 'ADULTO', label: 'Adulto', min: 26, max: 40, color: '#ddd906', icon: '👨‍🦳' },
    { key: 'SEÑOR', label: 'Señor', min: 41, max: 65, color: '#e7e55c', icon: '👴' },
    { key: 'ANCIANO', label: 'Anciano', min: 66, max: 130, color: '#fef49b', icon: '👵' }
  ],
  salud: [
    { key: 'INACTIVO', label: 'Inactivo', color: '#ff6b6b' },
    { key: 'EN_MOVIMIENTO', label: 'En Movimiento', color: '#feca57' },
    { key: 'ESTABLE', label: 'Equilibrado', color: '#1dd1a1' },
    { key: 'ENERGÉTICO', label: 'Energético', color: '#00cec9' },
    { key: 'ALTO_RENDIMIENTO', label: 'Alto Rendimiento', color: '#0984e3' },
    { key: 'EN_PAUSA', label: 'En Pausa', color: '#636e72' },
    { key: 'EN_RECUPERACIÓN', label: 'En Recuperación', color: '#ff6b6b' }
  ],
  mentales: [
    { key: 'CLARIDAD_TOTAL', label: 'Claridad Total', color: '#00b894' },
    { key: 'CONCENTRADO', label: 'Concentrado', color: '#feca57' },
    { key: 'AGOTADO', label: 'Agotado', color: '#ff6b6b' },
    { key: 'DESPISTADO', label: 'Despistado', color: '#636e72' },
    { key: 'DECIDIDO', label: 'Decidido', color: '#0984e3' }
  ],
  CONFLICTOS: [
    { a: 'INACTIVO', b: 'ALTO_RENDIMIENTO' },       // Alguien inactivo no puede ser elite
    { a: 'AGOTADO', b: 'CLARIDAD_TOTAL' },       // No puedes estar agotado y en claridad total
    { a: 'EN_PAUSA', b: 'ENERGÉTICO' },    // El reposo excluye al energético
    { a: 'EN_RECUPERACIÓN', b: 'ENERGÉTICO' }     // Si estás en recuperación, no puedes ser energético
  ]
};

export const ProfileProvider = ({ children }) => {
  const [formData, setFormData] = useState({ edad: 14, estadoSalud: [] });

  // Función para obtener la etapa basada en la edad
  const getEtapa = (edad) => {
    return CONFIG_MATRIZ.etapasEdad.find(e => edad >= e.min && edad <= e.max) || { key: 'DESCONOCIDO' };
  };

  return (
    <ProfileContext.Provider value={{ formData, setFormData, CONFIG_MATRIZ, getEtapa }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);