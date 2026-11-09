import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../data/AuthContext';

const AddMetas = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const userId = user?.id || user?.usuario?.id;
  const token = user?.token;

  const [formData, setFormData] = useState({
    nombre: '',             // Coincide con MetaPrincipal.nombre
    descripcion: '',        // Coincide con MetaPrincipal.descripcion
    fechaInicio: '',        // Obligatorio en Java
    fechaFin: ''            // Obligatorio en Java
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      console.error("❌ No se encontró el ID del usuario.");
      return;
    }

    try {
      // URL corregida según tu controlador de Spring Boot: /api/metas/usuario/{usuarioId}
      const response = await fetch(`http://localhost:8088/api/metas/usuario/${userId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          porcentajeExito: 0.0,
          activo: true
        })
      });

      if (response.ok) {
        navigate('/metas');
      } else {
        console.error("❌ Error al crear la meta:", response.status);
      }
    } catch (error) {
      console.error("❌ Error de red al crear meta:", error);
    }
  };

  return (
    <div className="metas-form-page">
      <div className="hud-page-card">
        <span className="hud-tag tag-top-left">FORM_INPUT</span>
        <span className="hud-tag tag-top-right">MODE: CREATE</span>

        <h2 className="form-page-title">REGISTRAR NUEVA DIRECTIVA</h2>

        <form onSubmit={handleSubmit} className="hud-form">
          <div className="form-group">
            <label>NOMBRE DE LA DIRECTIVA</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              required
              placeholder="Ej: Aumentar Resistencia"
            />
          </div>

          <div className="form-group">
            <label>DESCRIPCIÓN</label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleInputChange}
              placeholder="Descripción concisa de la meta táctica"
              rows="3"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>FECHA DE INICIO</label>
              <input
                type="date"
                name="fechaInicio"
                value={formData.fechaInicio}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>FECHA DE FIN</label>
              <input
                type="date"
                name="fechaFin"
                value={formData.fechaFin}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="form-page-actions">
            <Link to="/metas" className="btn-modal btn-cancel">CANCELAR</Link>
            <button type="submit" className="btn-modal btn-save">CREAR_DIRECTIVA</button>
          </div>
        </form>

        <span className="hud-tag tag-bottom-right">SYS_VERIFIED</span>
      </div>
    </div>
  );
};

export default AddMetas;