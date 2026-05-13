import axios from "axios";

const API_OBJETIVO = axios.create({
    baseURL: "http://localhost:8088/api",
    headers: {
        "Content-Type": "application/json"
    }   
});

export const objetivoService = {
    getAll: async () => {
        try {
            const response = await API_OBJETIVO.get("/objetivos");
            return response.data;
        } catch (error) {
            console.error("Error al encontrar objetivos:", error);
            throw error;
        }
    },

    getById: async (id) => {
        try {
            const response = await API_OBJETIVO.get(`/objetivos/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error al encontrar objetivo con id ${id}:`, error);
            throw error;
        }
    },
    addObjetivo: async (objetivo) => {
        try {
            const response = await API_OBJETIVO.post("/objetivos", objetivo);
            return response.data;
        } catch (error) {
            console.error(`Error al agregar objetivo:`, error);
            throw error;
        }
    },
    update: async (id, objetivo) => {
        try {
            const response = await API_OBJETIVO.put(`/objetivos/${id}`, objetivo);
            return response.data;
        } catch (error) {
            console.error(`Error al actualizar objetivo con id ${id}:`, error);
            throw error;
        }
    },
    delete: async (id) => {
        try {
            const response = await API_OBJETIVO.delete(`/objetivos/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error al eliminar objetivo con id ${id}:`, error);
            throw error;
        }
    },   
    delete: async (id) => {
        try {
            const response = await API_OBJETIVO.delete(`/objetivos/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error al eliminar objetivo con id ${id}:`, error);
            throw error;
        }
    }  
};   