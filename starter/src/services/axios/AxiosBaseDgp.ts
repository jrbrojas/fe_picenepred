import axios from 'axios'
import AxiosResponseIntrceptorErrorCallback from './AxiosResponseIntrceptorErrorCallback'
import AxiosRequestIntrceptorConfigCallback from './AxiosRequestIntrceptorConfigCallback'
import appConfig from '@/configs/app.config'
import type { AxiosError } from 'axios'

const AxiosBaseDgp = axios.create({
    timeout: 60000,
    baseURL: appConfig.apiPrefixDGP,
})

AxiosBaseDgp.interceptors.request.use(
    (config) => {
        return AxiosRequestIntrceptorConfigCallback(config)
    },
    (error) => {
        return Promise.reject(error)
    },
)

AxiosBaseDgp.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        AxiosResponseIntrceptorErrorCallback(error)
        return Promise.reject(error)
    },
)

export default AxiosBaseDgp
