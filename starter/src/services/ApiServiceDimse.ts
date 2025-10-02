import type { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import AxiosBaseDimse from './axios/AxiosBaseDimse'

const ApiServiceDimse = {
    fetchDataWithAxios<Response = unknown, Request = Record<string, unknown>>(
        param: AxiosRequestConfig<Request>,
    ) {
        return new Promise<Response>((resolve, reject) => {
            AxiosBaseDimse(param)
                .then((response: AxiosResponse<Response>) => {
                    resolve(response.data)
                })
                .catch((errors: AxiosError) => {
                    reject(errors)
                })
        })
    },
}

export default ApiServiceDimse
