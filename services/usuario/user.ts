import api from "@/services/axios";

export const UserService = {
    getMyInfo: async () : Promise<unknow> => {
        const res = await api.get('/usuario/me');
        return res.data;
    },
    getAllInfo: async () : Promise<unknow> => {
        const res = await api.get('/usuario/me/information');
        return res.data;
    },
    completeCuestionario: async (fk_cuestionario: number) : Promise<unknow> => {
        const res = await api.post(`/usuario/cuestionario/complete`, {
            fk_cuestionario
        });
        return res.data;
    },
    postLogros: async () : Promise<unknow> => {
        const res = await api.post('/usuario/cuestionario/complete/logro');
        return res.data;
    },
    postMisiones: async () : Promise<unknow> => {
        const res = await api.post('/usuario/cuestionario/complete/mision');
        return res.data;
    },
}