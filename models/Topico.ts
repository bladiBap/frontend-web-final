export interface Topico {
    id:            number;
    nombre:        string;
    descripcion:   string;
    cuestionarios: CuestionarioTopico[];
}

export interface TopicoCreate {
    nombre:      string;
    descripcion: string;
}

export interface CuestionarioTopico {
    id:          number;
    fk_topico:   number;
    fk_usuario:  number;
    titulo:      string;
    descripcion: string;
    createdAT:   Date;
    updatedAt:   Date;
    usuario:     UsuarioTopico;
}

export interface UsuarioTopico {
    id:         number;
    fk_nivel:   number;
    nombre:     string;
    apellido:   string;
    correo:     string;
    contrasena: string;
    rol:        string;
    createdAT:  Date;
    puntaje:    number;
    updatedAt:  Date;
}
