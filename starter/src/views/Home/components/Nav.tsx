import { useAuth } from '@/auth'
import { Notification, toast } from '@/components/ui'
import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router'

const REDIRECT_KEY = 'redirectTo'

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

const navItems: NavItem[] = [
    {
        label: 'INICIO',
        href: '#',
        submenu: [
            {
                label: 'Normas Legales GRD',
                external: true,
                href: 'https://dimse.cenepred.gob.pe/simse/normativas',
            },
            {
                label: 'Glosario de Términos GRD',
                external: true,
                href: 'https://dimse.cenepred.gob.pe/simse/glosario',
            },
            {
                label: 'Directorio Nacional GRD',
                href: '#',
                submenu: [
                    {
                        label: 'Responsable por entidad',
                        href: '/sign-in?next=/monitoreo/directorioNacional',
                    },
                    {
                        label: 'Visor',
                        external: true,
                        href: 'https://dimse.cenepred.gob.pe/mapadirectorio/Views/',
                    },
                ],
            },
        ],
    },
    {
        label: 'SIGRID',
        href: '#',
        submenu: [
            {
                label: 'Plataforma SIGRID',
                external: true,
                href: 'https://sigrid.cenepred.gob.pe/',
            },
            {
                label: 'Visor SIGRID',
                external: true,
                href: 'https://sigrid.cenepred.gob.pe/sigridv3/mapa?id=0',
            },
        ],
    },
    {
        label: 'GESTIÓN DE PROCESOS',
        href: '/gestion-procesos/lluviasAvisoMeteorologico/estatico',
        protected: true,
    },
    {
        label: 'FORTALECIMIENTO Y ASISTENCIA TÉCNICA',
        href: '/fortalecimiento/pprrdrapi',
        protected: true,
    },
    {
        label: 'MONITOREO, SEGUIMIENTO Y EVALUACIÓN',
        href: '/monitoreo/monitoreo',
        protected: true,
    },
    {
        label: 'AULA VIRTUAL',
        href: 'https://aulavirtual.cenepred.gob.pe/',
        external: true,
    },
    {
        label: 'BUENAS PRÁCTICAS',
        href: 'https://buenaspracticas.cenepred.gob.pe/',
        external: true,
    },
]

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
    const navigate = useNavigate()
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

    const handleAnchorClick = (e: React.MouseEvent) => {
        if (item.protected && !authenticated) {
            e.preventDefault()
            toast.push(
                <Notification title="Sesión invalida" type="danger">
                    Debes iniciar sesión para ingresar a la plataforma
                </Notification>,
            )
        } else {
            localStorage.setItem(
                REDIRECT_KEY,
                item.href.split('/').filter(Boolean)[0] || '/',
            )
            navigate(item.href)
        }
        onDone?.()
    }

    const collectClassName = useMemo(() => {
        return [className, 'menulink', active ? 'active' : ''].join(' ')
    }, [className, active])

    if (item.href === '#') {
        return (
            <div
                className={`${collectClassName} relative select-none`}
                onBlur={() => setActive(false)}
                onMouseLeave={() => setActive(false)}
                tabIndex={0}
            >
                <button
                    type="button"
                    className="inline-flex items-center"
                    onClick={() => setActive((v) => !v)}
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
                        onClick={(e) => e.stopPropagation()}
                        role="menu"
                    >
                        <ul className="grid gap-1">
                            {item.submenu.map((i, index) => (
                                <li key={index} role="none">
                                    <AppNavLink
                                        item={i as NavItem}
                                        className="block rounded-md px-3 py-2 text-sm text-white hover:bg-[#30BDCC] transition-colors duration-200"
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
            <nav className="menuhome flex items-center justify-center py-3">
                <ul className="hidden lg:flex items-center gap-8">
                    {navItems.map((item) => (
                        <li key={item.label}>
                            <AppNavLink
                                item={item}
                                className="block px-3 py-2 rounded-md text-sm font-semibold text-white/90 hover:bg-[#30BDCC] hover:text-white transition-colors duration-200"
                            />
                        </li>
                    ))}
                </ul>

                <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-white lg:hidden"
                    aria-expanded={open}
                    aria-controls="mobile-nav"
                    onClick={() => setOpen(!open)}
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

            <div
                id="mobile-nav"
                className={`lg:hidden ${open ? 'block' : 'hidden'}`}
            >
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
        </>
    )
}

export default Nav
