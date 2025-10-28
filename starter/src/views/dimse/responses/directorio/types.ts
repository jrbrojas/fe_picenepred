export interface Entidad {
    id:              number;
    nombre:          string;
    ruc:             string;
    sigla:           string;
    direccion:       string;
    telefono:        string;
    email:           string;
    web:             string;
    categoria_id:    number;
    ubigeo:          string;
    distrito_id:     number;
    provincia_id:    number;
    departamento_id: number;
    created_at:      Date;
    updated_at:      Date;
}

export interface Historial {
    id:              number;
    fecha_registro:  Date;
    nombre:          string;
    apellido:        string;
    dni:             string;
    email:           string;
    ubigeo:          string;
    telefono:        string;
    fecha_inicio:    Date;
    fecha_fin:       Date;
    id_cargo:        number;
    id_categoria:    number;
    id_rol:          number;
    id_departamento: number;
    id_provincia:    number;
    id_entidad:      number;
    id_distrito:     number;
    created_at:      Date;
    updated_at:      Date;
}

