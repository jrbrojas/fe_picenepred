import { apiGetUsuariosList } from '@/services/UsuariosService'
import useSWR from 'swr'
import type { GetRolesListResponse, GetUsuariosListResponse } from '../types'
import type { TableQueries } from '@/@types/common'
import { useUsuarioListStore } from '../store/usuarioStore'
import { useRolesStore } from '../store/roleStore'
import { apiGetRolesList } from '@/services/RolesService'

export default function useRolesList() {
    const {
        rolesData,          // Datos de roles
        setRolesData,       // Función para actualizar los roles
    } = useRolesStore((state) => state)  // Si usas algún store para los roles

    const { data, error, isLoading, mutate } = useSWR(
        '/roles',
        () => apiGetRolesList<GetRolesListResponse, {}>({}),  // Llamada a la API para obtener los roles
        {
            revalidateOnFocus: false,
        },
    )    
    
    const rolesList = data?.list || []  // Lista de roles obtenidos desde la API
    
    return {
        rolesList,
        error,
        isLoading,
        mutate,
        setRolesData,  // Función para modificar los datos de los roles si es necesario
    }
}