export interface DirectorioResponse {
    id:                     number;
    responsable_id:         number;
    entidad_id:             number;
    fecha_registro:         Date;
    created_at:             Date;
    updated_at:             Date;
    responsable:            Responsable;
    entidad:                Entidad;
    historial_responsables: HistorialResponsable[];
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
    id:           number;
    nombre:       string;
    abreviatura?: string;
    created_at:   Date | null;
    updated_at:   Date | null;
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

export interface HistorialResponsable {
    id:             number;
    responsable_id: number;
    directorio_id:  number;
    fecha_inicio:   Date;
    fecha_fin:      Date;
    created_at:     Date;
    updated_at:     Date;
    responsable:    Responsable;
}

export interface Responsable {
    id:                    number;
    cargo_id:              number;
    roles_responsables_id: number;
    nombre:                string;
    apellido:              string;
    dni:                   string;
    email:                 string;
    telefono:              string;
    fecha_inicio:          Date;
    fecha_fin:             Date;
    created_at:            Date;
    updated_at:            Date;
    cargo?:                Categoria;
    roles_responsable?:    Categoria;
}

