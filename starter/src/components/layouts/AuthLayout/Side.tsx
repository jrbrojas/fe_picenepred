import { cloneElement } from 'react'
import type { CommonProps } from '@/@types/common'
import { Container } from '@/components/shared'

type SideProps = CommonProps

const Side = ({ children, ...rest }: SideProps) => {
    return (
        <div className="h-screen p-6 bg-white flex items-center justify-center">
           <Container>
                <div className="flex flex-row w-full">
                    <div className="flex flex-col justify-center items-end flex-1">
                        <div className="w-full max-w-[600px]">
                            {children
                            ? cloneElement(children as React.ReactElement, {
                                ...rest,
                                })
                            : null}
                        </div>
                    </div>

                    <div className="py-6 px-10 hidden md:flex flex-col flex-1 justify-between items-start relative xl:max-w-[520px] 2xl:max-w-[720px]">
                        <img
                            src="/img/others/log-in-side.png" alt='SIMSE'
                            className="absolute top-1/2 left-1/2 w-full max-h-[650px] rounded-3xl object-contain -translate-x-1/2 -translate-y-1/2"
                        />
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Side
