import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../data/AuthContext';
import AddMeta from './AddMetas';
import EditMeta from './EditMetas';
import '../../styles/metas/Metas.css';

// Componente interno para mostrar la lista de metas
const MetasListContent = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [metas, setMetas] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = user?.id || user?.usuario?.id;
  const token = user?.token;

  const fetchMetas = async () => {
    if (!userId) {
      setLoading(false);
      return;
    }
    console.log(`el token es ${token}`)  

    try {
      const response = await fetch(`http://localhost:8088/api/metas/usuario/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        console.log("📊 DATOS RECIBIDOS DEL BACKEND:", data);
        setMetas(data);
      }
    } catch (error) {
      console.error("❌ Error al cargar metas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetas();
  }, [user]);

  // Función de Eliminar (Delete directo)
  const handleDeleteMeta = async (id) => {
    if (!window.confirm("⚠️ ¿Confirmas la eliminación de esta directiva táctica?")) return;

    try {
      const response = await fetch(`http://localhost:8088/api/metas/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        setMetas(prev => prev.filter(m => m.id !== id));
      } else {
        console.error("❌ Error al eliminar:", response.status);
      }
    } catch (error) {
      console.error("❌ Error de red al eliminar:", error);
    }
  };

  if (loading) {
    return (
      <div className="metas-loading-container">
        <div className="hud-spinner-box"></div>
        <span className="hud-loading-code">[ SYSTEM_SYNC // CARGANDO_DIRECTIVAS ]</span>
      </div>
    );
  }

  return (
    <div className="metas-dashboard">
      <header className="metas-header">
        <div className="header-info">
          <span className="hud-code-badge">SYS_MODULE // METAS</span>
          <h1 className="header-title">PANEL DE DIRECTIVAS</h1>
        </div>
        <Link to="/metas/add" className="btn-hud-action">
          + NUEVA_DIRECTIVA
        </Link>
      </header>

      {metas.length === 0 ? (
        <div className="metas-empty-card">
          <span className="hud-tag tag-top-left">SYS_METRICS</span>
          <span className="hud-tag tag-top-right">NO_DATA</span>
          <h2>NO HAY DIRECTIVAS ACTIVAS</h2>
          <p>Pulsa en "+ NUEVA_DIRECTIVA" para registrar tu primer objetivo táctico.</p>
          <span className="hud-tag tag-bottom-left">SEC_07</span>
          <span className="hud-tag tag-bottom-right">STANDBY</span>
        </div>
      ) : (
        <div className="metas-grid">
          {metas.map((item) => (
            <div key={item.id} className="meta-card">
              <span className="hud-tag tag-top-left">DIR_ID: {item.id}</span>
              <span className="hud-tag tag-top-right">{item.categoria}</span>
              
              <div className="card-content">
                <h3 className="card-title">{item.nombre}</h3>
                <p className="card-desc">{item.descripcion}</p>
                {item.meta && <div className="card-target">OBJETIVO: {item.meta}</div>}
              </div>

              <div className="card-actions">
                <button 
                  className="btn-card btn-edit" 
                  onClick={() => navigate(`/metas/edit/${item.id}`)}
                >
                  EDITAR
                </button>
                <button 
                  className="btn-card btn-delete" 
                  onClick={() => handleDeleteMeta(item.id)}
                >
                  ELIMINAR
                </button>
              </div>

              <span className="hud-tag tag-bottom-left">STATUS: ACTIVE</span>
              <span className="hud-tag tag-bottom-right">OK</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Componente Enrutador principal del módulo
const Metas = () => {
  return (
    <Routes>
      <Route path="/" element={<MetasListContent />} />
      <Route path="/add" element={<AddMeta />} />
      <Route path="/edit/:id" element={<EditMeta />} />
    </Routes>
  );
};

export default Metas;