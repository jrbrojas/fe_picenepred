import React from 'react'

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

export type Course = {
    id: string
    imageSrc: string
    imageAlt?: string
    date: string
    title: string
    href?: string
}

const CourseCard: React.FC<{ course: Course }> = ({ course }) => (
    <a href={course.href || '#'} className="group block focus:outline-none">
        <div className="relative overflow-hidden rounded-[24px] shadow-lg ring-1 ring-black/5">
            <img
                src={course.imageSrc}
                alt={course.imageAlt || course.title}
                className="h-[300px] w-full object-cover transition duration-300 group-hover:scale-[1.02]"
            />
            <div className="pointer-events-none absolute inset-0 rounded-[24px] bg-gradient-to-t from-black/30 via-black/0 to-transparent" />

            <div className="absolute bottom-4 left-4">
                <span className="rounded-full bg-white/95 px-3 py-1 text-xs font-medium text-slate-700 shadow">
                    {course.date}
                </span>
            </div>
        </div>
        <h3 className="mt-6 text-center text-2xl font-semibold leading-tight text-slate-700">
            {course.title}
        </h3>
    </a>
)

export interface AulaVirtualProps {
    title?: string
    subtitleChip?: string
    courses?: Course[]
    onViewAll?: () => void
}

const defaultCourses: Course[] = [
    {
        id: '1',
        imageSrc: '/img/01.jpg',
        imageAlt: 'Curso 1',
        date: '5 de septiembre de 2025',
        title: 'Fundamentos de la Gestión del Riesgo de Desastres',
    },
    {
        id: '2',
        imageSrc: '/img/02.jpg',
        imageAlt: 'Curso 2',
        date: '10 de septiembre de 2025',
        title: 'Fundamentos de la Gestión del Riesgo de Desastres',
    },
    {
        id: '3',
        imageSrc: '/img/01.jpg',
        imageAlt: 'Curso 3',
        date: '7 de agosto de 2025',
        title: 'Fundamentos de la Gestión del Riesgo de Desastres',
    },
]

const AulaVirtual: React.FC<AulaVirtualProps> = ({
    title = 'Aula virtual',
    subtitleChip = 'Nuevos cursos',
    courses = defaultCourses,
}) => {
    return (
        <section className="py-16">
            <Container>
                <div className="mb-10 text-center">
                    <h2 className="text-3xl font-bold text-[#078199]">
                        {title}
                    </h2>
                    <div className="mt-3 inline-flex rounded-full bg-[#32C3D2]/15 px-4 py-1 text-sm font-semibold text-[#078199]">
                        {subtitleChip}
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {courses.map((c) => (
                        <CourseCard key={c.id} course={c} />
                    ))}
                </div>

                <div className="mt-10 flex justify-center">
                    <button className="rounded-full border border-[#32C3D2] px-6 py-2 text-sm font-medium text-[#32C3D2] transition hover:bg-[#32C3D2] hover:text-white">
                        Ver todo
                    </button>
                </div>
            </Container>
        </section>
    )
}

export default AulaVirtual
