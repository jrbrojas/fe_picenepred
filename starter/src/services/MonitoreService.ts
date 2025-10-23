import { CategoriaResponse, MonitoreoResponse, SupervicionResponse } from '@/views/dimse/types'
import ApiServiceDimse from './ApiServiceDimse'
import { DirectorioResponse } from '@/views/dimse/responses/directorio/types';

export async function apiExportarExcelDeEntidades(ids: number[]) {
    const params = ids.reduce((acc, item) => {
        acc += `entidad[]=${item}&`;
        return acc;
    }, "")
    return ApiServiceDimse.fetchDataWithAxios<MonitoreoResponse[]>({
        url: `/directorio/exportar-excel?${params}`,
        method: 'get',
        responseType: 'blob',
    })
}

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

export async function apiGetDirectorio(distrito: string, text: string = "", entidadId: string = ""): Promise<DirectorioResponse[]> {
    if (distrito.trim()) {
        return ApiServiceDimse.fetchDataWithAxios<DirectorioResponse[]>({
            url: `/directorio?distrito=${distrito}`,
            method: 'get',
        })
    }
    if (text.trim()) {
        return ApiServiceDimse.fetchDataWithAxios<DirectorioResponse[]>({
            url: `/directorio?q=${text}`,
            method: 'get',
        })
    }
    if (entidadId.trim()) {
        return ApiServiceDimse.fetchDataWithAxios<DirectorioResponse[]>({
            url: `/directorio?entidad=${entidadId}`,
            method: 'get',
        })
    }
    return ApiServiceDimse.fetchDataWithAxios<DirectorioResponse[]>({
        url: `/directorio`,
        method: 'get',
    })
}
