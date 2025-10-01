import { Navigate, Outlet, useLocation } from 'react-router-dom'
import appConfig from '@/configs/app.config'
import { useAuth } from '@/auth'
// import Default from '@/views/default/Default'
import PreLoginLayout from '../layouts/PreLoginLayout'
import Default from '@/views/default/Default'

const { authenticatedEntryPath, unAuthenticatedEntryPath } = appConfig

const PublicRoute = () => {
    const { authenticated } = useAuth()
    const location = useLocation();    
    
    
    if(location.pathname === '/default' && authenticated){
        return <Outlet />
    }

    return authenticated ? <Navigate to={authenticatedEntryPath} /> : <Outlet />
}

export default PublicRoute
