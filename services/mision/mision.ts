import api from "@/services/axios";

export const MisionService = {
    getAll: async () : Promise<unknow> => {
        const res = await api.get('/mision');
        return res.data;
    },
    delete: async (id: number) : Promise<unknow> => {
        const res = await api.delete(`/mision/soft/${id}`);
        return res.data;
    },
    create: async (mision: any) : Promise<unknow> => {
        const res = await api.post('/mision', mision);
        return res.data;
    },
    getById: async (id: number) : Promise<unknow> => {
        const res = await api.get(`/mision/${id}`);
        return res.data;
    },
    update: async (id: number, mision: any) : Promise<unknow> => {
        const res = await api.put(`/mision/${id}`, mision);
        return res.data;
    }
}