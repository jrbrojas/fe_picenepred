import React from 'react'
import { BiChevronRight } from 'react-icons/bi'
import AulaVirtual from './AulaVirtual'
import FeatureCard from './FeatureCard'

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
                            imgSrc="/img/Frame1.png"
                            title="Riesgos de inundación"
                        >
                            Explora riesgos a nivel local, regional o nacional
                        </FeatureCard>
                        <FeatureCard
                            imgSrc="/img/Group.png"
                            title="Riesgos de incendios"
                        >
                            Explora riesgos a nivel local, regional o nacional
                        </FeatureCard>
                        <FeatureCard
                            imgSrc="/img/Frame.png"
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
