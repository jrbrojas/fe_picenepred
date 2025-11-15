import { CategoriaResponse } from '@/views/dimse/types'
import ApiServiceDimse from './ApiServiceDimse'
import { MonitoreoResponse } from './types/getmonitoreo';
import { SeguimientoResponse } from './types/getseguimiento';
import { SupervisionResponse } from './types/getsupervision';
import { EvaluacionResponse } from './types/getevaluacion';
import { DirectorioResponse } from './types/getdirectorio';

export async function apiExportarExcelDeMonitoreos(ids: number[]) {
    const params = ids.reduce((acc, item) => {
        acc += `monitoreo[]=${item}&`;
        return acc;
    }, "")
    return ApiServiceDimse.fetchDataWithAxios<MonitoreoResponse[]>({
        url: `/monitoreo/exportar-excel?${params}`,
        method: 'get',
        responseType: 'blob',
    })
}

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
        url: `/monitoreo/tabla?categoria=${categoria}`,
        method: 'get',
    })
}
export async function apiGetSeguimiento(categoria: string) {
    return ApiServiceDimse.fetchDataWithAxios<SeguimientoResponse[]>({
        url: `/seguimiento/tabla?categoria=${categoria}`,
        method: 'get',
    })
}
export async function apiGetSupervision(categoria: string) {
    return ApiServiceDimse.fetchDataWithAxios<SupervisionResponse[]>({
        url: `/supervision/tabla?categoria=${categoria}`,
        method: 'get',
    })
}
export async function apiGetEvaluacion(categoria: string) {
    return ApiServiceDimse.fetchDataWithAxios<EvaluacionResponse[]>({
        url: `/evaluacion/resumen-categoria?categoria=${categoria}`,
        method: 'get',
    })
}
export async function apiGetCategorias() {
    return ApiServiceDimse.fetchDataWithAxios<CategoriaResponse[]>({
        url: '/categorias',
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
