import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useAuth } from '../../data/AuthContext';

const EditMetas = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const token = user?.token;

  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    fechaInicio: '',
    fechaFin: ''
  });

  // Cargar los datos actuales de la meta a editar
  useEffect(() => {
    const fetchMetaById = async () => {
      try {
        const response = await fetch(`http://localhost:8088/api/metas/${id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
          const data = await response.json();
          setFormData({
            nombre: data.nombre || '',
            descripcion: data.descripcion || '',
            fechaInicio: data.fechaInicio || '',
            fechaFin: data.fechaFin || ''
          });
        }
      } catch (error) {
        console.error("❌ Error al obtener la meta para editar:", error);
      }
    };

    if (id && token) {
      fetchMetaById();
    }
  }, [id, token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8088/api/metas/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        navigate('/metas');
      } else {
        console.error("❌ Error al actualizar la meta:", response.status);
      }
    } catch (error) {
      console.error("❌ Error de red al actualizar meta:", error);
    }
  };

  return (
    <div className="metas-form-page">
      <div className="hud-page-card">
        <span className="hud-tag tag-top-left">FORM_INPUT</span>
        <span className="hud-tag tag-top-right">MODE: EDIT</span>

        <h2 className="form-page-title">EDITAR DIRECTIVA TÁCTICA</h2>

        <form onSubmit={handleSubmit} className="hud-form">
          <div className="form-group">
            <label>NOMBRE DE LA DIRECTIVA</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>DESCRIPCIÓN</label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleInputChange}
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
            <button type="submit" className="btn-modal btn-save">GUARDAR_CAMBIOS</button>
          </div>
        </form>

        <span className="hud-tag tag-bottom-right">SYS_VERIFIED</span>
      </div>
    </div>
  );
};

export default EditMetas;