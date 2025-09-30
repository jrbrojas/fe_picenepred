import { lazy } from 'react'
import authRoute from './authRoute'
import othersRoute from './othersRoute'
import type { Routes } from '@/@types/routes'

export const publicRoutes: Routes = [...authRoute]

export const protectedRoutes: Routes = [
    {
        key: 'home',
        path: '/home',
        component: lazy(() => import('@/views/CenepredDashboard')),
        authority: [],
    },
    // Rutas para Gestión de Procesos (DGP)
    {
        key: 'gestionProcesos.dashboard',
        path: '/gestion-procesos/dashboard',
        component: lazy(() => import('@/views/modules/DGPModule')),
        authority: [],
    },
    {
        key: 'gestionProcesos.lluviasAvisoTrimestral',
        path: '/gestion-procesos/lluviasAvisoTrimestral',
        component: lazy(() => import('@/views/modules/dgp/Lluvias')),
        authority: [],
    },
    {
        key: 'gestionProcesos.lluviasAvisoMeteorologico.estatico',
        path: '/gestion-procesos/lluviasAvisoMeteorologico/estatico',
        component: lazy(() => import('@/views/modules/dgp/Lluvias')),
        authority: [],
    },
    {
        key: 'gestionProcesos.lluviasAvisoMeteorologico.dinamico',
        path: '/gestion-procesos/lluviasAvisoMeteorologico/dinamico',
        component: lazy(() => import('@/views/modules/dgp/Lluvias')),
        authority: [],
    },
    {
        key: 'gestionProcesos.lluviasInformacionClimatica.estatico',
        path: '/gestion-procesos/lluviasInformacionClimatica/estatico',
        component: lazy(() => import('@/views/modules/dgp/Lluvias')),
        authority: [],
    },
    {
        key: 'gestionProcesos.lluviasInformacionClimatica.dinamico',
        path: '/gestion-procesos/lluviasInformacionClimatica/dinamico',
        component: lazy(() => import('@/views/modules/dgp/Lluvias')),
        authority: [],
    },
    {
        key: 'gestionProcesos.bajasTempAvisoMeteorologico.estatico',
        path: '/gestion-procesos/bajasTempAvisoMeteorologico/estatico',
        component: lazy(() => import('@/views/modules/dgp/TempBaja')),
        authority: [],
    },
    {
        key: 'gestionProcesos.bajasTempAvisoMeteorologico.dinamico',
        path: '/gestion-procesos/bajasTempAvisoMeteorologico/dinamico',
        component: lazy(() => import('@/views/modules/dgp/TempBaja')),
        authority: [],
    },
    {
        key: 'gestionProcesos.bajasTempAvisoTrimestral.estatico',
        path: '/gestion-procesos/bajasTempAvisoTrimestral/estatico',
        component: lazy(() => import('@/views/modules/dgp/TempBaja')),
        authority: [],
    },
    {
        key: 'gestionProcesos.bajasTempAvisoTrimestral.dinamico',
        path: '/gestion-procesos/bajasTempAvisoTrimestral/dinamico',
        component: lazy(() => import('@/views/modules/dgp/TempBaja')),
        authority: [],
    },
    {
        key: 'gestionProcesos.bajasTempInformacionClimatica.estatico',
        path: '/gestion-procesos/bajasTempInformacionClimatica/estatico',
        component: lazy(() => import('@/views/modules/dgp/TempBaja')),
        authority: [],
    },
    {
        key: 'gestionProcesos.bajasTempInformacionClimatica.dinamico',
        path: '/gestion-procesos/bajasTempInformacionClimatica/dinamico',
        component: lazy(() => import('@/views/modules/dgp/TempBaja')),
        authority: [],
    },
    {
        key: 'gestionProcesos.incendiosForestalesNacional.estatico',
        path: '/gestion-procesos/incendiosForestalesNacional/estatico',
        component: lazy(() => import('@/views/modules/dgp/Incendio')),
        authority: [],
    },
    {
        key: 'gestionProcesos.incendiosForestalesNacional.dinamico',
        path: '/gestion-procesos/incendiosForestalesNacional/dinamico',
        component: lazy(() => import('@/views/modules/dgp/Incendio')),
        authority: [],
    },
    {
        key: 'gestionProcesos.incendiosForestalesRegional.estatico',
        path: '/gestion-procesos/incendiosForestalesRegional/estatico',
        component: lazy(() => import('@/views/modules/dgp/Incendio')),
        authority: [],
    },
    {
        key: 'gestionProcesos.incendiosForestalesRegional.dinamico',
        path: '/gestion-procesos/incendiosForestalesRegional/dinamico',
        component: lazy(() => import('@/views/modules/dgp/Incendio')),
        authority: [],
    },
    {
        key: 'gestionProcesos.sismosTsunamiNacional.estatico',
        path: '/gestion-procesos/sismosTsunamiNacional/estatico',
        component: lazy(() => import('@/views/modules/dgp/Otros')),
        authority: [],
    },
    {
        key: 'gestionProcesos.sismosTsunamiNacional.dinamico',
        path: '/gestion-procesos/sismosTsunamiNacional/dinamico',
        component: lazy(() => import('@/views/modules/dgp/Otros')),
        authority: [],
    },
    {
        key: 'gestionProcesos.sismosTsunamiOtrosAmbitos.estatico',
        path: '/gestion-procesos/sismosTsunamiOtrosAmbitos/estatico',
        component: lazy(() => import('@/views/modules/dgp/Otros')),
        authority: [],
    },
    {
        key: 'gestionProcesos.sismosTsunamiOtrosAmbitos.dinamico',
        path: '/gestion-procesos/sismosTsunamiOtrosAmbitos/dinamico',
        component: lazy(() => import('@/views/modules/dgp/Otros')),
        authority: [],
    },
    {
        key: 'gestionProcesos.sequiasNacional.estatico',
        path: '/gestion-procesos/sequiasNacional/estatico',
        component: lazy(() => import('@/views/modules/dgp/Otros')),
        authority: [],
    },
    {
        key: 'gestionProcesos.sequiasNacional.dinamico',
        path: '/gestion-procesos/sequiasNacional/dinamico',
        component: lazy(() => import('@/views/modules/dgp/Otros')),
        authority: [],
    },
    {
        key: 'gestionProcesos.sequiasDepartamental.estatico',
        path: '/gestion-procesos/sequiasDepartamental/estatico',
        component: lazy(() => import('@/views/modules/dgp/Otros')),
        authority: [],
    },
    {
        key: 'gestionProcesos.sequiasDepartamental.dinamico',
        path: '/gestion-procesos/sequiasDepartamental/dinamico',
        component: lazy(() => import('@/views/modules/dgp/Otros')),
        authority: [],
    },
    {
        key: 'gestionProcesos.volcanesNacional.estatico',
        path: '/gestion-procesos/volcanesNacional/estatico',
        component: lazy(() => import('@/views/modules/dgp/Otros')),
        authority: [],
    },
    {
        key: 'gestionProcesos.volcanesNacional.dinamico',
        path: '/gestion-procesos/volcanesNacional/dinamico',
        component: lazy(() => import('@/views/modules/dgp/Otros')),
        authority: [],
    },


    // Rutas para Fortalecimiento y Asistencia Técnica
    {
        key: 'fortalecimiento.capacitacion',
        path: '/fortalecimiento/capacitacion',
        component: lazy(() => import('@/views/modules/dimse/SingleMenuView')),
        authority: [],
    },
    {
        key: 'fortalecimiento.asistencia',
        path: '/fortalecimiento/asistencia',
        component: lazy(() => import('@/views/modules/dimse/SingleMenuView')),
        authority: [],
    },
    // Rutas para Fortalecimiento (DIFAT)
    {
        key: 'fortalecimiento.resumenInstrumentoNivNac',
        path: '/fortalecimiento/resumenInstrumentoNivNac',
        component: lazy(() => import('@/views/modules/dimse/ResumenInstrumentoNivNac')),
        authority: [],
    },
    {
        key: 'fortalecimiento.resumenDptoAsistTecFortalec',
        path: '/fortalecimiento/resumenDptoAsistTecFortalec',
        component: lazy(
            () => import('@/views/modules/dimse/ResumenDptoAsistTecFortalec'),
        ),
        authority: [],
    },
    {
        key: 'fortalecimiento.fortCapCursosBasYEspec',
        path: '/fortalecimiento/fortCapCursosBasYEspec',
        component: lazy(
            () => import('@/views/modules/dimse/FortCapCursosBasYEspec'),
        ),
        authority: [],
    },
    {
        key: 'fortalecimiento.pprdNivelNacional',
        path: '/fortalecimiento/pprdNivelNacional',
        component: lazy(
            () => import('@/views/modules/dimse/PprdNivelNacional'),
        ),
        authority: [],
    },
    {
        key: 'fortalecimiento.evaluadoresDeRiesgoAcred',
        path: '/fortalecimiento/evaluadoresDeRiesgoAcred',
        component: lazy(
            () => import('@/views/modules/dimse/EvaluadoresDeRiesgoAcred'),
        ),
        authority: [],
    },
    {
        key: 'fortalecimiento.fortCapYAmbitos',
        path: '/fortalecimiento/fortCapYAmbitos',
        component: lazy(() => import('@/views/modules/dimse/FortCapYAmbitos')),
        authority: [],
    },
    {
        key: 'fortalecimiento.riesgoPorFenNaturales',
        path: '/fortalecimiento/riesgoPorFenNaturales',
        component: lazy(
            () => import('@/views/modules/dimse/RiesgoPorFenNaturales'),
        ),
        authority: [],
    },
    {
        key: 'fortalecimiento.otrasAsistenciasTecNacional',
        path: '/fortalecimiento/otrasAsistenciasTecNacional',
        component: lazy(
            () => import('@/views/modules/dimse/OtrasAsistenciasTecNacional'),
        ),
        authority: [],
    },
    {
        key: 'fortalecimiento.concursoBuenasPracticas',
        path: '/fortalecimiento/concursoBuenasPracticas',
        component: lazy(
            () => import('@/views/modules/dimse/ConcursoBuenasPracticas'),
        ),
        authority: [],
    },
    {
        key: 'fortalecimiento.fasesDelPprdNacional',
        path: '/fortalecimiento/fasesDelPprdNacional',
        component: lazy(
            () => import('@/views/modules/dimse/FasesDelPprdNacional'),
        ),
        authority: [],
    },
    {
        key: 'fortalecimiento.instrumentosEspecialistasNacional',
        path: '/fortalecimiento/instrumentosEspecialistasNacional',
        component: lazy(
            () =>
                import(
                    '@/views/modules/dimse/InstrumentosEspecialistasNacional'
                ),
        ),
        authority: [],
    },
    {
        key: 'fortalecimiento.entidadesAsistEspPprdNacional',
        path: '/fortalecimiento/entidadesAsistEspPprdNacional',
        component: lazy(
            () => import('@/views/modules/dimse/EntidadesAsistEspPprdNacional'),
        ),
        authority: [],
    },
    // Rutas para Monitoreo, Seguimiento y Evaluación (DIMSE)
    {
        key: 'monitoreo.dashboard',
        path: '/monitoreo/dashboard',
        component: lazy(() => import('@/views/modules/DIMSEModule')),
        authority: [],
    },
    {
        key: 'monitoreo.directorioNacional',
        path: '/monitoreo/directorioNacional',
        component: lazy(() => import('@/views/modules/dimse/Monitoreo')),
        authority: [],
    },
    {
        key: 'monitoreo.monitoreo',
        path: '/monitoreo/monitoreo',
        component: lazy(() => import('@/views/modules/dimse/Monitoreo')),
        authority: [],
    },
    {
        key: 'monitoreo.seguimiento',
        path: '/monitoreo/seguimiento',
        component: lazy(() => import('@/views/modules/dimse/Monitoreo')),
        authority: [],
    },
    {
        key: 'monitoreo.supervision',
        path: '/monitoreo/supervision',
        component: lazy(() => import('@/views/modules/dimse/Monitoreo')),
        authority: [],
    },
    {
        key: 'monitoreo.evaluacion',
        path: '/monitoreo/evaluacion',
        component: lazy(() => import('@/views/modules/dimse/Monitoreo')),
        authority: [],
    },

    // Ruta de debug para probar el login
    {
        key: 'debug.login',
        path: '/debug/login',
        component: lazy(() => import('@/views/debug/LoginTest')),
        authority: [],
    },
    ...othersRoute,
]
