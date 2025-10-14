import endpointConfig from '../endpoint.config';
import ApiServiceDimse from '@/services/ApiServiceDimse';
export interface Categoria {
    id: string;
    nombre: string;
}
export type CategoriaResponse = Categoria[];
export async function apiCategorias() {
    return ApiServiceDimse.fetchDataWithAxios<CategoriaResponse>({
        url: endpointConfig.categorias,
        method: 'get',
    })
}
export interface Rol {
    id: string;
    nombre: string;
}
export type RolResponse = Rol[];
export async function apiRoles() {
    return ApiServiceDimse.fetchDataWithAxios<RolResponse>({
        url: endpointConfig.rols,
        method: 'get',
    })
}
export interface Cargo {
    id: string;
    nombre: string;
}
export type CargoResponse = Cargo[];
export async function apiCargos() {
    return ApiServiceDimse.fetchDataWithAxios<CargoResponse>({
        url: endpointConfig.cargos,
        method: 'get',
    })
}
export interface EntidadResponse {
    id: string;
    ubigeo: string;
    nombre: string;
    ruc: null | string;
    direccion: null | string;
    telefono: null | string;
    email: null | string;
    web: null | string;
    categoria_id: string;
    created_at: Date;
    updated_at: Date;
}

export type ListEntidadResponse = EntidadResponse[];
export async function apiEntidades() {
    return ApiServiceDimse.fetchDataWithAxios<ListEntidadResponse>({
        url: endpointConfig.entidades,
        method: 'get',
    })
}
export interface EntidadRegistradaResponse {
    id: string;
    entidad_id: string;
    categoria_id: string;
    fecha_registro: Date;
}

export type ListEntidadRegistradaResponse = EntidadRegistradaResponse[];
export async function apiEntidadesRegistradas() {
    return ApiServiceDimse.fetchDataWithAxios<ListEntidadRegistradaResponse>({
        url: endpointConfig.directorio.entidades,
        method: 'get',
    })
}
