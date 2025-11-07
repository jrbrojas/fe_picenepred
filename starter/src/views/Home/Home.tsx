import { useNavigate } from 'react-router'
import Footer from './components/Footer'
import useIsLargeScreen from '@/utils/hooks/useIsLargeScreen'
import { useAuth } from '@/auth'
import UserDropdown from '@/components/template/UserProfileDropdown'
import { Button } from '@/components/ui'
import HomeHero from './components/HomeHero'
import Monitoreo from './components/Monitoreo'
import Nav from './components/Nav'
import { useState } from 'react'
import Search from '@/components/template/Search'

const Home = () => {
    const isLarge = useIsLargeScreen()
    const { authenticated } = useAuth()
    const navigate = useNavigate()
    const [open, setOpen] = useState(false);

    return (
        <div className="flex min-h-screen w-full flex-col bg-slate-50 text-slate-800">
            <header className="fixed top-0 left-0 w-full z-30 lg:border-b lg:border-slate-200 lg:shadow-md lg:bg-white">

                {/*<div className="relative mx-auto flex max-w-7xl items-center bg-white justify-between gap-6 px-4 py-4">*/}
                <div className="relative mx-auto flex items-center bg-white justify-between gap-6 px-4 py-4">
                    <div className="flex items-center justify-center gap-3 w-full lg:w-auto ml-0 lg:ml-20">
                        <img
                            src="/img/logo/logo-cenepred.jpg"
                            alt="CENEPRED"
                            className="h-15 sm:h-24 sm:lg:h-24 w-auto object-contain mr-0 lg:mr-5"
                            loading="lazy"
                        />
                        <div className="sm:h-17 lg:w-px bg-teal-600" />
                        <img
                            src="/img/logo/logo_sigrid.png"
                            alt="CENEPRED"
                            className="h-10 sm:h-17 sm:md:h-17 w-auto object-contain cursor-pointer"
                            loading="lazy"
                            onClick={() =>
                                window.open(
                                    'https://sigrid.cenepred.gob.pe/sigridv3/',
                                    '_blank',
                                )
                            }
                        />
                    </div>

                    <div className="flex flex-col lg:flex-row items-center gap-3 hidden lg:block">
                        {authenticated ? (
                            <UserDropdown />
                        ) : (
                            <div className="flex flex-col lg:flex-row items-center gap-3">
                                <Search />
                                <Button
                                    size={isLarge ? 'lg' : 'xs'}
                                    onClick={() => navigate(`/sign-up`)}
                                    variant="plain"
                                    className="text-xs lg:text-sm"
                                >
                                    REGISTRARSE
                                </Button>
                                <Button
                                    size={isLarge ? 'lg' : 'xs'}
                                    onClick={() => navigate(`/sign-in`)}
                                    className="text-xs lg:text-sm border-3 border-primary text-primary"
                                >
                                    {' '}
                                    INICIAR SESIÓN
                                </Button>
                            </div>
                        )}
                    </div>


                    <button
                        type="button"
                        className="absolute right-4 top-1/2 -translate-y-1/2 inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-primary lg:hidden"
                        aria-expanded={open}
                        aria-controls="mobile-nav"
                        onClick={() => setOpen(!open)}
                        >
                        {open ? (
                        <svg
                            className="h-15 w-15"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            >
                            <path d="M5 15l7-7 7 7" />
                        </svg>
                        ) : (
                        <svg
                            className="h-15 w-15"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                        )}

                    </button>
                </div>

                <div className="w-full md:w-1/2 lg:w-full text-white shadow-sm bg-gradient-to-tr from-[#078199] to-[#30BDCC] lg:bg-none lg:bg-[#078199] ml-auto">
                    <Nav open={open} setOpen={setOpen} />
                </div>
            </header>

            <main className="flex-1 mx-auto w-full max-w-7xl mt-[80px] lg:mt-[185px]">
                <section className="relative bg-white">
                    <HomeHero />

                    <Monitoreo />
                </section>
            </main>

            <Footer />
        </div>
    )
}

export default Home
