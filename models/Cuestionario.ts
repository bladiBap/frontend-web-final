import { Pregunta, PreguntaCreate } from "./Pregunta";

export interface Cuestionario {
    id:          number;
    fk_topico:   number;
    fk_usuario:  number;
    titulo:      string;
    descripcion: string;
    createdAT:   Date;
    updatedAt:   Date;
    preguntas:   Pregunta[];
}

export interface CuestionarioCreate {
    fk_topico:   number;
    fk_usuario:  number;
    titulo:      string;
    descripcion: string;
    preguntas:   PreguntaCreate[];
}
