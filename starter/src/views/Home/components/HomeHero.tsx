import { Link } from 'react-router'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

const slides = [
  //{ image: '/img/banner.jpg' },
  { image: '/img/banner/desktop/imagen-1.webp' },
  { image: '/img/banner/desktop/imagen-2.webp' },
  { image: '/img/banner/desktop/imagen-3.webp' },
  { image: '/img/banner/desktop/imagen-4.webp' },
  { image: '/img/banner/desktop/imagen-5.webp' },
  { image: '/img/banner/desktop/imagen-6.webp' },
  { image: '/img/banner/desktop/imagen-7.webp' },
  { image: '/img/banner/desktop/imagen-8.webp' },
  { image: '/img/banner/desktop/imagen-9.webp' },
  //{ image: '/img/1.webp' },
  //{ image: '/img/2.webp' },
  //{ image: '/img/3.webp' },
  //{ image: '/img/4.webp' },
  //{ image: '/img/5.webp' },
]

        //className="relative w-full h-[50vh] sm:h-[65vh] md:h-[70vh] lg:90vh"
export default function HomeHero() {
  return (
    <section className="relative w-screen ml-[calc(49.39%_-_50vw)]"> 
      {/* Contenedor Swiper */}
      <Swiper
        //modules={[Autoplay, Pagination, Navigation]}
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop
        pagination={{ clickable: true }}
        navigation
        className="relative w-full aspect-[4/3] md:aspect-[16/6]"
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>
            <div className="relative w-full h-full overflow-hidden" role="img" aria-label="Panel de monitoreo">

              <div
                className="absolute inset-0 bg-center bg-cover scale-105 blur-md"
                style={{
                  backgroundImage: `url(${slide.image})`,
                  filter: "blur(10px) brightness(0.8)",
                  transform: "scale(1.1)",
                }}
              ></div>

             <div className="relative grid justify-center h-full hidden lg:flex">
              <img
                src={slide.image}
                alt="CENEPRED Monitoreo"
                className="max-h-full max-w-full object-cover mx-auto z-10"
              />
            </div>

              <div
                className="relative w-full h-full bg-cover bg-center bg-no-repeat block lg:hidden"
                style={{
                  backgroundImage: `url(${slide.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
                aria-label="Panel de monitoreo"
                role="img"
              ></div>

              <div className="absolute inset-x-0 bottom-0 md:bottom-5 z-20">
                <div className="absolute bottom-0 left-0 z-10 px-0 md:px-0">
                  <div className="flex items-stretch gap-6 bg-[#30BDCC]/70 backdrop-blur-sm p-6 md:p-10 text-white w-[122vw] md:w-auto h-[220px] shadow-lg">
                    <div
                      className="w-[10px] ml-4 md:ml-10"
                      style={{
                        background: "linear-gradient(to bottom, #E4DE40 45%, white 45%)",
                      }}
                    ></div>

                    <div>
                      <h1 className="text-white text-[28px] md:text-[40px] lg:text-[46px] font-extrabold leading-tight">
                        Monitoreo en tiempo real
                      </h1>
                      <p className="mt-2 text-white/95 text-base md:text-lg">
                        Explora nuestros mapas
                      </p>

                      <div className="mt-5">
                        <a
                          href="https://sigrid.cenepred.gob.pe/sigridv3/mapa?id=0"
                          target="_blank"
                          rel="noopener noreferrer"
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
                        </a>
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
