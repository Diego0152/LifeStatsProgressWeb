import axios from "axios";

const API_META = axios.create({
    baseURL: "http://localhost:8088/api",
    headers: {
        "Content-Type": "application/json"
    }   
});

export const metaService = {
    getAll: async () => {
        try {
            const response = await API_META.get("/metas");
            return response.data;
        } catch (error) {
            console.error("Error al encontrar metas:", error);
            throw error;
        }
    },

    getById: async (id) => {
        try {
            const response = await API_META.get(`/metas/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error al encontrar meta con id ${id}:`, error);
            throw error;
        }
    },
    addMeta: async (meta) => {
        try {
            const response = await API_META.post("/metas", meta);
            return response.data;
        } catch (error) {
            console.error(`Error al agregar meta:`, error);
            throw error;
        }
    },
    update: async (id, meta) => {
        try {
            const response = await API_META.put(`/metas/${id}`, meta);
            return response.data;
        } catch (error) {
            console.error(`Error al actualizar meta con id ${id}:`, error);
            throw error;
        }
    },
    delete: async (id) => {
        try {
            const response = await API_META.delete(`/metas/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error al eliminar meta con id ${id}:`, error);
            throw error;
        }
    },   
    delete: async (id) => {
        try {
            const response = await API_META.delete(`/metas/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error al eliminar meta con id ${id}:`, error);
            throw error;
        }
    }  
};   