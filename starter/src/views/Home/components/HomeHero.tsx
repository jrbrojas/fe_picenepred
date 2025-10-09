import { Link } from 'react-router'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

const slides = [
  { image: '/img/banner.jpg' },
  { image: '/img/banner2.jpg' },
  { image: '/img/banner3.jpg' },
  { image: '/img/banner4.jpg' },
]

export default function HomeHero() {
  return (
    <section className="relative overflow-hidden w-screen ml-[calc(50%_-_50vw)]">
      {/* Contenedor Swiper */}
      <Swiper
        //modules={[Autoplay, Pagination, Navigation]}
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop
        pagination={{ clickable: true }}
        navigation
        className="relative w-full h-[50vh] sm:h-[65vh] md:h-[70vh] lg:h-screen"
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>
            {/* Imagen de fondo */}
            <div
              className="relative w-full h-full bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${slide.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
              aria-label="Panel de monitoreo"
              role="img"
            >
              
              {/* Contenido anclado abajo (idéntico al tuyo) */}
                <div className="absolute inset-x-0 bottom-6 md:bottom-10">
                  
                  {/* Bloque SIGRID, fuera del contenedor centrado */}
                  <div className="absolute bottom-6 md:bottom-10 left-0 z-10 px-0 md:px-0">

                  <div className="flex items-stretch gap-6 bg-[#0D95A7]/90 backdrop-blur-sm p-6 md:p-10 text-white w-[88vw] md:w-[92vw] lg:w-[68vw] h-[220px] shadow-lg">
                    {/* Línea vertical amarilla */}
                    <div className="w-[10px] bg-[#E4DE40] ml-4 md:ml-10" style={{
                      background: 'linear-gradient(to bottom, #E4DE40 45%, white 45%)',
                    }}></div>

                    {/* Contenido del texto */}
                    <div>
                      <h1 className="text-white text-[28px] md:text-[40px] lg:text-[46px] font-extrabold leading-tight">
                        Monitoreo en tiempo real
                      </h1>
                      <p className="mt-2 text-white/95 text-base md:text-lg">
                        Explora nuestros mapas
                      </p>

                      <div className="mt-5">
                        <Link
                          to="#"
                          className="inline-flex items-center gap-3 rounded-full bg-[#E4DE40] px-6 py-2 text-sm md:text-base font-semibold text-[#05353B] shadow-md hover:bg-[#E4DE40]/95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E4DE40]"
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
