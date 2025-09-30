import { NavigationTree } from '@/@types/navigation'
import {
    NAV_ITEM_TYPE_TITLE,
    NAV_ITEM_TYPE_ITEM,
    NAV_ITEM_TYPE_COLLAPSE,
} from '@/constants/navigation.constant'
import reportesEjecucion from './reportes-ejecucion'
import visoresGeo from './visores-geo'

const navigationConfig: NavigationTree = {
    key: 'enagerd',
    path: '',
    title: 'Enagerd',
    translateKey: 'nav.monitoreo',
    icon: '',
    type: NAV_ITEM_TYPE_COLLAPSE,
    authority: [],
    subMenu: [
        {
            key: 'monitoreo.monitoreo',
            path: '/monitoreo/monitoreo',
            title: 'Encuestas',
            translateKey: 'nav.monitoreo.monitoreo',
            icon: '',
            type: NAV_ITEM_TYPE_COLLAPSE,
            authority: [],
            subMenu: [
                {
                    key: 'monitoreo.monitoreo',
                    path: '/monitoreo/monitoreo',
                    title: 'Enagerd 2025',
                    translateKey: 'nav.monitoreo.monitoreo',
                    icon: '',
                    type: NAV_ITEM_TYPE_COLLAPSE,
                    authority: [],
                    subMenu: [],
                },
                {
                    key: 'monitoreo.monitoreo',
                    path: '/monitoreo/monitoreo',
                    title: 'Form Enagerd 2025',
                    translateKey: 'nav.monitoreo.monitoreo',
                    icon: '',
                    type: NAV_ITEM_TYPE_COLLAPSE,
                    authority: [],
                    subMenu: [],
                },
                {
                    key: 'monitoreo.monitoreo',
                    path: '/monitoreo/monitoreo',
                    title: 'Solicitud contraseña',
                    translateKey: 'nav.monitoreo.monitoreo',
                    icon: '',
                    type: NAV_ITEM_TYPE_COLLAPSE,
                    authority: [],
                    subMenu: [],
                },
                {
                    key: 'monitoreo.monitoreo',
                    path: '/monitoreo/monitoreo',
                    title: 'Programa de talleres',
                    translateKey: 'nav.monitoreo.monitoreo',
                    icon: '',
                    type: NAV_ITEM_TYPE_COLLAPSE,
                    authority: [],
                    subMenu: [],
                },
                {
                    key: 'monitoreo.monitoreo',
                    path: '/monitoreo/monitoreo',
                    title: 'Especialistasa responsables',
                    translateKey: 'nav.monitoreo.monitoreo',
                    icon: '',
                    type: NAV_ITEM_TYPE_COLLAPSE,
                    authority: [],
                    subMenu: [],
                },
            ],
        },
        reportesEjecucion,
        visoresGeo,
    ]
}
export default navigationConfig
