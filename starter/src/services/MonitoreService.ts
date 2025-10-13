import { CategoriaResponse, MonitoreoResponse, SupervicionResponse, DirectorioResponse } from '@/views/dimse/types'
import ApiServiceDimse from './ApiServiceDimse'

export async function apiGetMonitoreo(categoria: string) {
    return ApiServiceDimse.fetchDataWithAxios<MonitoreoResponse[]>({
        url: `/monitoreo?categoria=${categoria}`,
        method: 'get',
    })
}
export async function apiGetSeguimiento(categoria: string) {
    return ApiServiceDimse.fetchDataWithAxios<MonitoreoResponse[]>({
        url: `/seguimiento?categoria=${categoria}`,
        method: 'get',
    })
}
export async function apiGetSupervision(categoria: string) {
    return ApiServiceDimse.fetchDataWithAxios<SupervicionResponse[]>({
        url: `/supervision?categoria=${categoria}`,
        method: 'get',
    })
}
export async function apiGetEvaluacion(categoria: string) {
    return ApiServiceDimse.fetchDataWithAxios<MonitoreoResponse[]>({
        url: `/evaluacion/resumen-categoria?categoria=${categoria}`,
        method: 'get',
    })
}
export async function apiGetCategorias() {
    return ApiServiceDimse.fetchDataWithAxios<CategoriaResponse[]>({
        url: '/directorio/categorias',
        method: 'get',
    })
}

export async function apiGetDirectorio(categoria: string) {
    return ApiServiceDimse.fetchDataWithAxios<DirectorioResponse[]>({
        url: `/directorio?categoria=${categoria}`,
        method: 'get',
    })
}
