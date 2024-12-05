import { Cuestionario, CuestionarioCreate } from "@/models/Cuestionario";
import api from "./axios";

export const CuestionarioService = {
    createCuestionario: async (cuestionario: CuestionarioCreate) : Promise<Cuestionario[]> => {
        const res = await api.post('/cuestionarios', cuestionario);
        return res.data;
    },
    updateCuestionario: async (id: number, cuestionario: CuestionarioCreate) : Promise<Cuestionario[]> => {
        const res = await api.put(`/cuestionarios/${id}`, cuestionario);
        return res.data;
    },
    deleteCuestionario: async (id: number) : Promise<Cuestionario[]> => {
        const res = await api.delete(`/cuestionarios/${id}`);
        return res.data;
    },
    getCuestionario: async (id: number) : Promise<Cuestionario> => {
        const res = await api.get(`/cuestionarios/${id}`);
        return res.data;
    },
    getAll: async () : Promise<Cuestionario[]> => {
        const res = await api.get('/cuestionarios');
        return res.data;
    }
}