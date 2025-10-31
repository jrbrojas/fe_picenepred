import Tooltip from '@/components/ui/Tooltip'
import Menu from '@/components/ui/Menu'
import AuthorityCheck from '@/components/shared/AuthorityCheck'
import VerticalMenuIcon from './VerticalMenuIcon'
import { Link } from 'react-router'
import Dropdown from '@/components/ui/Dropdown'
import type { CommonProps } from '@/@types/common'
import type { Direction } from '@/@types/theme'
import type { NavigationTree } from '@/@types/navigation'
import navigationIcon from '@/configs/navigation-icon.config'

const { MenuItem } = Menu

interface CollapsedItemProps extends CommonProps {
    nav: NavigationTree
    direction?: Direction
    onLinkClick?: (link: { key: string; title: string; path: string }) => void
    t: (
        key: string,
        fallback?: string | Record<string, string | number>,
    ) => string
    renderAsIcon?: boolean
    userAuthority: string[]
    currentKey?: string
    parentKeys?: string[]
}

interface DefaultItemProps {
    nav: NavigationTree
    onLinkClick?: (link: { key: string; title: string; path: string }) => void
    sideCollapsed?: boolean
    t: (
        key: string,
        fallback?: string | Record<string, string | number>,
    ) => string
    indent?: boolean
    userAuthority: string[]
    showIcon?: boolean
    showTitle?: boolean
}

interface VerticalMenuItemProps extends CollapsedItemProps, DefaultItemProps {}

const CollapsedItem = ({
    nav,
    children,
    direction,
    renderAsIcon,
    onLinkClick,
    userAuthority,
    t,
    currentKey,
}: CollapsedItemProps) => {
    return (
        <AuthorityCheck userAuthority={userAuthority} authority={nav.authority}>
            {renderAsIcon ? (
                children
            ) : (
                <Dropdown.Item active={currentKey === nav.key}>
                    {nav.path ? (
                        <Link
                            className="h-full w-full flex items-center outline-hidden"
                            to={nav.path}
                            target={nav.isExternalLink ? '_blank' : ''}
                            onClick={() =>
                                onLinkClick?.({
                                    key: nav.key,
                                    title: nav.title,
                                    path: nav.path,
                                })
                            }
                        >
                            ▶<span className='ms-2'>{nav.tooltip ? nav.tooltip : nav.title}</span>
                        </Link>
                    ) : (
                        <span>{nav.title}</span>
                    )}
                </Dropdown.Item>
            )}
        </AuthorityCheck>
    )
}

const DefaultItem = (props: DefaultItemProps) => {
    const {
        nav,
        onLinkClick,
        showTitle,
        indent,
        showIcon = true,
        userAuthority,
        t,
    } = props

    return (
    <AuthorityCheck userAuthority={userAuthority} authority={nav.authority}>
        {nav.tooltip ? (
        <Tooltip title={nav.tooltip}>
            <MenuItem key={nav.key} eventKey={nav.key} dotIndent={indent}>
            <Link
                to={nav.path}
                className="flex items-center gap-2 h-full w-full"
                target={nav.isExternalLink ? '_blank' : ''}
                onClick={() =>
                onLinkClick?.({
                    key: nav.key,
                    title: nav.title,
                    path: nav.path,
                })
                }
            >
                {showIcon && <VerticalMenuIcon icon={nav.icon} />}
                    {showTitle && (
                        <>
                            {['gestionProcesos.general.informe', 'monitoreo.monitoreo', 'monitoreo.seguimiento', 'monitoreo.supervision', 'monitoreo.evaluacion', 'monitoreo.directorioNacional'].includes(nav.key) ? (
                                <span>{nav.title}</span>
                            ) : (
                                <>
                                    <span className="hidden md:block">{nav.title}</span>
                                    <span className="block md:hidden">
                                        {nav.tooltip ? nav.tooltip : nav.title}
                                    </span>
                                </>
                            )}
                        </>
                    )}
            </Link>
            </MenuItem>
        </Tooltip>
        ) : (
        <MenuItem key={nav.key} eventKey={nav.key} dotIndent={indent}>
            <Link
            to={nav.path}
            className="flex items-center gap-2 h-full w-full"
            target={nav.isExternalLink ? '_blank' : ''}
            onClick={() =>
                onLinkClick?.({
                key: nav.key,
                title: nav.title,
                path: nav.path,
                })
            }
            >
            {showIcon && <VerticalMenuIcon icon={nav.icon} />}
            {showTitle && <span>{nav.title}</span>}
            </Link>
        </MenuItem>
        )}
    </AuthorityCheck>
    )

}

const VerticalSingleMenuItem = ({
    nav,
    onLinkClick,
    sideCollapsed,
    direction,
    indent,
    renderAsIcon,
    userAuthority,
    showIcon,
    showTitle,
    t,
    currentKey,
    parentKeys,
}: Omit<VerticalMenuItemProps, 'title' | 'translateKey'>) => {
    return (
        <>
            {sideCollapsed ? (
                <CollapsedItem
                    currentKey={currentKey}
                    parentKeys={parentKeys}
                    nav={nav}
                    direction={direction}
                    renderAsIcon={renderAsIcon}
                    userAuthority={userAuthority}
                    t={t}
                    onLinkClick={onLinkClick}
                >
                    <DefaultItem
                        nav={nav}
                        sideCollapsed={sideCollapsed}
                        userAuthority={userAuthority}
                        showIcon={showIcon}
                        showTitle={showTitle}
                        t={t}
                        onLinkClick={onLinkClick}
                    />
                </CollapsedItem>
            ) : (
                <DefaultItem
                    nav={nav}
                    sideCollapsed={sideCollapsed}
                    userAuthority={userAuthority}
                    showIcon={showIcon}
                    showTitle={showTitle}
                    indent={indent}
                    t={t}
                    onLinkClick={onLinkClick}
                />
            )}
        </>
    )
}

export default VerticalSingleMenuItem
