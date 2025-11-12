import { create } from 'zustand'
import type { TableQueries } from '@/@types/common'
import type { Usuario, Filter } from '../types'

export const initialTableData: TableQueries = {
    pageIndex: 1,
    pageSize: 10,
    query: '',
    sort: {
        order: '',
        key: '',
    },
}

export const initialFilterData = {
    // purchasedProducts: '',
    // purchaseChannel: [
    //     'Retail Stores',
    //     'Online Retailers',
    //     'Resellers',
    //     'Mobile Apps',
    //     'Direct Sales',
    // ],
}

export type UsuariosListState = {
    tableData: TableQueries
    filterData: Filter
    selectedUsuario: Partial<Usuario>[]
}

type UsuariosListAction = {
    setFilterData: (payload: Filter) => void
    setTableData: (payload: TableQueries) => void
    setSelectedUsuario: (checked: boolean, usuario: Usuario) => void
    setSelectAllUsuario: (usuario: Usuario[]) => void
}

const initialState: UsuariosListState = {
    tableData: initialTableData,
    filterData: initialFilterData,
    selectedUsuario: [],
}

export const useUsuarioListStore = create<
    UsuariosListState & UsuariosListAction
>((set) => ({
    ...initialState,
    setFilterData: (payload) => set(() => ({ filterData: payload })),
    setTableData: (payload) => set(() => ({ tableData: payload })),
    setSelectedUsuario: (checked, row) =>
        set((state) => {
            const prevData = state.selectedUsuario
            if (checked) {
                return { selectedUsuario: [...prevData, ...[row]] }
            } else {
                if (
                    prevData.some((prevUsuario) => row.id === prevUsuario.id)
                ) {
                    return {
                        selectedUsuario: prevData.filter(
                            (prevUsuario) => prevUsuario.id !== row.id,
                        ),
                    }
                }
                return { selectedUsuario: prevData }
            }
        }),
    setSelectAllUsuario: (row) => set(() => ({ selectedUsuario: row })),
}))
