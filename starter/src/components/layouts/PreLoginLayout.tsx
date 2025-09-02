import authRoute from '@/configs/routes.config/authRoute'
import { matchPath, useLocation } from 'react-router-dom'
import AuthLayout from './AuthLayout'
import type { CommonProps } from '@/@types/common'

const PreLoginLayout = ({ children }: CommonProps) => {
    const location = useLocation()

    const { pathname } = location

    const routesUsingAuthLayout = authRoute.filter((r) => r.key !== 'default')

    //const isAuthPath = authRoute.some((route) => route.path === pathname)
    const isAuthPath = routesUsingAuthLayout.some((r) =>
        matchPath({ path: r.path, end: true }, pathname),
    )

    return (
        <div className="flex flex-auto flex-col h-[100vh]">
            {isAuthPath ? <AuthLayout>{children}</AuthLayout> : children}
        </div>
    )
}

export default PreLoginLayout
