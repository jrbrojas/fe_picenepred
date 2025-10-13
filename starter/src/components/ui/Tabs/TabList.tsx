import classNames from 'classnames'
import { useTabs } from './context'
import type { CommonProps } from '../@types/common'
import type { ReactNode, Ref } from 'react'

export type TabListProps = CommonProps & {
    button?: ReactNode,
    ref?: Ref<HTMLDivElement>
}

const TabList = (props: TabListProps) => {
    const { className, children, button, ref, ...rest } = props

    const { variant } = useTabs()

    const tabListClass = classNames(
        'tab-list',
        `tab-list-${variant}`,
        className,
    )

    return (
       <div className="flex justify-between items-center w-full">
            <div
                ref={ref}
                role="tablist"
                className={tabListClass}
                {...rest}
            >
                {children}
            </div>

            {/* Botón derecho (opcional) */}
            {button && (
                <div className="ml-3 flex-shrink-0">
                    {button}
                </div>
            )}
        </div>    
    )
}

export default TabList
