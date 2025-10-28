export interface MonitoreoResponse {
    id:                         number;
    entidad_id:                 number;
    anio:                       number;
    que_implementa:             string;
    sustento:                   string;
    n_personas_en_la_instancia: number;
    n_personas_grd:             number;
    created_at:                 Date;
    updated_at:                 Date;
    file:                       File;
    entidad:                    Entidad;
    monitoreo_respuestas:       MonitoreoRespuesta[];
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
    categoria:    Categoria;
    distrito:     Distrito;
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

export interface File {
    id:            number;
    fileable_type: string;
    fileable_id:   number;
    path:          string;
    disk:          string;
    size:          number;
    mime_type:     string;
    description:   string;
    extra:         string;
    aprobado:      null;
    porcentaje:    null;
    created_at:    Date;
    updated_at:    Date;
    url:           string;
}

export interface MonitoreoRespuesta {
    id:                  number;
    monitoreo_id:        number;
    codigo:              string;
    op:                  string;
    titulo:              string;
    pregunta:            string;
    type:                Type;
    respuesta:           Respuesta;
    cantidad_evidencias: number;
    porcentaje:          number;
    created_at:          Date;
    updated_at:          Date;
}

export enum Respuesta {
    No = "no",
    Si = "si",
}

export enum Type {
    Empty = "%",
    N = "N",
}

