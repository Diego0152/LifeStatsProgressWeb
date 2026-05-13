import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../../styles/Usuarios/Auth.css';

const Register = () => {
  const [inputs, setInputs] = React.useState({ nombre: '', correo: '', contrasenna: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8088/api/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputs) // Enviamos el objeto con nombre, email y password
      });

      if (response.ok) {
        alert("REGISTRO EXITOSO: Identidad creada en el núcleo.");
        navigate('/login');
      } else {
        const errorMsg = await response.text();
        alert(`ERROR EN EL REGISTRO: ${errorMsg}`);
      }
    } catch (error) {
      console.error("Error conectando con el servidor:", error);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>REGISTRO DE NUEVO RECLUTA</h2>
          <p>Crea una nueva identidad en la red de objetivos.</p>
        </div>
        
        <form className="auth-form" onSubmit={handleRegister} >
          <div className="input-group">
            <label>NOMBRE DE USUARIO</label>
            <input 
              type="text" 
              name="nombre" 
              placeholder="Alias..." 
              value={inputs.nombre} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="input-group">
            <label>CORREO ELECTRÓNICO</label>
            <input 
              type="email" 
              name="correo" 
              placeholder="Email..." 
              value={inputs.correo} 
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
          <button type="submit" className="btn-glow register-style">CREAR CUENTA</button>
        </form>
        <div className="auth-footer">
          <p>¿Ya tienes una cuenta activa?</p>
          <Link to="/login" className="register-link">INICIAR SESIÓN</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;