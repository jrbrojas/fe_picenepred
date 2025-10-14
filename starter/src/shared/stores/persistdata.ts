import { create } from 'zustand'

export type PersistDataResponse = Object | Object[]
interface PersistDataStore {
    data: {
        [key: string]: PersistDataResponse
    }
    fetching: { [key: string]: boolean }
    fetchData(key: string, request: any): Promise<void>
}

export const usePersistData = create<PersistDataStore>((set, get) => ({
    data: {},
    fetching: {},
    fetchData: async (key, request) => {
        const fetching = get().fetching
        const data = get().data

        if (fetching[key] || key in data) return;

        set({ fetching: { ...fetching, [key]: true } })

        try {
            const dataResponse = await request()

            // guarda el response sin eliminar lo demás
            set(state => ({
                data: {
                    ...state.data,
                    [key]: dataResponse,
                }
            }))

            return dataResponse
        } catch (err) {
            console.error('Error al cargar datos', err)
        } finally {
            set({ fetching: { ...get().fetching, [key]: false } })
        }
    }
}))

