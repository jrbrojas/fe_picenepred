import { apiGetUsuariosList } from '@/services/UsuariosService'
import useSWR from 'swr'
import type { GetUsuariosListResponse } from '../types'
import type { TableQueries } from '@/@types/common'
import { useUsuarioListStore } from '../store/usuarioStore'

export default function useUsuarioList() {
    const {
        tableData,
        filterData,
        setTableData,
        selectedUsuario,
        setSelectedUsuario,
        setSelectAllUsuario,
        setFilterData,
    } = useUsuarioListStore((state) => state)

    const { data, error, isLoading, mutate } = useSWR(
        ['/usuarios', { ...tableData, ...filterData }],
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ([_, params]) =>
            apiGetUsuariosList<GetUsuariosListResponse, TableQueries>(params),
        {
            revalidateOnFocus: false,
        },
    )
    
    const usuarioList = data?.list || []        
    const usuarioListTotal = data?.total || 0
    
    return {
        usuarioList,
        usuarioListTotal,
        error,
        isLoading,
        tableData,
        filterData,
        mutate,
        setTableData,
        selectedUsuario,
        setSelectedUsuario,
        setSelectAllUsuario,
        setFilterData,
    }
}
