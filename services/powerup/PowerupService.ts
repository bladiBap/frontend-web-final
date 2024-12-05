import { Powerup, PowerupAvailables, PowerupCreate } from "@/models/Powerup";
import api from "../axios";
import { Nivel, NivelCreate } from "@/models/Nivel";

export const PowerupService = {
    createPowerup: async (nivel: PowerupCreate): Promise<Powerup> => {
        const res = await api.post('/powerup', nivel);
        return res.data;
    },
    updatePowerup: async (id: number, nivel: NivelCreate): Promise<Powerup> => {
        const res = await api.put(`/powerup/${id}`, nivel);
        return res.data;
    },
    deletePowerup: async (id: number): Promise<any> => {
        const res = await api.delete(`/powerup/${id}`);
        return res.data;
    },
    getPowerupById: async (id: number): Promise<Powerup> => {
        const res = await api.get(`/powerup/${id}`);
        return res.data;
    },
    getPowerup: async (): Promise<Powerup[]> => {
        const res = await api.get('/powerup');
        return res.data;
    },
    getPowerupsByUser: async (): Promise<PowerupAvailables[]> => {
        const res = await api.post(`/powerup/user/`);
        return res.data;
    },
    usePowerup: async (id: number): Promise<any> => {
        const res = await api.get(`/use/powerup/${id}`);
        return res.data;
    }
}