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
    sigla:        null | string;
    direccion:    null | string;
    telefono:     null | string;
    email:        null | string;
    web:          null;
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
    nombre:         Nombre;
    respuesta:      Respuesta;
    promedio:       string;
    created_at:     Date;
    updated_at:     Date;
    files:          File[];
}

export interface File {
    id:            number;
    fileable_type: string;
    fileable_id:   number;
    path:          string;
    disk:          string;
    size:          number;
    mime_type:     string;
    description:   null;
    extra:         null;
    aprobado:      null;
    porcentaje:    string;
    created_at:    Date;
    updated_at:    Date;
    url:           string;
}

export enum Nombre {
    Actividades = "actividades",
    Otros = "otros",
    Programas = "programas",
    Proyecto = "proyecto",
}

export enum Respuesta {
    No = "no",
    Si = "si",
}

