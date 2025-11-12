import ApiService from './ApiService'

export async function apiGetRolesList<T, U extends Record<string, unknown>>(params: U,) {
    return ApiService.fetchDataWithAxios<T>({
        url: '/roles',
        method: 'get',
        params,
    })
}
