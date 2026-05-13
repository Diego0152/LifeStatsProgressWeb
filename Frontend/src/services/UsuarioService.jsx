import axios from "axios";

const API_USUARIOS = axios.create({
    baseURL: "http://localhost:8088/api",
    headers: {
        "Content-Type": "application/json"
    }   
});

export const usuarioService = {
    getAll: async () => {
        try {
            const response = await API_USUARIOS.get("/usuarios");
            return response.data;
        } catch (error) {
            console.error("Error al encontrar usuarios:", error);
            throw error;
        }
    },

    getById: async (id) => {
        try {
            const response = await API_USUARIOS.get(`/usuarios/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error encontrando usuario con id ${id}:`, error);
            throw error;
        }
    },
    register: async (usuario) => {
        try {
            const response = await API_USUARIOS.post("/usuarios", usuario);
            return response.data;
        } catch (error) {
            console.error("Error registrando usuario:", error);
            throw error;
        }
    },
    update: async (id, usuario) => {
        try {
            const response = await API_USUARIOS.put(`/usuarios/${id}`, usuario);
            return response.data;
        } catch (error) {
            console.error(`Error actualizando usuario con id ${id}:`, error);
            throw error;
        }
    },   
    delete: async (id) => {
        try {
            const response = await API_USUARIOS.delete(`/usuarios/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error eliminando usuario con id ${id}:`, error);
            throw error;
        }
    }  
};   