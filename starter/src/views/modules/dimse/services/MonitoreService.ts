import ApiService from './ApiService'
import endpointConfig from './endpoint.config'
import { CategoriaResponse } from './types/getcategorias'
import { MonitoreoResponse } from './types/getmonitoreo'

export async function apiGetMonitoreo(categoria: string) {
    return ApiService.fetchDataWithAxios<MonitoreoResponse[]>({
        url: endpointConfig.monitoreo + `?categoria=${categoria}`,
        method: 'get',
    })
}
export async function apiGetSeguimiento(categoria: string) {
    return ApiService.fetchDataWithAxios<MonitoreoResponse[]>({
        url: endpointConfig.seguimiento + `?categoria=${categoria}`,
        method: 'get',
    })
}
export async function apiGetSupervision(categoria: string) {
    return ApiService.fetchDataWithAxios<MonitoreoResponse[]>({
        url: endpointConfig.supervision + `?categoria=${categoria}`,
        method: 'get',
    })
}
export async function apiGetEvaluacion(categoria: string) {
    return ApiService.fetchDataWithAxios<MonitoreoResponse[]>({
        url: endpointConfig.evaluacion + `?categoria=${categoria}`,
        method: 'get',
    })
}
export async function apiGetCategorias() {
    return ApiService.fetchDataWithAxios<CategoriaResponse[]>({
        url: endpointConfig.categorias,
        method: 'get',
    })
}
