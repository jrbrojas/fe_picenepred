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
        component: lazy(() => import('@/views/demo/SingleMenuView')),
        authority: [],
    },
    {
        key: 'gestionProcesos.lluviasAvisoMeteorologico',
        path: '/gestion-procesos/lluviasAvisoMeteorologico',
        component: lazy(() => import('@/views/demo/SingleMenuView')),
        authority: [],
    },
    {
        key: 'gestionProcesos.lluviasInformacionClimatica',
        path: '/gestion-procesos/lluviasInformacionClimatica',
        component: lazy(() => import('@/views/demo/SingleMenuView')),
        authority: [],
    },
    {
        key: 'gestionProcesos.bajasTempAvisoMeteorologico',
        path: '/gestion-procesos/bajasTempAvisoMeteorologico',
        component: lazy(() => import('@/views/demo/SingleMenuView')),
        authority: [],
    },
    {
        key: 'gestionProcesos.bajasTempAvisoTrimestral',
        path: '/gestion-procesos/bajasTempAvisoTrimestral',
        component: lazy(() => import('@/views/demo/SingleMenuView')),
        authority: [],
    },
    {
        key: 'gestionProcesos.bajasTempInformacionClimatica',
        path: '/gestion-procesos/bajasTempInformacionClimatica',
        component: lazy(() => import('@/views/demo/SingleMenuView')),
        authority: [],
    },
    {
        key: 'gestionProcesos.incendiosForestalesNacional',
        path: '/gestion-procesos/incendiosForestalesNacional',
        component: lazy(() => import('@/views/demo/SingleMenuView')),
        authority: [],
    },
    {
        key: 'gestionProcesos.incendiosForestalesRegional',
        path: '/gestion-procesos/incendiosForestalesRegional',
        component: lazy(() => import('@/views/demo/SingleMenuView')),
        authority: [],
    },
    {
        key: 'gestionProcesos.sismosTsunamiNacional',
        path: '/gestion-procesos/sismosTsunamiNacional',
        component: lazy(() => import('@/views/demo/SingleMenuView')),
        authority: [],
    },
    {
        key: 'gestionProcesos.sismosTsunamiOtrosAmbitos',
        path: '/gestion-procesos/sismosTsunamiOtrosAmbitos',
        component: lazy(() => import('@/views/demo/SingleMenuView')),
        authority: [],
    },
    {
        key: 'gestionProcesos.sequiasNacional',
        path: '/gestion-procesos/sequiasNacional',
        component: lazy(() => import('@/views/demo/SingleMenuView')),
        authority: [],
    },

    {
        key: 'gestionProcesos.sequiasDepartamental',
        path: '/gestion-procesos/sequiasDepartamental',
        component: lazy(() => import('@/views/demo/SingleMenuView')),
        authority: [],
    },
    {
        key: 'gestionProcesos.volcanesNacional',
        path: '/gestion-procesos/volcanesNacional',
        component: lazy(() => import('@/views/demo/SingleMenuView')),
        authority: [],
    },
    // Rutas para Fortalecimiento y Asistencia Técnica
    {
        key: 'fortalecimiento.capacitacion',
        path: '/fortalecimiento/capacitacion',
        component: lazy(() => import('@/views/demo/GroupSingleMenuItemView')),
        authority: [],
    },
    {
        key: 'fortalecimiento.asistencia',
        path: '/fortalecimiento/asistencia',
        component: lazy(() => import('@/views/demo/GroupSingleMenuItemView')),
        authority: [],
    },
    // Rutas para Fortalecimiento (DIFAT)
    {
        key: 'fortalecimiento.resumenInstrumentoNivNac',
        path: '/fortalecimiento/resumenInstrumentoNivNac',
        component: lazy(
            () => import('@/views/modules/dimse/ResumenInstrumentoNivNac'),
        ),
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
        component: lazy(() => import('@/views/demo/SingleMenuView')),
        authority: [],
    },
    {
        key: 'monitoreo.monitoreo',
        path: '/monitoreo/monitoreo',
        component: lazy(() => import('@/views/demo/SingleMenuView')),
        authority: [],
    },
    {
        key: 'monitoreo.seguimiento',
        path: '/monitoreo/seguimiento',
        component: lazy(() => import('@/views/demo/SingleMenuView')),
        authority: [],
    },
    {
        key: 'monitoreo.supervision',
        path: '/monitoreo/supervision',
        component: lazy(() => import('@/views/demo/SingleMenuView')),
        authority: [],
    },
    {
        key: 'monitoreo.evaluacion',
        path: '/monitoreo/evaluacion',
        component: lazy(() => import('@/views/demo/SingleMenuView')),
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
