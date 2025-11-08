import { GroupPlantilla, PlantillaGroupItem } from '@/views/dgp/types'
import ApiServiceDgp from './ApiServiceDgp'

export async function apiGetPlantillas<T>(url : string ) {
    return ApiServiceDgp.fetchDataWithAxios<T>({
        url,
        method: 'get',
    })
}

export async function apiPrintEscenario<T>(escenarioId: number, data: { plantillasAList: GroupPlantilla }) {
    return ApiServiceDgp.fetchDataWithAxios<T>({
        url: `/escenarios/${escenarioId}/download`,
        method: 'post',
        data,
        responseType: 'blob'
    })
}