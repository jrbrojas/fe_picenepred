import { NavigationTree } from '@/@types/navigation'
import {NAV_ITEM_TYPE_COLLAPSE} from '@/constants/navigation.constant'
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
            key: 'enagerd.encuestas',
            path: '/monitoreo/monitoreo',
            title: 'Encuestas',
            translateKey: 'nav.monitoreo.monitoreo',
            icon: '',
            type: NAV_ITEM_TYPE_COLLAPSE,
            authority: [],
            subMenu: [
                {
                    key: 'enagerd.encuestas.enagerd2025',
                    path: '/monitoreo/monitoreo',
                    title: 'Enagerd 2025',
                    translateKey: 'nav.monitoreo.monitoreo.enagerd2025',
                    icon: '',
                    type: NAV_ITEM_TYPE_COLLAPSE,
                    authority: [],
                    subMenu: [],
                },
                {
                    key: 'enagerd.encuestas.formEnagerd2025',
                    path: '/monitoreo/monitoreo',
                    title: 'Form Enagerd 2025',
                    translateKey: 'nav.monitoreo.monitoreo.formEnagerd2025',
                    icon: '',
                    type: NAV_ITEM_TYPE_COLLAPSE,
                    authority: [],
                    subMenu: [],
                },
                {
                    key: 'enagerd.encuestas.solicitudContrasena',
                    path: '/monitoreo/monitoreo',
                    title: 'Solicitud contraseña',
                    translateKey: 'nav.monitoreo.monitoreo.solicitudContrasena',
                    icon: '',
                    type: NAV_ITEM_TYPE_COLLAPSE,
                    authority: [],
                    subMenu: [],
                },
                {
                    key: 'enagerd.encuestas.programaTalleres',
                    path: '/monitoreo/monitoreo',
                    title: 'Programa de talleres',
                    translateKey: 'nav.monitoreo.monitoreo.programaTalleres',
                    icon: '',
                    type: NAV_ITEM_TYPE_COLLAPSE,
                    authority: [],
                    subMenu: [],
                },
                {
                    key: 'enagerd.encuestas.especialistasResponsables',
                    path: '/monitoreo/monitoreo',
                    title: 'Especialistas responsables',
                    translateKey: 'nav.monitoreo.monitoreo.especialistasResponsables',
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
