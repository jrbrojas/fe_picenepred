import { NavigationTree } from '@/@types/navigation'
import { NAV_ITEM_TYPE_COLLAPSE, NAV_ITEM_TYPE_ITEM } from '@/constants/navigation.constant'
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
                    path: 'https://dimse.cenepred.gob.pe/encuestas/144291',
                    title: 'Enagerd 2025',
                    translateKey: 'nav.monitoreo.monitoreo.enagerd2025',
                    icon: '',
                    type: NAV_ITEM_TYPE_ITEM,
                    isExternalLink: true,
                    authority: [],
                    subMenu: [],
                },
                {
                    key: 'enagerd.encuestas.formEnagerd2025',
                    path: 'https://dimse.cenepred.gob.pe/simse/cenepred/docs/FORMULARIO_ENAGERD_2025.pdf',
                    title: 'Form Enagerd 2025',
                    translateKey: 'nav.monitoreo.monitoreo.formEnagerd2025',
                    icon: '',
                    type: NAV_ITEM_TYPE_ITEM,
                    isExternalLink: true,
                    authority: [],
                    subMenu: [],
                },
                {
                    key: 'enagerd.encuestas.solicitudContrasena',
                    path: 'https://forms.gle/9Wb6ij284nHG48v87',
                    title: 'Solicitud contraseña',
                    translateKey: 'nav.monitoreo.monitoreo.solicitudContrasena',
                    icon: '',
                    type: NAV_ITEM_TYPE_ITEM,
                    isExternalLink: true,
                    authority: [],
                    subMenu: [],
                },
                {
                    key: 'enagerd.encuestas.programaTalleres',
                    path: 'https://dimse.cenepred.gob.pe/simse/cenepred/docs/ENAGERD_2025_ANEXO_3_TALLERES.pdf',
                    title: 'Programa de talleres',
                    translateKey: 'nav.monitoreo.monitoreo.programaTalleres',
                    icon: '',
                    type: NAV_ITEM_TYPE_ITEM,
                    isExternalLink: true,
                    authority: [],
                    subMenu: [],
                },
                {
                    key: 'enagerd.encuestas.especialistasResponsables',
                    path: 'https://dimse.cenepred.gob.pe/simse/cenepred/docs/ENAGERD_2025_ANEXO_4_TERRITORIOS.pdf',
                    title: 'Especialistas responsables',
                    translateKey: 'nav.monitoreo.monitoreo.especialistasResponsables',
                    icon: '',
                    type: NAV_ITEM_TYPE_ITEM,
                    isExternalLink: true,
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
