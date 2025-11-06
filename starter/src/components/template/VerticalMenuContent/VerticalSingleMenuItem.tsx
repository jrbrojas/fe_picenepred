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
const focusRing = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md"

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

interface VerticalMenuItemProps extends CollapsedItemProps, DefaultItemProps { }

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
    const isActive = currentKey === nav.key
    return (
        <AuthorityCheck userAuthority={userAuthority} authority={nav.authority}>
            {renderAsIcon ? (
                children
            ) : (
                // Evita foco en el wrapper: role="none" + tabIndex={-1}
                <Dropdown.Item role="none" tabIndex={-1} active={isActive}>
                    {nav.path ? (
                        <Link
                            className={`h-full w-full flex items-center outline-hidden ${focusRing} px-2 py-1`}
                            to={nav.path}
                            target={nav.isExternalLink ? "_blank" : ""}
                            aria-current={isActive ? "page" : undefined}
                            onClick={() =>
                                onLinkClick?.({ key: nav.key, title: nav.title, path: nav.path })
                            }
                            onKeyDown={(e) => {
                                // Espacio también activa (Enter ya lo maneja el <a>)
                                if (e.key === " ") {
                                    e.preventDefault()
                                    onLinkClick?.({ key: nav.key, title: nav.title, path: nav.path })
                                }
                            }}
                        >
                            ▶<span className="ms-2">{nav.tooltip ? nav.tooltip : nav.title}</span>
                        </Link>
                    ) : (
                        // Si no hay path, que sea focuseable y activable
                        <button
                            type="button"
                            className={`h-full w-full flex items-center ${focusRing} px-2 py-1 text-left cursor-pointer`}
                            role="menuitem"
                            tabIndex={0}
                            onClick={() =>
                                onLinkClick?.({ key: nav.key, title: nav.title, path: "" })
                            }
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault()
                                    onLinkClick?.({ key: nav.key, title: nav.title, path: "" })
                                }
                            }}
                        >
                            {nav.title}
                        </button>
                    )}
                </Dropdown.Item>
                // <Dropdown.Item tabIndex={-1} active={isActive}>
                //     {nav.path ? (
                //         <Link
                //             className={`h-full w-full flex items-center outline-hidden ${focusRing}`}
                //             to={nav.path}
                //             target={nav.isExternalLink ? '_blank' : ''}
                //             onClick={() =>
                //                 onLinkClick?.({
                //                     key: nav.key,
                //                     title: nav.title,
                //                     path: nav.path,
                //                 })
                //             }
                //             onKeyDown={(e) => {
                //                 if (e.key === " ") {
                //                     e.preventDefault()
                //                     onLinkClick?.({ key: nav.key, title: nav.title, path: nav.path })
                //                 }
                //             }}
                //         >
                //             ▶<span className='ms-2'>{nav.tooltip ? nav.tooltip : nav.title}</span>
                //         </Link>
                //     ) : (
                //         <button
                //             type="button"
                //             className={`h-full w-full flex items-center ${focusRing} px-2 py-1 text-left cursor-pointer`}
                //             role="menuitem"
                //             tabIndex={0}
                //             onClick={() =>
                //                 onLinkClick?.({ key: nav.key, title: nav.title, path: "" })
                //             }
                //             onKeyDown={(e) => {
                //                 if (e.key === "Enter" || e.key === " ") {
                //                     e.preventDefault()
                //                     onLinkClick?.({ key: nav.key, title: nav.title, path: "" })
                //                 }
                //             }}
                //         >
                //             {nav.title}
                //         </button>
                //     )}
                // </Dropdown.Item>
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

    // Wrapper sin foco: role="none" + tabIndex={-1}
    const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
        <MenuItem key={nav.key} eventKey={nav.key} dotIndent={indent} role="none" tabIndex={-1}>
            {children}
        </MenuItem>
    )

    const TitleSpans = showTitle ? (
        <>
            {[
                "gestionProcesos.general.informe",
                "monitoreo.monitoreo",
                "monitoreo.seguimiento",
                "monitoreo.supervision",
                "monitoreo.evaluacion",
                "monitoreo.directorioNacional",
            ].includes(nav.key) ? (
                <span>{nav.title}</span>
            ) : (
                <>
                    <span className="hidden md:block">{nav.title}</span>
                    <span className="block md:hidden">{nav.tooltip ? nav.tooltip : nav.title}</span>
                </>
            )}
        </>
    ) : null

    return (
        <AuthorityCheck userAuthority={userAuthority} authority={nav.authority}>
            {nav.tooltip ? (
                <Tooltip title={nav.tooltip}>
                    <Wrapper>
                        {nav.path ? (
                            <Link
                                to={nav.path}
                                className={`flex items-center gap-2 h-full w-full ${focusRing} px-2 py-1`}
                                target={nav.isExternalLink ? "_blank" : ""}
                                aria-label={nav.tooltip}
                                onClick={() =>
                                    onLinkClick?.({ key: nav.key, title: nav.title, path: nav.path })
                                }
                                onKeyDown={(e) => {
                                    if (e.key === " ") {
                                        e.preventDefault()
                                        onLinkClick?.({ key: nav.key, title: nav.title, path: nav.path })
                                    }
                                }}
                            >
                                {showIcon && <VerticalMenuIcon icon={nav.icon} />}
                                {TitleSpans}
                            </Link>
                        ) : (
                            <button
                                type="button"
                                className={`flex items-center gap-2 h-full w-full ${focusRing} px-2 py-1 text-left`}
                                role="menuitem"
                                tabIndex={0}
                                aria-label={nav.tooltip}
                                onClick={() =>
                                    onLinkClick?.({ key: nav.key, title: nav.title, path: "" })
                                }
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" || e.key === " ") {
                                        e.preventDefault()
                                        onLinkClick?.({ key: nav.key, title: nav.title, path: "" })
                                    }
                                }}
                            >
                                {showIcon && <VerticalMenuIcon icon={nav.icon} />}
                                {TitleSpans ?? <span>{nav.title}</span>}
                            </button>
                        )}
                    </Wrapper>
                    {/* <MenuItem key={nav.key} eventKey={nav.key} dotIndent={indent}>
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
                    </MenuItem> */}
                </Tooltip>
            ) : (
                <Wrapper>
                    {nav.path ? (
                        <Link
                            to={nav.path}
                            className={`flex items-center gap-2 h-full w-full ${focusRing} px-2 py-1`}
                            target={nav.isExternalLink ? "_blank" : ""}
                            onClick={() =>
                                onLinkClick?.({ key: nav.key, title: nav.title, path: nav.path })
                            }
                            onKeyDown={(e) => {
                                if (e.key === " ") {
                                    e.preventDefault()
                                    onLinkClick?.({ key: nav.key, title: nav.title, path: nav.path })
                                }
                            }}
                        >
                            {showIcon && <VerticalMenuIcon icon={nav.icon} />}
                            {showTitle && <span>{nav.title}</span>}
                        </Link>
                    ) : (
                        <button
                            type="button"
                            className={`flex items-center gap-2 h-full w-full ${focusRing} px-2 py-1 text-left`}
                            role="menuitem"
                            tabIndex={0}
                            onClick={() =>
                                onLinkClick?.({ key: nav.key, title: nav.title, path: "" })
                            }
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault()
                                    onLinkClick?.({ key: nav.key, title: nav.title, path: "" })
                                }
                            }}
                        >
                            {showIcon && <VerticalMenuIcon icon={nav.icon} />}
                            {showTitle && <span>{nav.title}</span>}
                        </button>
                    )}
                </Wrapper>
                // <MenuItem key={nav.key} eventKey={nav.key} dotIndent={indent}>
                //     <Link
                //         to={nav.path}
                //         className="flex items-center gap-2 h-full w-full"
                //         target={nav.isExternalLink ? '_blank' : ''}
                //         onClick={() =>
                //             onLinkClick?.({
                //                 key: nav.key,
                //                 title: nav.title,
                //                 path: nav.path,
                //             })
                //         }
                //     >
                //         {showIcon && <VerticalMenuIcon icon={nav.icon} />}
                //         {showTitle && <span>{nav.title}</span>}
                //     </Link>
                // </MenuItem>
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
