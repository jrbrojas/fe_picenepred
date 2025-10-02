import { Navigate, Outlet, useLocation } from 'react-router'
import appConfig from '@/configs/app.config'
import { useAuth } from '@/auth'

const { authenticatedEntryPath, unAuthenticatedEntryPath } = appConfig

const PublicRoute = () => {
    const { authenticated } = useAuth()
    const {pathname} = useLocation();    

    return authenticated && pathname !== '/home' ? <Navigate to={unAuthenticatedEntryPath} /> : <Outlet />
}

export default PublicRoute
