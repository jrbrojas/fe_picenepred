import { useAuth } from '@/auth'
import { Button } from '@/components/ui'
import useIsLargeScreen from '@/utils/hooks/useIsLargeScreen'
import React, { useMemo, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import HomeHero from './HomeLanding'
import Footer from './Footer'
import Monitoreo from './Monitoreo'

type SubMenuItem = {
    label: string
    href: string
    external?: boolean
    protected?: boolean
    submenu?: SubMenuItem[]
}
type NavItem = {
    label: string
    href: string
    external?: boolean
    protected?: boolean
    submenu?: SubMenuItem[]
}

export const navItems: NavItem[] = [
    {
        label: 'SIGRID',
        href: '#',
    },

    {
        label: 'Gestión de procesos',
        href: '#',
        submenu: [
            {
                label: 'Capacitación',
                external: true,
                href: 'https://sigrid.cenepred.gob.pe/',
            },
            {
                label: 'Preparación',
                external: true,
                href: 'https://sigrid.cenepred.gob.pe/sigridv3/mapa?id=0',
            },
            {
                label: 'Asistencia',
                external: true,
                href: 'https://sigrid.cenepred.gob.pe/sigridv3/mapa?id=0',
            },
        ],
    },
    {
        label: 'Fortalecimiento y asistentencia técnica',
        href: '/fortalecimiento/resumenInstrumentoNivNac',
        protected: true,
    },
    {
        label: 'Monitoreo',
        href: '/monitoreo/monitoreo',
        protected: true,
    },

    {
        label: 'Aula virtual',
        href: 'https://aulavirtual.cenepred.gob.pe/',
        external: true,
    },
    {
        label: 'Buenas practicas',
        href: 'https://aulavirtual.cenepred.gob.pe/',
        external: true,
    },
]

const REDIRECT_KEY = 'postLoginRedirect'
function AppNavLink({
    item,
    className,
    onDone,
}: {
    item: NavItem
    className?: string
    onDone?: () => void
}) {
    const { authenticated } = useAuth()
    const location = useLocation()
    const [active, setActive] = useState(false)

    if (item.external) {
        return (
            <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={className}
                onClick={onDone}
            >
                {item.label}
            </a>
        )
    }

    const handleClick: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
        if (e.target === root.current) {
            setActive(!active)
        }
        if (item.protected && !authenticated) {
            e.preventDefault()
            localStorage.setItem(REDIRECT_KEY, item.href)
            localStorage.setItem(
                'lastLocation',
                location.pathname + location.search + location.hash,
            )
            alert('Necesita inicar sesión para acceder a esta sección')
        }
        onDone?.()
    }

    const collectClassName = useMemo(() => {
        return [className, 'menulink', active ? 'active' : ''].join(' ')
    }, [className, active])
    const root = useRef(null)
    if (item.href == '#') {
        return (
            <div
                ref={root}
                className={collectClassName}
                onClick={handleClick}
                onBlur={() => setActive(false)}
            >
                {item.label}
                {Array.isArray(item.submenu) && item.submenu.length > 0 ? (
                    <div className="submenu">
                        {item.submenu.map((i, index) => (
                            <AppNavLink key={index} item={i} />
                        ))}
                    </div>
                ) : null}
            </div>
        )
    }

    return (
        <Link to={item.href} className={className} onClick={handleClick}>
            {item.label}
        </Link>
    )
}

export default function Default() {
    const [open, setOpen] = useState(false)
    const isLarge = useIsLargeScreen()

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
                        <Button size={isLarge ? 'lg' : 'xs'} variant="plain">
                            Registrarse
                        </Button>
                        <Button size={isLarge ? 'lg' : 'xs'}>
                            {' '}
                            Iniciar Sesión
                        </Button>
                    </div>
                </div>

                <div className="w-full text-white shadow-sm bg-[#078199]">
                    <div className="mx-auto max-w-7xl px-4 py-3">
                        <nav className="flex items-center justify-between md:justify-center gap-2 py-3">
                            {/* Desktop */}
                            <ul className="hidden md:flex items-center gap-8">
                                {navItems.map((item) => (
                                    <li
                                        key={item.label}
                                        className="group relative"
                                    >
                                        <AppNavLink
                                            item={item}
                                            className="block -mx-2 px-2 py-1.5 rounded-md text-sm font-semibold tracking-wide
               text-white/90 transition-colors duration-200
               group-hover:text-white group-hover:bg-white/10"
                                        />
                                        <span
                                            className="pointer-events-none absolute -bottom-1 left-1/2 h-0.5 w-10 -translate-x-1/2
                   bg-white/80 transition-transform duration-200 origin-center
                   scale-x-0 group-hover:scale-x-100"
                                        />
                                    </li>
                                ))}
                            </ul>

                            {/* Mobile button */}
                            <button
                                type="button"
                                className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium ring-1 ring-inset ring-white/20 hover:bg-white/10 md:hidden"
                                aria-expanded={open}
                                aria-controls="mobile-nav"
                                onClick={() => setOpen((v) => !v)}
                            >
                                <svg
                                    className="h-5 w-5"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                                Menú
                            </button>
                        </nav>

                        {/* Mobile nav */}
                        {open && (
                            <div id="mobile-nav" className="md:hidden">
                                <ul className="grid gap-2 pb-3">
                                    {navItems.map((item) => (
                                        <li key={item.label}>
                                            <AppNavLink
                                                item={item}
                                                className="block rounded-md px-3 py-2 text-center text-sm font-medium text-white/95 hover:bg-white/10 hover:text-white transition-colors"
                                                onDone={() => setOpen(false)}
                                            />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
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
