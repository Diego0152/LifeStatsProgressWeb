import React, { useState } from 'react';
import { useAuth } from '../../data/AuthContext';
import '../../styles/Usuarios/Config.css';

const Config = () => {
  const { user, setUser } = useAuth();
  const [formData, setFormData] = useState({
    nombre: user?.nombre || '',
    edad: user?.edad || '',
    estadoSalud: user?.estadoSalud || 'ESTABLE'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    // Aquí conectarías con tu PUT de Spring Boot
    console.log("Sincronizando datos con el núcleo...", formData);
    // Simulación de guardado:
    // setUser({...user, ...formData});
  };

  return (
    <div className="config-wrapper">
      <div className="terminal-window">
        <div className="terminal-header">
          <span className="dot red"></span>
          <span className="dot yellow"></span>
          <span className="dot green"></span>
          <span className="terminal-title">SYS_CONFIG // USER_SETTIGS</span>
        </div>

        <div className="terminal-body">
          <p className="terminal-text">{`> INICIANDO PROTOCOLO DE RECALIBRACIÓN...`}</p>
          <p className="terminal-text">{`> USUARIO_DETECTADO: ${user?.nombre}`}</p>
          
          <div className="form-terminal">
            <div className="input-group">
              <label>ALIAS_DE_AGENTE:</label>
              <input 
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                spellCheck="false"
              />
            </div>

            <div className="input-group">
              <label>CICLOS_DE_VIDA (EDAD):</label>
              <input 
                type="number"
                name="edad"
                value={formData.edad}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label>ESTADO_BIOMÉTRICO:</label>
              <select name="estadoSalud" value={formData.estadoSalud} onChange={handleChange}>
                <option value="ESTABLE">ESTABLE</option>
                <option value="CRITICO">CRÍTICO</option>
                <option value="OPTIMIZADO">OPTIMIZADO</option>
                <option value="SOBRECARGADO">SOBRECARGADO</option>
              </select>
            </div>
          </div>

          <button className="btn-sync" onClick={handleSave}>
            [ EJECUTAR_SINCRONIZACIÓN ]
          </button>
        </div>
      </div>
    </div>
  );
};

export default Config;