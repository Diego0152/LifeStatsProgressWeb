import axios from "axios";

const API_REGISTRO = axios.create({
    baseURL: "http://localhost:8088/api",
    headers: {
        "Content-Type": "application/json"
    }   
});

export const registroService = {
    getAll: async () => {
        try {
            const response = await API_REGISTRO.get("/registros");
            return response.data;
        } catch (error) {
            console.error("Error al encontrar registros:", error);
            throw error;
        }
    },

    getById: async (id) => {
        try {
            const response = await API_REGISTRO.get(`/registros/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error al encontrar registro con id ${id}:`, error);
            throw error;
        }
    },
    addRegistro: async (registro) => {
        try {
            const response = await API_REGISTRO.post("/registros", registro);
            return response.data;
        } catch (error) {
            console.error(`Error al agregar registro:`, error);
            throw error;
        }
    },
    update: async (id, registro) => {
        try {
            const response = await API_REGISTRO.put(`/registros/${id}`, registro);
            return response.data;
        } catch (error) {
            console.error(`Error al actualizar registro con id ${id}:`, error);
            throw error;
        }
    },
    delete: async (id) => {
        try {
            const response = await API_REGISTRO.delete(`/registros/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error al eliminar registro con id ${id}:`, error);
            throw error;
        }
    },   
    delete: async (id) => {
        try {
            const response = await API_REGISTRO.delete(`/registros/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error al eliminar registro con id ${id}:`, error);
            throw error;
        }
    }  
};   