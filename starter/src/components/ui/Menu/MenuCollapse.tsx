import { useState, useEffect, useContext, useId } from 'react'
import { useConfig } from '../ConfigProvider'
import { CollapseContextProvider } from './context/collapseContext'
import classNames from 'classnames'
import { motion } from 'framer-motion'
import MenuContext from './context/menuContext'
import { TbChevronDown } from 'react-icons/tb'
import { PiDotOutlineFill } from 'react-icons/pi'
import type { CommonProps } from '../@types/common'
import type { ReactNode, MouseEvent } from 'react'

export interface MenuCollapseProps extends CommonProps {
    active?: boolean
    eventKey?: string
    expanded?: boolean
    dotIndent?: boolean
    indent?: boolean
    label?: string | ReactNode
    onToggle?: (expanded: boolean, e: MouseEvent<HTMLDivElement>) => void
}
const focusRing = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md'
const MenuCollapse = (props: MenuCollapseProps) => {
    const {
        active,
        children,
        className,
        eventKey,
        expanded = false,
        indent = true,
        label = null,
        dotIndent,
        onToggle,
    } = props

    const [isExpanded, setIsExpanded] = useState(expanded)
    const submenuId = useId();

    const { sideCollapsed, defaultExpandedKeys, defaultCollapseActiveKeys } =
        useContext(MenuContext)

    const { direction } = useConfig()

    useEffect(() => {
        if ((defaultExpandedKeys as string[]).includes(eventKey as string)) {
            setIsExpanded(true)
        }
        if (expanded !== isExpanded) {
            setIsExpanded(true)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [expanded, eventKey, defaultExpandedKeys])

    const toggleCollapse = (e: MouseEvent<HTMLDivElement>) => {
        if (typeof onToggle === 'function') {
            onToggle(!isExpanded, e)
        }
        setIsExpanded(!isExpanded)
    }

    const menuCollapseItemClass = classNames(
        'menu-collapse-item',
        ((defaultCollapseActiveKeys &&
            defaultCollapseActiveKeys.includes(eventKey as string)) ||
            active) &&
        'menu-collapse-item-active',
        className,
    )
    const noToggleLabels = [
        'gestion-procesos',
        'difat',
        'dimse',
    ]
    const includeEvent = noToggleLabels.includes(String(props.eventKey))
    return (
        <div className="menu-collapse">
            {/* TRIGGER accesible */}
            <button
                type="button"
                className={classNames(
                    menuCollapseItemClass,
                    'w-full flex items-center justify-between px-2 py-1 text-left cursor-pointer',
                    focusRing
                )}
                // ARIA: estado de disclosure
                aria-expanded={includeEvent ? undefined : isExpanded}
                aria-controls={includeEvent ? undefined : submenuId}
                // role="button" no es necesario en <button>
                onClick={(e) => {
                    if (includeEvent) return
                    toggleCollapse(e as any)
                }}
                onKeyDown={(e) => {
                    if (includeEvent) return
                    if (e.key === ' ' || e.key === 'Enter') {
                        e.preventDefault()
                        toggleCollapse(e)
                    }
                    if (e.key === 'ArrowRight') setIsExpanded(true)
                    if (e.key === 'ArrowLeft') setIsExpanded(false)
                }}
            >
                <span className="flex items-center gap-2">
                    {dotIndent && (
                        <PiDotOutlineFill
                            className={classNames('text-3xl w-[24px]', !active && 'opacity-25')}
                        />
                    )}
                    {label}
                </span>
                {/* icono */}
                {!sideCollapsed && !includeEvent && (
                    <motion.span
                        className="text-lg mt-1"
                        initial={{ rotate: 0 }}
                        animate={{ rotate: isExpanded ? -180 : 0 }}
                        transition={{ duration: 0.15 }}
                    >
                        <TbChevronDown />
                    </motion.span>
                )}
            </button>

            {/* CONTENEDOR del submenú */}
            <CollapseContextProvider value={isExpanded}>
                <motion.ul
                    id={submenuId}
                    role="menu"
                    aria-label={typeof label === 'string' ? label : undefined}
                    className={classNames(
                        indent ? (direction === 'rtl' ? 'mr-8' : 'ml-8') : '',
                        // que no recorte el ring cuando esté abierto
                        isExpanded ? 'overflow-visible' : 'overflow-hidden'
                    )}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{
                        opacity: isExpanded ? 1 : 0,
                        height: isExpanded ? 'auto' : 0,
                    }}
                    transition={{ duration: 0.15 }}
                >
                    {children}
                </motion.ul>
            </CollapseContextProvider>
        </div>
        // <div className="menu-collapse">
        //     <div
        //         className={menuCollapseItemClass}
        //         role="presentation"
        //         onClick={(e) => {
        //             /*if (includeEvent) {
        //                 e.preventDefault()
        //                 return
        //             }*/
        //             toggleCollapse(e)                    
        //         }}
        //     >
        //         <span className="flex items-center gap-2">
        //             {dotIndent && (
        //                 <PiDotOutlineFill
        //                     className={classNames(
        //                         'text-3xl w-[24px]',
        //                         !active && 'opacity-25',
        //                     )}
        //                 />
        //             )}
        //             {label}
        //         </span>
        //         <motion.span
        //             className="text-lg mt-1"
        //             initial={{ transform: 'rotate(0deg)' }}
        //             animate={{
        //                 transform: isExpanded
        //                     ? 'rotate(-180deg)'
        //                     : 'rotate(0deg)',
        //             }}
        //             transition={{ duration: 0.15 }}
        //         >
        //             {sideCollapsed || includeEvent ? null : <TbChevronDown />}
        //         </motion.span>
        //     </div>
        //     <CollapseContextProvider value={isExpanded}>
        //         <motion.ul
        //             className={
        //                 indent ? (direction === 'rtl' ? 'mr-8' : 'ml-8') : ''
        //             }
        //             initial={{ opacity: 0, height: 0, overflow: 'hidden' }}
        //             animate={{
        //                 opacity: isExpanded ? 1 : 0,
        //                 height: isExpanded ? 'auto' : 0,
        //             }}
        //             transition={{ duration: 0.15 }}
        //         >
        //             {children}
        //         </motion.ul>
        //     </CollapseContextProvider>
        // </div>
    )
}

MenuCollapse.displayName = 'MenuCollapse'

export default MenuCollapse
