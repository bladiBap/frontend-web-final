import { Topico, TopicoCreate } from "@/models/Topico";
import api from "../axios";

export const TopicoService = {
    createTopico: async (topico: TopicoCreate): Promise<Topico> => {
        const res = await api.post('/topicos', topico);
        return res.data;
    },
    updateTopico: async (id: number, topico: TopicoCreate): Promise<Topico> => {
        const res = await api.put(`/topicos/${id}`, topico);
        return res.data;
    },
    deleteTopico: async (id: number): Promise<any> => {
        const res = await api.delete(`/topicos/${id}`);
        return res.data;
    },
    getTopicoById: async (id: number): Promise<Topico> => {
        const res = await api.get(`/topicos/${id}`);
        return res.data;
    },
    getTopicos: async (): Promise<Topico[]> => {
        const res = await api.get('/topicos');
        return res.data;
    }
}