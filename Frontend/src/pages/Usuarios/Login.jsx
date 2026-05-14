import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../data/AuthContext.jsx';
import '../../styles/Usuarios/Auth.css';

const Login = () => {
  // Asegúrate de que los nombres coincidan exactamente con el "name" de los inputs
  const [inputs, setInputs] = useState({ identificador: '', contrasenna: '' });
  const [errorMsg, setErrorMsg] = useState(""); 
  
  const { loginAction } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (errorMsg) setErrorMsg(""); 
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Enviamos el objeto 'inputs' al loginAction
      await loginAction(inputs);
      // Si el login es exitoso, navegamos al Home (donde se hará el check de metas)
      navigate('/'); 
    } catch (error) {
      console.error('Login failed:', error);
      setErrorMsg("ACCESO_DENEGADO: Credenciales de agente no reconocidas.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <span className="scanner-line"></span>
          <h2>INICIA SESIÓN</h2>
          <p>Sincroniza tu identidad con el núcleo del sistema.</p>
        </div>

        {errorMsg && (
          <div className="system-alert-box">
            <span className="alert-icon">⚡</span>
            <p className="alert-text">{errorMsg}</p>
          </div>
        )}
        
        <form className="auth-form" onSubmit={handleLogin}>
          <div className="input-group">
            <label>NOMBRE DE USUARIO O EMAIL</label>
            <input 
              type="text" 
              name="identificador" 
              value={inputs.identificador} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="input-group">
            <label>CONTRASEÑA</label>
            <input 
              type="password" 
              name="contrasenna" 
              placeholder="Password..." 
              value={inputs.contrasenna} 
              onChange={handleChange} 
              required
            />
          </div>
          
          <button type="submit" className="btn-glow">ACCEDER AL NÚCLEO</button>
        </form>

        <div className="auth-footer">
          <p>¿No tienes una identidad activa?</p>
          <Link to="/register" className="register-link">REGISTRAR NUEVA IDENTIDAD</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;