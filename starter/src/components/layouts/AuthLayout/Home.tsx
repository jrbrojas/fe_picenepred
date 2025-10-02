import { cloneElement } from 'react'
import Container from '@/components/shared/Container'
import type { ReactNode, ReactElement } from 'react'
import type { CommonProps } from '@/@types/common'

interface HomeProps extends CommonProps {
    content?: ReactNode
}

const Home = ({ children, content, ...rest }: HomeProps) => {
    return (
        <div className="h-full bg-white dark:bg-gray-800">
            <div className="flex flex-col flex-auto items-center justify-center min-w-0 h-full">
                {content}
                {children
                    ? cloneElement(children as ReactElement, {
                        ...rest,
                    })
                    : null}
            </div>
        </div>
    )
}

export default Home
