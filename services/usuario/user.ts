import api from "@/services/axios";

export const UserService = {
    getMyInfo: async () : Promise<unknow> => {
        const res = await api.get('/usuario/me');
        return res.data;
    }
}