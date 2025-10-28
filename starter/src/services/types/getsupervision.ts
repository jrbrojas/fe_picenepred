export interface SupervisionResponse {
    id:                     number;
    entidad_id:             number;
    anio:                   number;
    promedio_final:         string;
    created_at:             Date;
    updated_at:             Date;
    entidad:                Entidad;
    supervision_respuestas: SupervisionRespuesta[];
}

export interface Entidad {
    id:           number;
    distrito_id:  number;
    categoria_id: number;
    nombre:       string;
    ruc:          string;
    sigla:        null;
    direccion:    string;
    telefono:     null;
    email:        string;
    web:          string;
    created_at:   Date;
    updated_at:   Date;
    distrito:     Distrito;
    categoria:    Categoria;
}

export interface Categoria {
    id:          number;
    nombre:      string;
    abreviatura: string;
    created_at:  Date;
    updated_at:  Date;
}

export interface Distrito {
    id:           number;
    provincia_id: number;
    codigo:       string;
    nombre:       string;
    provincia:    Provincia;
}

export interface Provincia {
    id:              number;
    departamento_id: number;
    codigo:          string;
    nombre:          string;
    latitud:         string;
    longitud:        string;
    departamento:    Departamento;
}

export interface Departamento {
    id:       number;
    codigo:   string;
    nombre:   string;
    latitud:  string;
    longitud: string;
}

export interface SupervisionRespuesta {
    id:             number;
    supervision_id: number;
    nombre:         string;
    respuesta:      string;
    promedio:       string;
    created_at:     Date;
    updated_at:     Date;
}

