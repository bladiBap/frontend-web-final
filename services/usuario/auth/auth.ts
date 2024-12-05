import api from "@/services/axios";

export const AuthService = {
    login: async (correo : string, contrasena: string) : Promise<unknow> => {
        const res = await api.post('/usuario/login', {
            correo, 
            contrasena
        });
        return res.data;
    },
    register: async (nombre: string, apellido: string, correo: string, contrasena: string) : Promise<unknow> => {
        const res = await api.post('/usuario', {
            nombre, 
            apellido, 
            correo, 
            contrasena,
            role: 'USER'
        });
        return res.data;
    },
    logout: async () : Promise<unknow> => {
        const res = await api.post('/usuario/logout');
        return res.data;
    }
}