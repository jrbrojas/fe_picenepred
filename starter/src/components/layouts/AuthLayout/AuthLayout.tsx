import { useMemo, lazy } from 'react'
import type { CommonProps } from '@/@types/common'
import type { LazyExoticComponent, JSX } from 'react'
import { useLocation } from 'react-router'

type LayoutType = 'simple' | 'split' | 'side' | 'home'

type Layouts = Record<
    LayoutType,
    LazyExoticComponent<<T extends CommonProps>(props: T) => JSX.Element>
>
// const currentLayoutType: LayoutType = 'side'

const layouts: Layouts = {
    simple: lazy(() => import('./Simple')),
    split: lazy(() => import('./Split')),
    side: lazy(() => import('./Side')),
    home: lazy(() => import('./Home')),
}

const AuthLayout = ({ children }: CommonProps) => {
    const { pathname } = useLocation()

     const currentLayoutType: LayoutType = useMemo(() => {
        return pathname.startsWith('/home') ? 'home' : 'side'
    }, [pathname])

    const Layout = layouts[currentLayoutType]    
    return <Layout>{children}</Layout>
}

export default AuthLayout
