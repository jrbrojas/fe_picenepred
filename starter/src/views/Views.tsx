import { Suspense } from 'react'
import { useLocation } from 'react-router-dom'
import type { LayoutType } from '@/@types/theme'
import Loading from '@/components/shared/Loading'
import AllRoutes from '@/components/route/AllRoutes'

interface ViewsProps {
    pageContainerType?: 'default' | 'gutterless' | 'contained'
    layout?: LayoutType
}

const Views = (props: ViewsProps) => {
    const location = useLocation()

    return (
        <Suspense
            key={location.key}
            fallback={<Loading loading={true} className="w-full" />}
        >
            <AllRoutes {...props} />
        </Suspense>
    )
}

export default Views
