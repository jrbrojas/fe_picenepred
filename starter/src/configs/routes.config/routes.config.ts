import authRoute from './authRoute'
import type { Routes } from '@/@types/routes'
import panelRoute from './panelRoute'

export const publicRoutes: Routes = [...authRoute]

export const protectedRoutes: Routes = [
    ...panelRoute,
]
