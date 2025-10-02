import { DASHBOARDS_PREFIX_PATH } from '@/constants/route.constant'
import {
    NAV_ITEM_TYPE_TITLE,
    NAV_ITEM_TYPE_ITEM,
    NAV_ITEM_TYPE_COLLAPSE,
} from '@/constants/navigation.constant'
import { ADMIN, USER } from '@/constants/roles.constant'
import type { NavigationTree } from '@/@types/navigation'
import enagerd from './enagerd'
import { useEffect, useState } from 'react'

export const panelNavigationFull: NavigationTree[] = [
    {
        key: 'dashboard',
        path: '/dashboard',
        title: 'Inicio',
        translateKey: 'inicio',
        icon: 'dashboard',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
    },
    {
        key: 'dgp',
        path: '',
        title: 'DGP',
        translateKey: 'nav.gestionProcesos',
        icon: 'file',
        type: NAV_ITEM_TYPE_COLLAPSE,
        authority: [],
        subMenu: [
            {
                key: 'gestionProcesos.lluviasAvisoMeteorologico',
                path: '/gestion-procesos/lluviasAvisoMeteorologico',
                title: 'LAM',
                tooltip: 'Lluvias Aviso Meteorológico',
                translateKey: 'nav.gestionProcesos.lluviasAvisoMeteorologico',
                icon: '',
                type: NAV_ITEM_TYPE_COLLAPSE,
                authority: [],
                subMenu: [
                    {
                        key: 'gestionProcesos.lluviasAvisoMeteorologico.estatico',
                        path: '/gestion-procesos/lluviasAvisoMeteorologico/estatico',
                        title: 'Modelo Estático',
                        translateKey: 'nav.gestionProcesos.lluviasAvisoMeteorologico.estatico',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [],
                        subMenu: [],
                    },
                    {
                        key: 'gestionProcesos.lluviasAvisoMeteorologico.dinamico',
                        path: '/gestion-procesos/lluviasAvisoMeteorologico/dinamico',
                        title: 'Modelo Dinamico',
                        translateKey: 'nav.gestionProcesos.lluviasAvisoMeteorologico.dinamico',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [],
                        subMenu: [],
                    }
                ],
            },
            {
                key: 'gestionProcesos.lluviasAvisoTrimestral',
                path: '/gestion-procesos/lluviasAvisoTrimestral',
                title: 'LAT',
                tooltip: 'Lluvias Aviso Trimestral',
                translateKey: 'nav.gestionProcesos.lluviasAvisoTrimestral',
                icon: '',
                type: NAV_ITEM_TYPE_COLLAPSE,
                authority: [],
                subMenu: [
                    {
                        key: 'gestionProcesos.lluviasAvisoTrimestral.estatico',
                        path: '/gestion-procesos/lluviasAvisoTrimestral/estatico',
                        title: 'Modelo Estático',
                        translateKey: 'nav.gestionProcesos.lluviasAvisoTrimestral.estatico',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [],
                        subMenu: [],

                    },
                    {
                        key: 'gestionProcesos.lluviasAvisoTrimestral.dinamico',
                        path: '/gestion-procesos/lluviasAvisoTrimestral/dinamico',
                        title: 'Modelo Dinámico',
                        translateKey: 'nav.gestionProcesos.lluviasAvisoTrimestral.dinamico',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [],
                        subMenu: [],

                    }
                ],
            },
            {
                key: 'gestionProcesos.lluviasInformacionClimatica',
                path: '/gestion-procesos/lluviasInformacionClimatica',
                title: 'LIC',
                tooltip: 'Lluvias Información Climática',
                translateKey: 'nav.gestionProcesos.lluviasInformacionClimatica',
                icon: '',
                type: NAV_ITEM_TYPE_COLLAPSE,
                authority: [],
                subMenu: [
                    {
                        key: 'gestionProcesos.lluviasInformacionClimatica.estatico',
                        path: '/gestion-procesos/lluviasInformacionClimatica/estatico',
                        title: 'Modelo Estático',
                        translateKey: 'nav.gestionProcesos.lluviasInformacionClimatica.estatico',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [],
                        subMenu: [],
                    },
                    {
                        key: 'gestionProcesos.lluviasInformacionClimatica.dinamico',
                        path: '/gestion-procesos/lluviasInformacionClimatica/dinamico',
                        title: 'Modelo Dinámico',
                        translateKey: 'nav.gestionProcesos.lluviasInformacionClimatica.dinamico',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [],
                        subMenu: [],
                    }
                ],
            },
            {
                key: 'gestionProcesos.bajasTempAvisoMeteorologico',
                path: '/gestion-procesos/bajasTempAvisoMeteorologico',
                title: 'BTAM',
                tooltip: 'Bajas Temp Aviso Meteorológico',
                translateKey: 'nav.gestionProcesos.bajasTempAvisoMeteorologico',
                icon: '',
                type: NAV_ITEM_TYPE_COLLAPSE,
                authority: [],
                subMenu: [
                    {
                        key: 'gestionProcesos.bajasTempAvisoMeteorologico.estatico',
                        path: '/gestion-procesos/bajasTempAvisoMeteorologico/estatico',
                        title: 'Modelo Estático',
                        translateKey: 'nav.gestionProcesos.bajasTempAvisoMeteorologico.estatico',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [],
                        subMenu: [],
                    },
                    {
                        key: 'gestionProcesos.bajasTempAvisoMeteorologico.dinamico',
                        path: '/gestion-procesos/bajasTempAvisoMeteorologico/dinamico',
                        title: 'Modelo Dinámico',
                        translateKey: 'nav.gestionProcesos.bajasTempAvisoMeteorologico.dinamico',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [],
                        subMenu: [],
                    }
                ],
            },
            {
                key: 'gestionProcesos.bajasTempAvisoTrimestral',
                path: '/gestion-procesos/bajasTempAvisoTrimestral',
                title: 'BTAT',
                tooltip: 'Bajas Temp Aviso Trimestral',
                translateKey: 'nav.gestionProcesos.bajasTempAvisoTrimestral',
                icon: '',
                type: NAV_ITEM_TYPE_COLLAPSE,
                authority: [],
                subMenu: [
                    {
                        key: 'gestionProcesos.bajasTempAvisoTrimestral.estatico',
                        path: '/gestion-procesos/bajasTempAvisoTrimestral/estatico',
                        title: 'Modelo Estático',
                        translateKey: 'nav.gestionProcesos.bajasTempAvisoTrimestral.estatico',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [],
                        subMenu: [],
                    },
                    {
                        key: 'gestionProcesos.bajasTempAvisoTrimestral.dinamico',
                        path: '/gestion-procesos/bajasTempAvisoTrimestral/dinamico',
                        title: 'Modelo Dinámico',
                        translateKey: 'nav.gestionProcesos.bajasTempAvisoTrimestral.dinamico',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [],
                        subMenu: [],
                    },

                ],
            },
            {
                key: 'gestionProcesos.bajasTempInformacionClimatica',
                path: '/gestion-procesos/bajasTempInformacionClimatica',
                title: 'BTIC',
                tooltip: 'Bajas Temp Información Climática',
                translateKey:
                    'nav.gestionProcesos.bajasTempInformacionClimatica',
                icon: '',
                type: NAV_ITEM_TYPE_COLLAPSE,
                authority: [],
                subMenu: [
                    {
                        key: 'gestionProcesos.bajasTempInformacionClimatica.estatico',
                        path: '/gestion-procesos/bajasTempInformacionClimatica/estatico',
                        title: 'Modelo Estático',
                        translateKey: 'nav.gestionProcesos.bajasTempInformacionClimatica.estatico',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [],
                        subMenu: [],
                    },
                    {
                        key: 'gestionProcesos.bajasTempInformacionClimatica.dinamico',
                        path: '/gestion-procesos/bajasTempInformacionClimatica/dinamico',
                        title: 'Modelo Dinámico',
                        translateKey: 'nav.gestionProcesos.bajasTempInformacionClimatica.dinamico',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [],
                        subMenu: [],
                    }
                ],
            },
            {
                key: 'gestionProcesos.incendiosForestalesNacional',
                path: '/gestion-procesos/incendiosForestalesNacional',
                title: 'IFN',
                tooltip: 'Incendios Forestales Nac',
                translateKey: 'nav.gestionProcesos.incendiosForestalesNacional',
                icon: '',
                type: NAV_ITEM_TYPE_COLLAPSE,
                authority: [],
                subMenu: [
                    {
                        key: 'gestionProcesos.incendiosForestalesNacional.estatico',
                        path: '/gestion-procesos/incendiosForestalesNacional/estatico',
                        title: 'Modelo Estático',
                        translateKey: 'nav.gestionProcesos.incendiosForestalesNacional.estatico',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [],
                        subMenu: [],
                    },
                    {
                        key: 'gestionProcesos.incendiosForestalesNacional.dinamico',
                        path: '/gestion-procesos/incendiosForestalesNacional/dinamico',
                        title: 'Modelo Dinámico',
                        translateKey: 'nav.gestionProcesos.incendiosForestalesNacional.dinamico',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [],
                        subMenu: [],
                    },

                ],
            },
            {
                key: 'gestionProcesos.incendiosForestalesRegional',
                path: '/gestion-procesos/incendiosForestalesRegional',
                title: 'IFR',
                tooltip: 'Incendios Forestales Reg',
                translateKey: 'nav.gestionProcesos.incendiosForestalesRegional',
                icon: '',
                type: NAV_ITEM_TYPE_COLLAPSE,
                authority: [],
                subMenu: [
                    {
                        key: 'gestionProcesos.incendiosForestalesRegional.estatico',
                        path: '/gestion-procesos/incendiosForestalesRegional/estatico',
                        title: 'Modelo Estático',
                        translateKey: 'nav.gestionProcesos.incendiosForestalesRegional.estatico',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [],
                        subMenu: [],
                    },
                    {
                        key: 'gestionProcesos.incendiosForestalesRegional.dinamico',
                        path: '/gestion-procesos/incendiosForestalesRegional/dinamico',
                        title: 'Modelo Dinámico',
                        translateKey: 'nav.gestionProcesos.incendiosForestalesRegional.dinamico',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [],
                        subMenu: [],
                    }
                ],
            },
            {
                key: 'gestionProcesos.sismosTsunamiNacional',
                path: '/gestion-procesos/sismosTsunamiNacional',
                title: 'STN',
                tooltip: 'Sismos Tsunami Nac',
                translateKey: 'nav.gestionProcesos.sismosTsunamiNacional',
                icon: '',
                type: NAV_ITEM_TYPE_COLLAPSE,
                authority: [],
                subMenu: [
                    {
                        key: 'gestionProcesos.sismosTsunamiNacional.estatico',
                        path: '/gestion-procesos/sismosTsunamiNacional/estatico',
                        title: 'Modelo Estático',
                        translateKey: 'nav.gestionProcesos.sismosTsunamiNacional.estatico',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [],
                        subMenu: [],
                    },
                    {
                        key: 'gestionProcesos.sismosTsunamiNacional.dinamico',
                        path: '/gestion-procesos/sismosTsunamiNacional/dinamico',
                        title: 'Modelo Dinámico',
                        translateKey: 'nav.gestionProcesos.sismosTsunamiNacional.dinamico',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [],
                        subMenu: [],
                    }
                ],
            },
            /*
            {
                key: 'gestionProcesos.sismosTsunamiOtrosAmbitos',
                path: '/gestion-procesos/sismosTsunamiOtrosAmbitos',
                title: 'Sismos Tsunami Otros Ámbitos',
                translateKey: 'nav.gestionProcesos.sismosTsunamiOtrosAmbitos',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
            {
                key: 'gestionProcesos.sequiasNacional',
                path: '/gestion-procesos/sequiasNacional',
                title: 'Sequías Nacional',
                translateKey: 'nav.gestionProcesos.sequiasNacional',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
            {
                key: 'gestionProcesos.sequiasDepartamental',
                path: '/gestion-procesos/sequiasDepartamental',
                title: 'Sequías Dep',
                translateKey: 'nav.gestionProcesos.sequiasDepartamental',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
            {
                key: 'gestionProcesos.volcanesNacional',
                path: '/gestion-procesos/volcanesNacional',
                title: 'Volcanes Nac',
                translateKey: 'nav.gestionProcesos.volcanesNacional',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
            */
        ],
    },
    {
        key: 'difat',
        path: '',
        title: 'DIFAT',
        translateKey: 'nav.dimse',
        icon: 'chart',
        type: NAV_ITEM_TYPE_COLLAPSE,
        authority: [],
        subMenu: [
            {
                key: 'fortalecimiento.resumenInstrumentoNivNac',
                path: '/fortalecimiento/resumenInstrumentoNivNac',
                title: 'INN',
                tooltip: 'Instrumentos a Nivel Nacional',
                translateKey: 'nav.fortalecimiento.resumenInstrumentoNivNac',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
            {
                key: 'fortalecimiento.fortCapYAmbitos',
                path: '/fortalecimiento/fortCapYAmbitos',
                title: 'PAA',
                tooltip: 'Programa Anual de Actividades',
                translateKey: 'nav.fortalecimiento.fortCapYAmbitos',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
            {
                key: 'fortalecimiento.concursoBuenasPracticas',
                path: '/fortalecimiento/concursoBuenasPracticas',
                title: 'FC (CB-CE)',
                tooltip: 'Fortalecimiento Capacidades (CB-CE)',
                translateKey: 'nav.fortalecimiento.concursoBuenasPracticas',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
            {
                key: 'fortalecimiento.fortCapCursosBasYEspec',
                path: '/fortalecimiento/fortCapCursosBasYEspec',
                title: 'PPRRD RA',
                tooltip: 'PPRRD por Regiones y Años',
                translateKey: 'nav.fortalecimiento.fortCapCursosBasYEspec',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
            {
                key: 'fortalecimiento.fasesDelPprdNacional',
                path: '/fortalecimiento/fasesDelPprdNacional',
                title: 'ERA',
                tooltip: 'Evaluadores de Riesgo Acreditados',
                translateKey: 'nav.fortalecimiento.fasesDelPprdNacional',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
            {
                key: 'fortalecimiento.otrasAsistenciasTecNacional',
                path: '/fortalecimiento/otrasAsistenciasTecNacional',
                title: 'PER',
                tooltip: 'Planes Estratégicos y Reconstrucción',
                translateKey: 'nav.fortalecimiento.otrasAsistenciasTecNacional',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
            {
                key: 'fortalecimiento.riesgoPorFenNaturales',
                path: '/fortalecimiento/riesgoPorFenNaturales',
                title: 'PEC - REP',
                tooltip: 'Plan Educación Comunitaria - REP',
                translateKey: 'nav.fortalecimiento.riesgoPorFenNaturales',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
            {
                key: 'fortalecimiento.evaluadoresDeRiesgoAcred',
                path: '/fortalecimiento/evaluadoresDeRiesgoAcred',
                title: 'ERR',
                tooltip: 'Evaluadores de Riesgo por Regiones Años',
                translateKey: 'nav.fortalecimiento.evaluadoresDeRiesgoAcred',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
            {
                key: 'fortalecimiento.pprdNivelNacional',
                path: '/fortalecimiento/pprdNivelNacional',
                title: 'PPRRD - EA',
                tooltip: 'PPRRD - Entidades Asistidas',
                translateKey: 'nav.fortalecimiento.pprdNivelNacional',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
            {
                key: 'fortalecimiento.resumenDptoAsistTecFortalec',
                path: '/fortalecimiento/resumenDptoAsistTecFortalec',
                title: 'ATFC RA',
                tooltip: 'ATFC por Regiones y Años',
                translateKey: 'nav.fortalecimiento.resumenDptoAsistTecFortalec',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
            /*
            {
                key: 'fortalecimiento.instrumentosEspecialistasNacional',
                path: '/fortalecimiento/instrumentosEspecialistasNacional',
                title: 'Concurso Buenas Prácticas',
                translateKey:
                    'nav.fortalecimiento.instrumentosEspecialistasNacional',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
            {
                key: 'fortalecimiento.sesionesEspecPprdNivelNac',
                path: '/fortalecimiento/sesionesEspecPprdNivelNac',
                title: 'Aula Virtual',
                translateKey: 'nav.fortalecimiento.sesionesEspecPprdNivelNac',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
            {
                key: 'fortalecimiento.entidadesAsistEspPprdNacional',
                path: '/fortalecimiento/entidadesAsistEspPprdNacional',
                title: 'Fases del PPRD Especialista',
                translateKey:
                    'nav.fortalecimiento.entidadesAsistEspPprdNacional',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
            */
        ],
    },
    {
        key: 'dimse',
        path: '',
        title: 'DIMSE',
        translateKey: 'nav.monitoreo',
        icon: 'monitor',
        type: NAV_ITEM_TYPE_COLLAPSE,
        authority: [],
        subMenu: [
            {
                key: 'monitoreo.monitoreo',
                path: '/monitoreo/monitoreo',
                title: 'Monitoreo',
                translateKey: 'nav.monitoreo.monitoreo',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
            {
                key: 'monitoreo.seguimiento',
                path: '/monitoreo/seguimiento',
                title: 'Seguimiento',
                translateKey: 'nav.monitoreo.seguimiento',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
            {
                key: 'monitoreo.supervision',
                path: '/monitoreo/supervision',
                title: 'Supervisión',
                translateKey: 'nav.monitoreo.supervision',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
            {
                key: 'monitoreo.evaluacion',
                path: '/monitoreo/evaluacion',
                title: 'Evaluación',
                translateKey: 'nav.monitoreo.evaluacion',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
            {
                key: 'monitoreo.directorioNacional',
                path: '/monitoreo/directorioNacional',
                title: 'Directorio Nacional',
                translateKey: 'nav.monitoreo.directorioNacional',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
            enagerd,
        ],
    },

]

function filterBySegment(nav: NavigationTree[], segment: string): NavigationTree[] {
    const prefix = `/${segment}`
    return nav
        .map(item => {
            const sub = item.subMenu ? filterBySegment(item.subMenu, segment) : []
            const matchesSelf = !!item.path && item.path.startsWith(prefix)
            if (matchesSelf || sub.length > 0) {
                return { ...item, subMenu: sub }
            }
            return null
        })
        .filter(Boolean) as NavigationTree[]
}

export function usePanelNavigation(storageKey = 'redirectTo') {
  const [items, setItems] = useState<NavigationTree[]>(() => {
    const segment = typeof window !== 'undefined' ? localStorage.getItem(storageKey) || '' : ''
    if (!segment) return panelNavigationFull
    const filtered = filterBySegment(panelNavigationFull, segment)
    return filtered.length ? filtered : panelNavigationFull
  })

  useEffect(() => {
    const recompute = () => {
      const segment = localStorage.getItem(storageKey) || ''
      if (!segment) return setItems(panelNavigationFull)
      const filtered = filterBySegment(panelNavigationFull, segment)
      setItems(filtered.length ? filtered : panelNavigationFull)
    }
    window.addEventListener('storage', recompute)
    window.addEventListener('redirect-segment-changed', recompute)
    return () => {
      window.removeEventListener('storage', recompute)
      window.removeEventListener('redirect-segment-changed', recompute)
    }
  }, [storageKey])

  return items
}