import { PlantillaGroupItem } from '@/views/dgp/types'
import ApiServiceDgp from './ApiServiceDgp'

export async function apiGetPlantillas<T>(url : string ) {
    return ApiServiceDgp.fetchDataWithAxios<T>({
        url,
        method: 'get',
    })
}

export async function apiDownloadPlantilla(escenarioId: number | string, data: PlantillaGroupItem[]) {
    const response = await ApiServiceDgp.fetchDataWithAxios<Blob, { data: PlantillaGroupItem[] }>({
        url: `/escenarios/${escenarioId}/plantilla/download`,
        method: 'post',
        data: { data }, // 👈 enviamos el array al backend
        responseType: 'blob', // 👈 muy importante
    })

    // Crear descarga del archivo
    const url = window.URL.createObjectURL(new Blob([response as unknown as Blob]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `plantilla_${escenarioId}.xlsx`)
    document.body.appendChild(link)
    link.click()
    link.remove()
}
