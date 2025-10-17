import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

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
    <a
      href={course.href || '#'}
      target="_blank"
      rel="noopener noreferrer"
      className="group block focus:outline-none"
    >
      <div className="relative overflow-hidden rounded-[24px] shadow-lg ring-1 ring-black/5 transition-all duration-300 ease-in-out transform hover:scale-105">
        <img
          src={course.imageSrc}
          alt={course.imageAlt || course.title}
          className="h-[250px] w-full object-cover transition-all duration-500 group-hover:scale-[1.05]"
        />
        <div className="pointer-events-none absolute inset-0 rounded-[24px] bg-gradient-to-t from-black/50 via-black/0 to-transparent" />
  
        <div className="absolute bottom-4 left-4">
          <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-slate-700 shadow-md">
            {course.date}
          </span>
        </div>
      </div>
      <h3 className="mt-4 text-center text-xl font-semibold text-gray-800 group-hover:text-[#078199] transition-colors">
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
        imageSrc: '/img/01.png',
        imageAlt: 'Imagen del Sistema Nacional de Gestión del Riesgo de Desastres',
        date: '5 de septiembre de 2025',
        title: 'El Sistema Nacional de Gestión del Riesgo de Desastres',
        href: 'https://aulavirtual.cenepred.gob.pe/login/index.php',
    },
    {
        id: '2',
        imageSrc: '/img/02.png',
        imageAlt: 'Imagen de Ciudades Resilientes 2030',
        date: '10 de septiembre de 2025',
        title: 'Ciudades Resilientes 2030',
        href: 'https://aulavirtual.cenepred.gob.pe/login/index.php',
    },
    {
        id: '3',
        imageSrc: '/img/03.png',
        imageAlt: 'Imagen de Mecanismos de Financiamiento para el SINAGERD',
        date: '7 de agosto de 2025',
        title: 'Mecanismos de Financiamiento para el SINAGERD',
        href: 'https://aulavirtual.cenepred.gob.pe/login/index.php',
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

                <div className="block lg:hidden">
                    <Swiper
                        spaceBetween={16}
                        slidesPerView={2}
                        loop={true}
                        pagination={{ clickable: true }}
                        breakpoints={{
                            320: {
                                slidesPerView: 1,
                            },
                            640: {
                                slidesPerView: 2,
                            },
                            1024: {
                                slidesPerView: 2,
                            },
                        }}
                    >
                        {courses.map((c) => (
                            <SwiperSlide key={c.id}>
                                <div className="relative w-full aspect-w-16 aspect-h-9">
                                    <CourseCard course={c} />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                <div className="hidden lg:grid lg:grid-cols-3 lg:gap-8">
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
