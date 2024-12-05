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
    },
    getRanking: async (id: number) : Promise<{
        usuario: string,
        puntaje: number
    }[]> => {
        const res = await api.get(`/cuestionarios/${id}/ranking`);
        return res.data;
    },
    getCuestionariosByUser: async () : Promise<Omit<Cuestionario, "preguntas">[]> => {
        const res = await api.get(`/cuestionarios/usuario/`);
        return res.data;
    },
    responder: async (
        {
            pregunta_id, 
            opcion_id, 
            puntos
        } : {
            pregunta_id: number,
            opcion_id: number,
            puntos: number
        }
    ) : Promise<void> => {
        await api.post(`/preguntas/usuario-respuesta`, { pregunta_id, opcion_id, puntos });
    },
}