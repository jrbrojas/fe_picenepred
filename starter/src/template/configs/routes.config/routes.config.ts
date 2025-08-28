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
    // Rutas para Gestión de Procesos
    {
        key: 'gestionProcesos.evaluacion',
        path: '/gestion-procesos/evaluacion',
        component: lazy(() => import('@/views/demo/SingleMenuView')),
        authority: [],
    },
    {
        key: 'gestionProcesos.prevencion',
        path: '/gestion-procesos/prevencion',
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
    // Rutas para Monitoreo, Seguimiento y Evaluación
    {
        key: 'monitoreo.seguimiento',
        path: '/monitoreo/seguimiento',
        component: lazy(() => import('@/views/demo/CollapseMenuItemView1')),
        authority: [],
    },
    {
        key: 'monitoreo.evaluacion',
        path: '/monitoreo/evaluacion',
        component: lazy(() => import('@/views/demo/CollapseMenuItemView2')),
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

