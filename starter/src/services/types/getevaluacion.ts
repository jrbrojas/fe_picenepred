export interface EvaluacionResponse {
    id:           number;
    distrito_id:  number;
    categoria_id: number;
    nombre:       string;
    ruc:          string;
    sigla:        null | string;
    direccion:    string;
    telefono:     null | string;
    email:        string;
    web:          string;
    created_at:   Date;
    updated_at:   Date;
    respuestas:   Respuesta[];
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

export interface Respuesta {
    nombre:  string;
    calculo: number;
}

