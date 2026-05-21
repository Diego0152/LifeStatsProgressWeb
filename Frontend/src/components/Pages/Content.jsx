import React from 'react';
import Home from '../../pages/Home.jsx';
import { Routes, Route, useLocation } from 'react-router-dom'; // Importamos useLocation
import ProtectedRoute from '../Pages/ProtectedRoutes.jsx'; // Ruta protegida para componentes que requieren autenticación
// Importa otros componentes como Missions, Profile, etc.
import '../../styles/components/Content.css';
import Login from '../../pages/Usuarios/Login.jsx';
import Register from '../../pages/Usuarios/Register.jsx';
import Profile from '../../pages/Usuarios/Profile.jsx';
import Config from '../../pages/Usuarios/Config.jsx';
import ErrorPage from '../ErrorPage.jsx';
import MetasFlow from '../../pages/metas/MetasFlow.jsx';
import Metas from '../../pages/metas/Metas.jsx';

const Content = () => {
  const location = useLocation();
  return (
    <div key={location.key} className="content-frame booting">
      <div className="hud-corner top-left"></div>
      <div className="hud-corner top-right"></div>

      <div className="crt-flash"></div>

      <div className="inner-content">  
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Rutas protegidas */}
          <Route path="/profile" element={
            <ProtectedRoute><Profile /></ProtectedRoute>
          } />
          <Route path="/metas" element={
            <ProtectedRoute><Metas /></ProtectedRoute>
          } />
          <Route path="/nueva-meta" element={
            <ProtectedRoute><MetasFlow /></ProtectedRoute>
          } />
          
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
      <div className="hud-corner bottom-left"></div>
      <div className="hud-corner bottom-right"></div>
    </div>
  );
};

export default Content;