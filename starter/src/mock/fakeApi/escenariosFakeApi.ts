/* eslint-disable @typescript-eslint/no-explicit-any */
import wildCardSearch from '@/utils/wildCardSearch'
import sortBy, { Primer } from '@/utils/sortBy'
import paginate from '@/utils/paginate'
import { mock } from '../MockAdapter'
import { escenarioDetailData } from '../data/escenariosData'

mock.onGet(`/api/escenarios`).reply((config) => {
    const { pageIndex, pageSize, sort, query } = config.params

    const { order, key } = sort

    const escenarios = escenarioDetailData as any[]

    const sanitizeEscenarios = escenarios.filter((elm) => typeof elm !== 'function')
    let data = sanitizeEscenarios
    let total = escenarios.length

    if (key && order) {
        if (key !== 'totalSpending') {
            data.sort(
                sortBy(key, order === 'desc', (a) =>
                    (a as string).toUpperCase(),
                ),
            )
        } else {
            data.sort(sortBy(key, order === 'desc', parseInt as Primer))
        }
    }

    if (query) {
        data = wildCardSearch(data, query)
        total = data.length
    }

    data = paginate(data, pageSize, pageIndex)

    const responseData = {
        list: data,
        total: total,
    }

    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve([200, responseData])
        }, 500)
    })
})

mock.onGet(new RegExp(`/api/escenarios/*`)).reply(function (config) {
    const id = config.url?.split('/')[2]

    const escenario = escenarioDetailData.find((escenario) => escenario.id === id)

    if (!escenario) {
        return [404, {}]
    }

    return [200, escenario]
})
