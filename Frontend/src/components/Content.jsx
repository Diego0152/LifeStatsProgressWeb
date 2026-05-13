import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
// Importa otros componentes como Missions, Profile, etc.
import '../styles/components/Content.css';
import Login from '../pages/Usuarios/Login.jsx';
import Register from '../pages/Usuarios/Register.jsx';
import Profile from '../pages/Usuarios/Profile.jsx';

const Content = () => {
  return (
    <div className="content-frame">
      {/* Añadimos un efecto de "esquinas de HUD" para decorar */}
      <div className="hud-corner top-left"></div>
      <div className="hud-corner top-right"></div>
      
      <div className="inner-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          {/* <Route path="/misiones" element={<Missions />} />  */}
        </Routes>
      </div>

      <div className="hud-corner bottom-left"></div>
      <div className="hud-corner bottom-right"></div>
    </div>
  );
};

export default Content;