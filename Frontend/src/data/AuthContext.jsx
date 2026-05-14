import { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const loginAction = async (credentials) => {
    // Limpiamos cualquier rastro anterior por si acaso
    localStorage.removeItem("user");

    const response = await fetch("http://localhost:8088/api/usuarios/login", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        // Nos aseguramos de no enviar cabeceras de autorización viejas aquí
      },
      body: JSON.stringify(credentials)
    });

    if (response.ok) {
      const data = await response.json();
      // Guardamos el usuario con la contraseña que escribió (la necesitaremos para el logout después)
      const userWithPass = { ...data, contrasenna: credentials.contrasenna };
      setUser(userWithPass);
      localStorage.setItem("user", JSON.stringify(userWithPass));
      return userWithPass;
    }
    
    // Si el servidor responde 401, caerá aquí
    throw new Error("Credenciales inválidas");
  };

  // --- LOGOUT SINCRONIZADO CON JAVA ---
  const logout = async () => {
    if (user && user.id) {
      try {
        await fetch("http://localhost:8088/api/usuarios/logout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: user.id }) // Le pasamos el ID al Back
        });
      } catch (error) {
        console.error("Error al sincronizar con la DB:", error);
      }
    }

    // Limpiamos React
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, loginAction, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);