import ApiService from './ApiService'
import endpointConfig from './endpoint.config'
import { MonitoreoResponse } from './types/getmonitoreo'

export async function apiGetMonitoreo() {
    return ApiService.fetchDataWithAxios<MonitoreoResponse[]>({
        url: endpointConfig.monitoreo,
        method: 'get',
    })
}
