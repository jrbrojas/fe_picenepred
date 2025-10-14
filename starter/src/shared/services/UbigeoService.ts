import endpointConfig from '../endpoint.config';
import ApiServiceDimse from '@/services/ApiServiceDimse';

export interface Depa {
    capital: string;
    iddpto: string;
    nombre: string;
}
export type DepaResponse = Depa[];
export async function apiDepas() {
    return ApiServiceDimse.fetchDataWithAxios<DepaResponse>({
        url: endpointConfig.depa,
        method: 'get',
    })
}

export interface Prov {
    nombre: string;
    idprov: string;
    nomdpto: string;
}
export type ProvResponse = Prov[];
export async function apiProv() {
    return ApiServiceDimse.fetchDataWithAxios<ProvResponse>({
        url: endpointConfig.prov,
        method: 'get',
    })
}
export interface Dist {
    iddpto: string;
    idprov: string;
    ubigeo: string;
    departamento: string;
    provincia: string;
    distrito: string;
    capital: string;
}
export type UbigeoResponse = Dist[];
export async function apiDist() {
    return ApiServiceDimse.fetchDataWithAxios<UbigeoResponse>({
        url: endpointConfig.dis,
        method: 'get',
    })
}
