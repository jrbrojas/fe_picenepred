import { GroupPlantilla } from '@/views/plantillaFormulario/types'
import ApiService from './ApiService'
import { Escenario } from '@/views/escenarios/types'

export async function apiGetEscenariosList<T, U extends Record<string, unknown>>(params: U) {
    return ApiService.fetchDataWithAxios<T>({
        url: '/escenarios',
        method: 'get',
        params,
    })
}

export async function apiGetFormulariosList<T, U extends Record<string, unknown>>(params: U) {
    return ApiService.fetchDataWithAxios<T>({
        url: '/escenarios/formularios',
        method: 'get',
        params,
    })
}

export async function apiGetEscenario<T, U extends Record<string, unknown>>({id, ...params}: U) {
    return ApiService.fetchDataWithAxios<T>({
        url: `/escenarios/${id}`,
        method: 'get',
        params,
    })
}

export async function apiCreateEscenario<T>(data: FormData) {
    return ApiService.fetchDataWithAxios<T, FormData>({
        url: '/escenarios',
        method: 'post',
        data,
        // Axios se encargará de los headers 'Content-Type: multipart/form-data'
    })
}

export async function apiEditEscenario<T>(id: number | string, data: FormData) {
    data.append('_method', 'PUT');
    return ApiService.fetchDataWithAxios<T, FormData>({
        url: `/escenarios/${id}`,
        method: 'post',
        data,
        // Axios se encargará de los headers 'Content-Type: multipart/form-data'
    })
}

export async function apiDeleteEscenario<T>(id: number | string) {
    return ApiService.fetchDataWithAxios<T>({
        url: `/escenarios/${id}`,
        method: 'delete',
    })
}

export async function apiPrintEscenario<T>(escenarioId: number, data: { plantillasAList: GroupPlantilla }) {
    return ApiService.fetchDataWithAxios<T>({
        url: `/escenarios/${escenarioId}/plantilla/print`,
        method: 'post',
        data,
        responseType: 'blob'
    })
}

