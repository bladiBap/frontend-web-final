import { Nivel } from "./Nivel";

export interface Powerup {
    id:          number;
    fk_nivel:    number;
    nombre:      string;
    descripcion: string;
    nivel:       Nivel;
}

export interface SinglePowerup {
    id:          number;
    fk_nivel:    number;
    nombre:      string;
    descripcion: string;
}

export interface PowerupCreate {
    nombre:      string;
    descripcion: string;
    fk_nivel:    number;
}

