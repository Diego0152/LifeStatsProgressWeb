import { createContext, useContext, useState } from 'react';

const ProfileContext = createContext();

// Definimos la configuración aquí, eliminando la necesidad de pedirla al backend
const CONFIG_MATRIZ = {
  etapasEdad: [
    { key: 'NIÑO', label: 'Niño', min: 0, max: 12, color: '#edff49', icon: '👶' },
    { key: 'ADOLESCENTE', label: 'Adolescente', min: 13, max: 17, color: '#d4e309', icon: '🧑' },
    { key: 'JOVEN', label: 'Joven', min: 18, max: 25, color: '#acb800', icon: '👨' },
    { key: 'ADULTO', label: 'Adulto', min: 26, max: 40, color: '#ddd906', icon: '👨‍🦳' },
    { key: 'SEÑOR', label: 'Señor', min: 41, max: 65, color: '#e7e55c', icon: '👴' },
    { key: 'ANCIANO', label: 'Anciano', min: 66, max: 130, color: '#fef49b', icon: '👵' }
  ],
  salud: [
    { key: 'OXIDADO', label: 'Oxidado', color: '#ff6b6b' },
    { key: 'INICIADO', label: 'Iniciado', color: '#feca57' },
    { key: 'EQUILIBRADO', label: 'Equilibrado', color: '#1dd1a1' },
    { key: 'IMPARABLE', label: 'Imparable', color: '#00cec9' },
    { key: 'ELITE', label: 'Elite', color: '#0984e3' },
    { key: 'REPOSO', label: 'Reposo', color: '#636e72' },
    { key: 'HERIDO', label: 'Herido', color: '#ff6b6b' }
  ],
  mentales: [
    { key: 'ZENIT', label: 'Zenit', color: '#00b894' },
    { key: 'EN_FOCO', label: 'En Foco', color: '#feca57' },
    { key: 'QUEMADO', label: 'Quemado', color: '#ff6b6b' },
    { key: 'DIFUSO', label: 'Difuso', color: '#636e72' },
    { key: 'INQUEBRANTABLE', label: 'Inquebrantable', color: '#0984e3' }
  ],
  CONFLICTOS: [
    { a: 'OXIDADO', b: 'ELITE' },       // Alguien oxidado no puede ser elite
    { a: 'QUEMADO', b: 'ZENIT' },       // No puedes estar quemado y en zenit
    { a: 'REPOSO', b: 'IMPARABLE' },    // El reposo excluye al imparable
    { a: 'HERIDO', b: 'IMPARABLE' }     // Si estás herido, no puedes ser imparable
  ]
};

export const ProfileProvider = ({ children }) => {
  const [formData, setFormData] = useState({ edad: 0, estadoSalud: [] });

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