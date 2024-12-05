import { Opcion } from "./Opcion";

export interface Pregunta {
    id:              number;
    enunciado:       string;
    orden:           number;
    cuestionario_id: number;
    opciones:        Opcion[];
}

export interface PreguntaCreate {
    enunciado:       string;
    orden:           number;
    opciones:        Omit<Opcion, "id" | "pregunta_id">[];
}