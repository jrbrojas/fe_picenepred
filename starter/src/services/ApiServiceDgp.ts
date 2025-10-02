import type { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import AxiosBaseDgp from './axios/AxiosBaseDgp'

const ApiServiceDgp = {
    fetchDataWithAxios<Response = unknown, Request = Record<string, unknown>>(
        param: AxiosRequestConfig<Request>,
    ) {
        return new Promise<Response>((resolve, reject) => {
            AxiosBaseDgp(param)
                .then((response: AxiosResponse<Response>) => {
                    resolve(response.data)
                })
                .catch((errors: AxiosError) => {
                    reject(errors)
                })
        })
    },
}

export default ApiServiceDgp
