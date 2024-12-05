import { SinglePowerup } from "./Powerup";

export interface Nivel {
    id:          number;
    nombre:      string;
    descripcion: string;
}

export interface NivelWithDetail {
    id:          number;
    nombre:      string;
    descripcion: string;
    Powerup?:    SinglePowerup[];
}

export interface NivelCreate {
    nombre:      string;
    descripcion: string;
}
