import { lazy } from 'react'
import { DASHBOARDS_PREFIX_PATH } from '@/constants/route.constant'
import { ADMIN, USER } from '@/constants/roles.constant'
import type { Routes } from '@/@types/routes'

const panelRoute: Routes = [
    {
        key: 'panel.dashboard',
        path: `${DASHBOARDS_PREFIX_PATH}`,
        component: lazy(() => import('@/views/CenepredDashboard')),
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'contained',
        },
    },

    // Rutas para Gestión de Procesos (DGP)
    {
        key: 'gestionProcesos.lluviasAvisoMeteorologico.estatico',
        path: '/gestion-procesos/lluviasAvisoMeteorologico/estatico',
        component: lazy(() => import('@/views/dgp/AvisoMeteorologico/Estatico')),
        authority: [],
    },
    {
        key: 'gestionProcesos.lluviasAvisoMeteorologico.dinamico',
        path: '/gestion-procesos/lluviasAvisoMeteorologico/dinamico',
        component: lazy(() => import('@/views/dgp/AvisoMeteorologico/Dinamico')),
        authority: [],
    },
    {
        key: 'gestionProcesos.lluviasAvisoTrimestral.estatico',
        path: '/gestion-procesos/lluviasAvisoTrimestral/estatico',
        component: lazy(() => import('@/views/dgp/AvisoTrimestral/Estatico')),
        authority: [],
    },
    {
        key: 'gestionProcesos.lluviasAvisoTrimestral.dinamico',
        path: '/gestion-procesos/lluviasAvisoTrimestral/dinamico',
        component: lazy(() => import('@/views/dgp/AvisoTrimestral/Dinamico')),
        authority: [],
    },
    {
        key: 'gestionProcesos.lluviasInformacionClimatica.estatico',
        path: '/gestion-procesos/lluviasInformacionClimatica/estatico',
        component: lazy(() => import('@/views/dgp/InformacionClimatica/Estatico')),
        authority: [],
    },
    {
        key: 'gestionProcesos.lluviasInformacionClimatica.dinamico',
        path: '/gestion-procesos/lluviasInformacionClimatica/dinamico',
        component: lazy(() => import('@/views/dgp/InformacionClimatica/Dinamico')),
        authority: [],
    },
    {
        key: 'gestionProcesos.bajasTempAvisoMeteorologico.estatico',
        path: '/gestion-procesos/bajasTempAvisoMeteorologico/estatico',
        component: lazy(() => import('@/views/dgp/BajasTempAvisoMeteorologico/Estatico')),
        authority: [],
    },
    {
        key: 'gestionProcesos.bajasTempAvisoMeteorologico.dinamico',
        path: '/gestion-procesos/bajasTempAvisoMeteorologico/dinamico',
        component: lazy(() => import('@/views/dgp/BajasTempAvisoMeteorologico/Dinamico')),
        authority: [],
    },
    {
        key: 'gestionProcesos.bajasTempAvisoTrimestral.estatico',
        path: '/gestion-procesos/bajasTempAvisoTrimestral/estatico',
        component: lazy(() => import('@/views/dgp/BajasTempAvisoTrimestral/Estatico')),
        authority: [],
    },
    {
        key: 'gestionProcesos.bajasTempAvisoTrimestral.dinamico',
        path: '/gestion-procesos/bajasTempAvisoTrimestral/dinamico',
        component: lazy(() => import('@/views/dgp/BajasTempAvisoTrimestral/Dinamico')),
        authority: [],
    },
    {
        key: 'gestionProcesos.bajasTempInformacionClimatica.estatico',
        path: '/gestion-procesos/bajasTempInformacionClimatica/estatico',
        component: lazy(() => import('@/views/dgp/BajasTempInformacionClimatica/Estatico')),
        authority: [],
    },
    {
        key: 'gestionProcesos.bajasTempInformacionClimatica.dinamico',
        path: '/gestion-procesos/bajasTempInformacionClimatica/dinamico',
        component: lazy(() => import('@/views/dgp/BajasTempInformacionClimatica/Dinamico')),
        authority: [],
    },
    {
        key: 'gestionProcesos.incendiosForestalesNacional.estatico',
        path: '/gestion-procesos/incendiosForestalesNacional/estatico',
        component: lazy(() => import('@/views/dgp/IncendiosForestalesNacionales/Estatico')),
        authority: [],
    },
    {
        key: 'gestionProcesos.incendiosForestalesNacional.dinamico',
        path: '/gestion-procesos/incendiosForestalesNacional/dinamico',
        component: lazy(() => import('@/views/dgp/IncendiosForestalesNacionales/Dinamico')),
        authority: [],
    },
    {
        key: 'gestionProcesos.incendiosForestalesRegional.estatico',
        path: '/gestion-procesos/incendiosForestalesRegional/estatico',
        component: lazy(() => import('@/views/dgp/IncendiosForestalesRegionales/Estatico')),
        authority: [],
    },
    {
        key: 'gestionProcesos.incendiosForestalesRegional.dinamico',
        path: '/gestion-procesos/incendiosForestalesRegional/dinamico',
        component: lazy(() => import('@/views/dgp/IncendiosForestalesRegionales/Dinamico')),
        authority: [],
    },
    {
        key: 'gestionProcesos.sismosTsunamiNacional.estatico',
        path: '/gestion-procesos/sismosTsunamiNacional/estatico',
        component: lazy(() => import('@/views/dgp/Otros')),
        authority: [],
    },
    {
        key: 'gestionProcesos.sismosTsunamiNacional.dinamico',
        path: '/gestion-procesos/sismosTsunamiNacional/dinamico',
        component: lazy(() => import('@/views/dgp/Otros')),
        authority: [],
    },
    {
        key: 'gestionProcesos.sismosTsunamiOtrosAmbitos.estatico',
        path: '/gestion-procesos/sismosTsunamiOtrosAmbitos/estatico',
        component: lazy(() => import('@/views/dgp/Otros')),
        authority: [],
    },
    {
        key: 'gestionProcesos.sismosTsunamiOtrosAmbitos.dinamico',
        path: '/gestion-procesos/sismosTsunamiOtrosAmbitos/dinamico',
        component: lazy(() => import('@/views/dgp/Otros')),
        authority: [],
    },
    // {
    //     key: 'gestionProcesos.sequiasNacional.estatico',
    //     path: '/gestion-procesos/sequiasNacional/estatico',
    //     component: lazy(() => import('@/views/dgp/Otros')),
    //     authority: [],
    // },
    // {
    //     key: 'gestionProcesos.sequiasNacional.dinamico',
    //     path: '/gestion-procesos/sequiasNacional/dinamico',
    //     component: lazy(() => import('@/views/dgp/Otros')),
    //     authority: [],
    // },
    // {
    //     key: 'gestionProcesos.sequiasDepartamental.estatico',
    //     path: '/gestion-procesos/sequiasDepartamental/estatico',
    //     component: lazy(() => import('@/views/dgp/Otros')),
    //     authority: [],
    // },
    // {
    //     key: 'gestionProcesos.sequiasDepartamental.dinamico',
    //     path: '/gestion-procesos/sequiasDepartamental/dinamico',
    //     component: lazy(() => import('@/views/dgp/Otros')),
    //     authority: [],
    // },
    // {
    //     key: 'gestionProcesos.volcanesNacional.estatico',
    //     path: '/gestion-procesos/volcanesNacional/estatico',
    //     component: lazy(() => import('@/views/dgp/Otros')),
    //     authority: [],
    // },
    // {
    //     key: 'gestionProcesos.volcanesNacional.dinamico',
    //     path: '/gestion-procesos/volcanesNacional/dinamico',
    //     component: lazy(() => import('@/views/dgp/Otros')),
    //     authority: [],
    // },


    // Rutas para Fortalecimiento (DIFAT)
    {
        key: 'fortalecimiento.capacitacion',
        path: '/fortalecimiento/capacitacion',
        component: lazy(() => import('@/views/difat/SingleMenuView')),
        authority: [],
    },
    {
        key: 'fortalecimiento.asistencia',
        path: '/fortalecimiento/asistencia',
        component: lazy(() => import('@/views/difat/SingleMenuView')),
        authority: [],
    },
    {
        key: 'fortalecimiento.resumenInstrumentoNivNac',
        path: '/fortalecimiento/resumenInstrumentoNivNac',
        component: lazy(() => import('@/views/difat/ResumenInstrumentoNivNac')),
        authority: [],
    },
    {
        key: 'fortalecimiento.resumenDptoAsistTecFortalec',
        path: '/fortalecimiento/iniciopi/atfc',
        component: lazy(
            () => import('@/views/difat/ResumenDptoAsistTecFortalec'),
        ),
        authority: [],
    },
    {
        key: 'fortalecimiento.resumenDptoAsistTecFortalec.entasi',
        path: '/fortalecimiento/entidadesasistidaspi',
        component: lazy(
            () => import('@/views/difat/PprdNivelNacionalEntasi'),
        ),
        authority: [],
    },
    {
        key: 'fortalecimiento.resumenDptoAsistTecFortalec.fasesPprd',
        path: '/fortalecimiento/fasespprdpi',
        component: lazy(
            () => import('@/views/difat/PprdNivelNacionalFasesPprd'),
        ),
        authority: [],
    },
    {
        key: 'fortalecimiento.fortCapCursosBasYEspec',
        path: '/fortalecimiento/pprrdrapi',
        component: lazy(
            () => import('@/views/difat/FortCapCursosBasYEspec'),
        ),
        authority: [],
    },
    {
        key: 'fortalecimiento.pprdNivelNacional',
        path: '/fortalecimiento/pprdNivelNacional',
        component: lazy(
            () => import('@/views/difat/PprdNivelNacional'),
        ),
        authority: [],
    },
    {
        key: 'fortalecimiento.evaluadoresDeRiesgoAcred',
        path: '/fortalecimiento/evarpi',
        component: lazy(
            () => import('@/views/difat/EvaluadoresDeRiesgoAcred'),
        ),
        authority: [],
    },
    {
        key: 'fortalecimiento.fortCapYAmbitos',
        path: '/fortalecimiento/paapi',
        component: lazy(() => import('@/views/difat/FortCapYAmbitos')),
        authority: [],
    },
    {
        key: 'fortalecimiento.riesgoPorFenNaturales',
        path: '/fortalecimiento/otrospi/pec',
        component: lazy(
            () => import('@/views/difat/RiesgoPorFenNaturales'),
        ),
        authority: [],
    },
    {
        key: 'fortalecimiento.riesgoPorFenNaturales.reaspob',
        path: '/fortalecimiento/otrospi/reaspob',
        component: lazy(
            () => import('@/views/difat/RiesgoPorFenNaturales'),
        ),
        authority: [],
    },
    {
        key: 'fortalecimiento.riesgoPorFenNaturales.actrepre',
        path: '/fortalecimiento/otrospi/actrepre',
        component: lazy(
            () => import('@/views/difat/RiesgoPorFenNaturales'),
        ),
        authority: [],
    },
    {
        key: 'fortalecimiento.instrumentos',
        path: '/fortalecimiento/instrumentos',
        component: lazy(
            () => import('@/views/difat/Instrumentos'),
        ),
        authority: [],
    },
    {
        key: "fortalecimiento.instrumento.pdc",
        path: '/fortalecimiento/planificacionpi/pdc',
        component: lazy(() => import('@/views/difat/Instrumentos')),
        authority: [],
    },
    {
        key: 'fortalecimiento.instrumento.pdrc',
        path: '/fortalecimiento/planificacionpi/pdrc',
        component: lazy(() => import('@/views/difat/Instrumentos')),
        authority: [],
    },
    {
        key: 'fortalecimiento.instrumento.pdlc',
        path: '/fortalecimiento/planificacionpi/pdlc',
        component: lazy(() => import('@/views/difat/Instrumentos')),
        authority: [],
    },
    {
        key: 'fortalecimiento.instrumento.poi',
        path: '/fortalecimiento/planificacionpi/poi',
        component: lazy(() => import('@/views/difat/Instrumentos')),
        authority: [],
    },
    {
        key: 'fortalecimiento.instrumento.pei',
        path: '/fortalecimiento/planificacionpi/pei',
        component: lazy(() => import('@/views/difat/Instrumentos')),
        authority: [],
    },
    {
        key: 'fortalecimiento.instrumento.rof',
        path: '/fortalecimiento/planificacionpi/rof',
        component: lazy(() => import('@/views/difat/Instrumentos')),
        authority: [],
    },
    {
        key: 'fortalecimiento.instrumento.pdt',
        path: '/fortalecimiento/planificacionpi/pdt',
        component: lazy(() => import('@/views/difat/Instrumentos')),
        authority: [],
    },
    {
        key: 'fortalecimiento.instrumento.eat',
        path: '/fortalecimiento/planificacionpi/eat',
        component: lazy(() => import('@/views/difat/Instrumentos')),
        authority: [],
    },
    {
        key: 'fortalecimiento.instrumento.pdu',
        path: '/fortalecimiento/planificacionpi/pdu',
        component: lazy(() => import('@/views/difat/Instrumentos')),
        authority: [],
    },
    {
        key: 'fortalecimiento.otrasAsistenciasTecNacional',
        path: '/fortalecimiento/otrospi',
        component: lazy(
            () => import('@/views/difat/OtrasAsistenciasTecNacional'),
        ),
        authority: [],
    },
    {
        key: 'fortalecimiento.concursoBuenasPracticas.cb',
        path: '/fortalecimiento/cursospi/cb',
        component: lazy(
            () => import('@/views/difat/ConcursoBuenasPracticas'),
        ),
        authority: [],
    },
    {
        key: 'fortalecimiento.concursoBuenasPracticas.ce',
        path: '/fortalecimiento/cursospi/ce',
        component: lazy(
            () => import('@/views/difat/ConcursoBuenasPracticas'),
        ),
        authority: [],
    },
    {
        key: 'fortalecimiento.fasesDelPprdNacional',
        path: '/fortalecimiento/evaluadorespi',
        component: lazy(
            () => import('@/views/difat/FasesDelPprdNacional'),
        ),
        authority: [],
    },
    {
        key: 'fortalecimiento.instrumentosEspecialistasNacional',
        path: '/fortalecimiento/instrumentosEspecialistasNacional',
        component: lazy(
            () =>
                import(
                    '@/views/difat/InstrumentosEspecialistasNacional'
                ),
        ),
        authority: [],
    },
    {
        key: 'fortalecimiento.entidadesAsistEspPprdNacional',
        path: '/fortalecimiento/entidadesAsistEspPprdNacional',
        component: lazy(
            () => import('@/views/difat/EntidadesAsistEspPprdNacional'),
        ),
        authority: [],
    },

    // Rutas para Monitoreo, Seguimiento y Evaluación (DIMSE)
    {
        key: 'monitoreo.directorioNacional',
        path: '/monitoreo/directorioNacional',
        component: lazy(() => import('@/views/dimse/DirectorioNacional')),
        authority: [],
    },
    {
        key: 'monitoreo.monitoreo',
        path: '/monitoreo/monitoreo',
        component: lazy(() => import('@/views/dimse/Monitoreo')),
        authority: [],
    },
    {
        key: 'monitoreo.seguimiento',
        path: '/monitoreo/seguimiento',
        component: lazy(() => import('@/views/dimse/Seguimiento')),
        authority: [],
    },
    {
        key: 'monitoreo.supervision',
        path: '/monitoreo/supervision',
        component: lazy(() => import('@/views/dimse/Supervision')),
        authority: [],
    },
    {
        key: 'monitoreo.evaluacion',
        path: '/monitoreo/evaluacion',
        component: lazy(() => import('@/views/dimse/Evaluacion')),
        authority: [],
    },
    {
        key: 'accessDenied',
        path: `/access-denied`,
        component: lazy(() => import('@/views/others/AccessDenied')),
        authority: [ADMIN, USER],
        meta: {
            pageBackgroundType: 'plain',
            pageContainerType: 'contained',
        },

    }
]

export default panelRoute
