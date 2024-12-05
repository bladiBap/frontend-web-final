import api from "@/services/axios";

export const LogroService = {
    getAll: async () : Promise<unknow> => {
        const res = await api.get('/logro');
        return res.data;
    },
    delete: async (id: number) : Promise<unknow> => {
        const res = await api.delete(`/logro/soft/${id}`);
        return res.data;
    },
    create: async (logro: any) : Promise<unknow> => {
        const res = await api.post('/logro', logro);
        return res.data;
    },
    getById: async (id: number) : Promise<unknow> => {
        const res = await api.get(`/logro/${id}`);
        return res.data;
    },
    update: async (id: number, logro: any) : Promise<unknow> => {
        const res = await api.put(`/logro/${id}`, logro);
        return res.data;
    }
}