import useSWR from 'swr'
import type { TableQueries } from '@/@types/common'
import { apiGetPlantillas } from '@/services/ModeloDgpService'
import { GetPlantillasResponse } from '../types'

export default function usePlantilla(formulario: string) {

    const { data, error, isLoading, mutate } = useSWR(
        formulario ? [`/escenarios/show/${formulario}/pi`] : null,
        ([url]) => apiGetPlantillas<GetPlantillasResponse>(url),
        {
            revalidateOnFocus: false,
        },
    )


    return {
        escenario: data?.escenario || {},
        data: data?.plantillas || {},
        error,
        isLoading,
        mutate,
    }
}
