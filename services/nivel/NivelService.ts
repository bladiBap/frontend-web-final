import api from "../axios";
import { Nivel, NivelCreate } from "@/models/Nivel";

export const NivelService = {
    createNivel: async (nivel: NivelCreate) : Promise<Nivel> => {
        const res = await api.post('/niveles', nivel);
        return res.data;
    },
    updateNivel: async (id: number, nivel: NivelCreate) : Promise<Nivel> => {
        const res = await api.put(`/niveles/${id}`, nivel);
        return res.data;
    },
    deleteNivel: async (id: number) : Promise<any> => {
        const res = await api.delete(`/niveles/${id}`);
        return res.data;
    },
    getNivelById: async (id: number) : Promise<Nivel> => {
        const res = await api.get(`/niveles/${id}`);
        return res.data;
    },
    getNiveles: async () : Promise<Nivel[]> => {
        const res = await api.get('/niveles');
        return res.data;
    }
}