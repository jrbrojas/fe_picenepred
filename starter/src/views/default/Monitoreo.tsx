import React from 'react'
import { BiChevronRight } from 'react-icons/bi'

import AulaVirtual from './AulaVirtual'

const Container: React.FC<React.PropsWithChildren<{ className?: string }>> = ({
    children,
    className = '',
}) => (
    <div
        className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}
    >
        {children}
    </div>
)

const FeatureCard: React.FC<{
    img: React.ReactNode
    title: string | null
    children: React.ReactNode
    cta?: string
}> = ({ img, title, children, cta = 'Explorar' }) => (
    <div className="flex h-full flex-col items-center justify-between rounded-2xl bg-white p-8 text-center shadow-md ring-1 ring-slate-100 transition hover:bg-[#32C3D21F]">
        <div className="mb-6 grid h-28 w-28 place-items-center rounded-full bg-[#EAF7F9]">
            <div className="text-[#0097A7]">
                <img src={img} />
            </div>
        </div>
        <h3 className="mb-2 text-lg font-semibold text-[#004748]">{title}</h3>
        <p className="mb-6 max-w-xs text-xs text-slate-500">{children}</p>
        <a
            href="#"
            className="inline-flex items-center gap-2 rounded-full border border-[#0097A7] px-4 py-2 text-sm font-medium text-[#0097A7] hover:bg-[#0097A7] hover:text-white"
        >
            {cta}
            <BiChevronRight className="h-4 w-4" />
        </a>
    </div>
)

export default function Monitoreo() {
    return (
        <div className="min-h-screen">
            <section className="py-14">
                <Container>
                    <div className="mb-10 text-center">
                        <h2 className="text-2xl font-bold text-slate-800">
                            Monitoreo online
                        </h2>
                        <p className="text-sm text-slate-500">
                            y en tiempo real
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        <FeatureCard
                            img="/img/Frame1.png"
                            title="Riesgos de inundación"
                        >
                            Explora riesgos a nivel local, regional o nacional
                        </FeatureCard>
                        <FeatureCard
                            img="/img/Group.png"
                            title="Riesgos de incendios"
                        >
                            Explora riesgos a nivel local, regional o nacional
                        </FeatureCard>
                        <FeatureCard
                            img="/img/Frame.png"
                            title="Riesgos sísmicos"
                        >
                            Explora riesgos a nivel local, regional o nacional
                        </FeatureCard>
                    </div>

                    <AulaVirtual />
                </Container>
            </section>
        </div>
    )
}
