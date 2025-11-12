import ApiService from './ApiService'

export async function apiGetUsuariosList<T, U extends Record<string, unknown>>(params: U,) {
    return ApiService.fetchDataWithAxios<T>({
        url: '/usuarios',
        method: 'get',
        params,
    })
}

export async function apiGetUsuario<T, U extends Record<string, unknown>>({ id, ...params }: U) {
    return ApiService.fetchDataWithAxios<T>({
        url: `/usuarios/${id}`,
        method: 'get',
        params,
    })
}

export async function apiCreateUsuario<T, U extends Record<string, unknown>>(data: U,) {
    return ApiService.fetchDataWithAxios<T>({
        url: '/usuarios',
        method: 'post',
        data,
    })
}

export async function apiEditUsuario<T, U extends Record<string, unknown>>(id: string | number, data: U) {
    return ApiService.fetchDataWithAxios<T>({
        url: `/usuarios/${id}`,
        method: 'put',
        data,
    });
}
export async function apiDeleteUsuario<T>(id: number | string) {
    return ApiService.fetchDataWithAxios<T>({
        url: `/usuarios/${id}`,
        method: 'delete',
    })
}
