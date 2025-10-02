import { useState } from "react"
import { useNavigate } from "react-router"
import Footer from "./components/Footer"
import useIsLargeScreen from "@/utils/hooks/useIsLargeScreen"
import { useAuth } from "@/auth"
import UserDropdown from "@/components/template/UserProfileDropdown"
import { Button } from "@/components/ui"
import HomeHero from "./components/HomeHero"
import Monitoreo from "./components/Monitoreo"
import Nav from "./components/Nav"

const Home = () => {
    const [open, setOpen] = useState(false)
    const isLarge = useIsLargeScreen()
    const { authenticated } = useAuth()
    const navigate = useNavigate();

    return (
        <div className="flex min-h-screen w-full flex-col bg-slate-50 text-slate-800">
            <header className="border-b border-slate-200 bg-white">
                <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4">
                    <div className="flex items-center gap-3 ml-0 lg:ml-20">
                        <img
                            src="/img/logo/logo-cenepred.jpg"
                            alt="CENEPRED"
                            className="h-12 lg:h-24 w-auto object-contain mr-0 lg:mr-5"
                            loading="lazy"
                        />
                        <div className="h-17 lg:w-px bg-teal-600" />
                        <img
                            src="/img/logo/logo_sigrid.png"
                            alt="CENEPRED"
                            className="h-7 md:h-17 w-auto object-contain cursor-pointer"
                            loading="lazy"
                            onClick={() =>
                                window.open(
                                    'https://sigrid.cenepred.gob.pe/sigridv3/',
                                    '_blank',
                                )
                            }
                        />
                    </div>

                    <div className="flex flex-col lg:flex-row items-center gap-3">
                        {authenticated ? (
                            <UserDropdown />
                        ) : (
                            <div className="flex flex-col lg:flex-row items-center gap-3">
                                <Button size={isLarge ? 'lg' : 'xs'}
                                    onClick={() => navigate(`/sign-up`)} variant="plain">Registrarse</Button>
                                <Button size={isLarge ? 'lg' : 'xs'} onClick={() => navigate(`/sign-in`)} > Iniciar Sesión</Button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="w-full text-white shadow-sm bg-[#078199]">
                    <Nav />
                </div>
            </header>

            <main className="flex-1 mx-auto w-full max-w-7xl">
                <section className="relative">
                    <HomeHero />

                    <Monitoreo />
                </section>
            </main>

            <Footer />
        </div>
    )
}

export default Home
