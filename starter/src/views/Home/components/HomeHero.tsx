import { Link } from 'react-router'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

const slides = [
    { image: '/img/banner.jpg' },
    { image: '/img/02.jpg' },
    { image: '/img/01.jpg' },
    { image: '/img/03.jpg' },
]

export default function HomeHero() {
    return (
        <section className="relative overflow-x-clip">
            <Swiper
                modules={[Autoplay, Pagination]}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                loop={true}
                pagination={{ clickable: true }}
                navigation={true}
                className="relative w-full h-[420px] md:h-[520px]"
            >
                {slides.map((slide, i) => (
                    <SwiperSlide key={i}>
                        <div
                            className="relative h-[420px] md:h-[520px] w-full bg-cover bg-center"
                            style={{
                                backgroundImage: `linear-gradient(to top, rgba(25, 111, 122, 0.9) 0%, rgba(13,149,167,0.6) 20%, rgba(13,149,167,0.2) 50%, rgba(255,255,255,0.05) 60%), url(${slide.image})`,
                            }}
                            aria-label="Panel de monitoreo"
                            role="img"
                        >
                            <div className="absolute inset-x-0 bottom-6 md:bottom-10">
                                <div className="mx-auto max-w-[1240px] px-4 sm:px-8 md:px-16 lg:px-[72px]">
                                    <div className="relative z-10 overflow-hidden rounded-none md:rounded-none">
                                        <div className="relative p-6 md:p-10 pl-14 md:pl-16 text-white">
                                            <h1 className="text-white text-[34px] md:text-[54px] lg:text-[56px] font-extrabold leading-[1.06] tracking-tight">
                                                Monitoreo en tiempo real
                                            </h1>
                                            <p className="mt-4 text-white/95 text-base md:text-lg">
                                                Explora nuestros mapas
                                            </p>

                                            <div className="mt-6">
                                                <Link
                                                    to="#"
                                                    className="inline-flex items-center gap-3 rounded-full bg-[#E4DE40] px-6 py-2.5 text-sm md:text-base font-semibold text-[#05353B] shadow-md hover:bg-[#E4DE40]/95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E4DE40]"
                                                >
                                                    Ingresar
                                                    <svg
                                                        className="h-4 w-4"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                    >
                                                        <path d="M5 12h14M13 5l7 7-7 7" />
                                                    </svg>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    )
}
