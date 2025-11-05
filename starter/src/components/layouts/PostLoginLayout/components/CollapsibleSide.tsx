import SideNav from '@/components/template/SideNav'
import Header from '@/components/template/Header'
import SideNavToggle from '@/components/template/SideNavToggle'
import MobileNav from '@/components/template/MobileNav'
import Search from '@/components/template/Search'
import Notification from '@/components/template/Notification'
import UserProfileDropdown from '@/components//template/UserProfileDropdown'
import SidePanel from '@/components//template/SidePanel'
import LayoutBase from '@/components//template/LayoutBase'
import useResponsive from '@/utils/hooks/useResponsive'
import { LAYOUT_COLLAPSIBLE_SIDE } from '@/constants/theme.constant'
import type { CommonProps } from '@/@types/common'
import { Button, Tooltip } from '@/components/ui'
import { HiHome } from 'react-icons/hi'
import { Link, useLocation, useNavigate } from 'react-router'

const CollapsibleSide = ({ children }: CommonProps) => {
    const { larger, smaller } = useResponsive()
    const navigate = useNavigate();
    const location = useLocation()

    let titleExt = ''
    let title = ''
    if (location.pathname.startsWith('/monitoreo')) {
        titleExt = 'MONITOREO, SEGUIMIENTO Y EVALUACIÓN'
        title = 'DIMSE'
    } else if (location.pathname.startsWith('/fortalecimiento')) {
        titleExt = 'FORTALECIMIENTO Y ASISTENCIA TÉCNICA'
        title = 'DIFAT'
    } else if (location.pathname.startsWith('/gestion-procesos')) {
        titleExt = 'GESTIÓN DE PROCESOS'
        title = 'DGP'
    }
    return (
        <LayoutBase
            type={LAYOUT_COLLAPSIBLE_SIDE}
            className="app-layout-collapsible-side flex flex-auto flex-col"
        >
            <div className="flex flex-auto min-w-0">
                {larger.lg && <SideNav />}
                <div className="flex flex-col flex-auto min-h-screen min-w-0 relative w-full">
                    <Header
                        className="shadow-sm dark:shadow-2xl"
                        headerStart={
                            <>
                                {smaller.lg && <MobileNav />}
                                {larger.lg && <SideNavToggle />}
                                {<Tooltip title="Ir al inicio">
                                    <Button
                                        className='header-action-item header-action-item-hoverable'
                                        variant="plain"
                                        shape="circle"
                                        size="sm"
                                        icon={<HiHome className="text-xl" />}
                                        onClick={() => navigate('/')}
                                    />
                                </Tooltip>}
                                <h3 className="text-primary block md:hidden">{title}</h3>
                                <h3 className="text-primary hidden md:block">{titleExt}</h3>
                            </>
                        }
                        headerEnd={
                            <>
                                {/*<Search />*/}
                                {/* <LanguageSelector /> */}
                                {/* <Notification /> */}
                                {/* <SidePanel /> */}
                                <UserProfileDropdown hoverable={false} />
                            </>
                        }
                    />
                    <div className="h-full flex flex-auto flex-col">
                        {children}
                    </div>
                </div>
            </div>
        </LayoutBase>
    )
}

export default CollapsibleSide
