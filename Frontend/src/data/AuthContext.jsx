// src/context/AuthContext.jsx
import { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Esta función vive aquí para que todos puedan usarla
  const loginAction = async (credentials) => {
    const response = await fetch("http://localhost:8088/api/usuarios/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials)
    });

    if (response.ok) {
      const data = await response.json();
      setUser(data); // <-- GUARDAMOS EL ESTADO GLOBAL
      return data;
    }
    throw new Error("Credenciales inválidas");
  };

  const logout = () => {
    setUser(null); // Al limpiar esto, vuelve a aparecer Login/Register
  };

  return (
    <AuthContext.Provider value={{ user, loginAction, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);