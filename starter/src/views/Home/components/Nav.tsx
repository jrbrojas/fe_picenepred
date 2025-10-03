import { useAuth } from "@/auth"
import { IsolatedNavigatorRef } from "@/auth/AuthProvider"
import { Button, Notification, toast } from "@/components/ui"
import appConfig from "@/configs/app.config"
import { REDIRECT_URL_KEY } from "@/constants/app.constant"
import { useMemo, useRef, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router"

const REDIRECT_KEY = "redirectTo"
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
        label: 'INICIO',
        href: '#',
        submenu: [
            {
                label: 'Normas Legales GRD',
                external: true,
                href: 'https://dimse.cenepred.gob.pe/simse/normativas'
            },
            {
                label: 'Glosario de Términos GRD',
                external: true,
                href: 'https://dimse.cenepred.gob.pe/simse/glosario'
            },
            {
                label: 'Directorio Nacional GRD',
                href: '#',
                submenu: [
                    { label: 'Responsable por entidad', href: '/sign-in?next=/monitoreo/directorioNacional' },
                    { label: 'Visor', external: true, href: 'https://dimse.cenepred.gob.pe/mapadirectorio/Views/' },
                ]
            }
        ]
    },
    {
        label: 'SIGRID',
        href: '#',
        submenu: [
            {
                label: 'Plataforma SIGRID',
                external: true,
                href: 'https://sigrid.cenepred.gob.pe/'
            },
            {
                label: 'Visor SIGRID',
                external: true,
                href: 'https://sigrid.cenepred.gob.pe/sigridv3/mapa?id=0'
            },
        ]
        //href: 'https://sigrid.cenepred.gob.pe/sigridv3/mapa?id=0',
        //external: true,
    },
    {
        label: 'Gestión de procesos',
        href: '/gestion-procesos/lluviasAvisoMeteorologico/estatico',
        protected: true,
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
        href: 'https://buenaspracticas.cenepred.gob.pe/',
        external: true,
    },
]

function AppNavLink({ item, className, onDone }: { item: NavItem; className?: string; onDone?: () => void }) {
    const { authenticated } = useAuth()
    const navigate = useNavigate()
    const [active, setActive] = useState(false)
    const navigatorRef = useRef<IsolatedNavigatorRef>(null)
    const root = useRef<HTMLDivElement | null>(null)

    // Enlaces externos simples
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

    // Handler para <a> reales (no '#')
    const handleAnchorClick: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
        if (item.protected && !authenticated) {
            e.preventDefault()
            toast.push(
                <Notification title="Sesión invalida" type="danger">
                    Debes iniciar sesión para ingresar a la plataforma
                </Notification>
            )
        } else {
            // guaradar la intencion
            localStorage.setItem(REDIRECT_KEY, item.href.split("/").filter(Boolean)[0] || "/")
            navigate(item.href)
        }
        onDone?.()
    }

    const collectClassName = useMemo(() => {
        return [className, 'menulink', active ? 'active' : ''].join(' ')
    }, [className, active])

    // Ítem contenedor con submenú
    if (item.href === '#') {
        return (
            <div
                className={`${collectClassName} relative select-none`}
                onBlur={() => setActive(false)}
            >
                {/* Botón que abre/cierra el submenú */}
                <button
                    type="button"
                    className="inline-flex items-center"
                    onClick={() => setActive(v => !v)}    // 👈 sin preventDefault
                    aria-expanded={active}
                    aria-haspopup="menu"
                >
                    {item.label}
                </button>

                {Array.isArray(item.submenu) && item.submenu.length > 0 ? (
                    <div
                        className={[
                            'submenu absolute left-1/2 top-full z-50 w-64 -translate-x-1/2 rounded-md bg-[#078199] p-2 text-white shadow-lg ring-1 ring-black/5',
                            'hidden md:group-hover:block',
                            active ? 'block md:block' : '',
                        ].join(' ')}
                        onClick={(e) => e.stopPropagation()}   // 👈 evita que el click suba al contenedor
                        role="menu"
                    >
                        <ul className="grid gap-1">
                            {item.submenu.map((i, index) => (
                                <li key={index} role="none">
                                    <AppNavLink
                                        item={i as NavItem}
                                        className="block rounded px-3 py-2 text-sm bg-red"
                                        onDone={onDone}
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : null}
            </div>
        )
    }

    // Ítem normal (enlace real)
    return (
        <Link to={item.href} className={className} onClick={handleAnchorClick}>
            {item.label}
        </Link>
    )
}

const Nav = () => {
    const [open, setOpen] = useState(false)

    return (
        <>
            <nav className="menuhome flex items-center justify-between md:justify-center gap-2 py-3">
                {/* Desktop */}
                <ul className="hidden md:flex items-center gap-8">
                    {navItems.map((item) => (
                        <li key={item.label} className="group relative">
                            <AppNavLink item={item} className="block -mx-2 px-2 py-1.5 rounded-md text-sm font-semibold tracking-wide text-white/90 transition-colors duration-200 group-hover:text-white group-hover:bg-white/10" />
                            <span className="pointer-events-none absolute -bottom-1 left-1/2 h-0.5 w-10 -translate-x-1/2 bg-white/80 transition-transform duration-200 origin-center scale-x-0 group-hover:scale-x-100" />
                        </li>
                    ))}
                </ul>

                {/* Mobile button */}
                <Button
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
                </Button>
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
        </>
    )
}

export default Nav
