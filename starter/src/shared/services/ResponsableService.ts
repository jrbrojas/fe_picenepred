import ApiService from '@/services/ApiService'
import endpointConfig from '../endpoint.config';

export interface StoreRequest {
    fecha_registro: Date;
    nombre: string;
    apellido: string;
    dni: string;
    email: string;
    telefono: string;
    fecha_inicio: Date;
    fecha_fin: Date;
    id_cargo: number;
    id_categoria: number;
    id_departamento: string;
    id_provincia: string;
    id_entidad: number;
    id_rol: number;
    ubigeo: string;
}
export interface Directorio {
    fecha_registro: Date;
    nombre: string;
    apellido: string;
    dni: string;
    email: string;
    telefono: string;
    fecha_inicio: Date;
    fecha_fin: Date;
    id_cargo: number;
    id_categoria: number;
    categoria: string;
    id_departamento: number;
    id_provincia: number;
    id_entidad: number;
    id_rol: number;
    ubigeo: number;
    updated_at: Date;
    created_at: Date;
    id: number;
    nombre_entidad?: string;
    departamento: string;
    provincia: string;
    distrito: string;
}
export async function apiStoreResponsable(data: StoreRequest) {
    return ApiService.fetchDataWithAxios<ResponsableResponse, StoreRequest>({
        url: endpointConfig.responsable.store,
        method: 'post',
        data,
    })
}
export async function apiUpdateResponsable(id: number, data: StoreRequest) {
    return ApiService.fetchDataWithAxios<ResponsableResponse, StoreRequest>({
        url: endpointConfig.responsable.store + `/${id}`,
        method: 'put',
        data,
    })
}
export type DirectorioResponse = Directorio[];
export async function apiGetDirectorio() {
    return ApiService.fetchDataWithAxios<DirectorioResponse>({
        url: endpointConfig.directorio.list,
        method: 'get',
    })
}
export interface ResponsableResponse {
    fecha_registro: Date;
    nombre: string;
    apellido: string;
    dni: string;
    email: string;
    telefono: string;
    fecha_inicio: Date;
    fecha_fin: Date;
    id_cargo: number;
    id_categoria: number;
    categoria: string;
    id_departamento: number;
    id_provincia: number;
    id_entidad: number;
    id_rol: number;
    ubigeo: number;
    updated_at: Date;
    created_at: Date;
    id: number;
    rol: string;
    cargo: string;
}
export type ListResponsable = ResponsableResponse[]
export async function apiGetResponsables(id_entidad: number) {
    return ApiService.fetchDataWithAxios<ListResponsable>({
        url: endpointConfig.responsable.store,
        method: 'get',
        params: { id_entidad },
    })
}
export interface EntidadRegistradareResponse {
    id: number;
    fecha_registro: Date;
    categoria_id: string;
    entidad_id: string;
    created_at: Date;
    updated_at: Date;
    entidad: Entidad;
    categoria: Categoria;
}

export interface Categoria {
    id: number;
    nombre: string;
    created_at: null;
    updated_at: null;
}

export interface Entidad {
    id: number;
    ubigeo: string;
    nombre: string;
    ruc: string;
    direccion: string;
    telefono: string;
    email: string;
    web: string;
    created_at: Date;
    updated_at: Date;
}

export async function apiGetEntidad(id: number) {
    return ApiService.fetchDataWithAxios<EntidadRegistradareResponse>({
        url: endpointConfig.directorio.entidades + `/${id}`,
        method: 'get',
    })
}
