import { useAuth } from '@/auth'
import { Notification, toast } from '@/components/ui'
import { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router'
import UserDropdown from '@/components/template/UserProfileDropdown'
import { Button } from '@/components/ui'
import useIsLargeScreen from '@/utils/hooks/useIsLargeScreen'
import Search from '@/components/template/Search'

export const REDIRECT_KEY = 'redirectTo'

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
            href: '/monitoreo/directorioNacional?nosidebar=',
            protected: true,
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

// 🔹 Componente recursivo para manejar submenús
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
  const [open, setOpen] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

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
    if (item.href === '#') {
      e.preventDefault()
      return
    }
    if (item.protected && !authenticated) {
      e.preventDefault()
      toast.push(
        <Notification title="Sesión inválida" type="danger">
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

  if (item.submenu && item.submenu.length > 0) {
    return (
      <div
        className={`${className || ''} relative select-none`}
        onMouseEnter={() => {
          if (timerRef.current) clearTimeout(timerRef.current)
          setOpen(true)
        }}
        onMouseLeave={() => {
          timerRef.current = setTimeout(() => {
            setOpen(false)
            setHoveredIndex(null)
          }, 150)
        }}
      >
        <button
          type="button"
          className="inline-flex items-center"
          aria-expanded={open}
          aria-haspopup="true"
        >
          {item.label}
        </button>

        {open && (
          <ul
          className="relative text-left lg:absolute left-0 top-full mt-2 z-50 w-56 rounded-md bg-none lg:bg-gradient-to-tr from-[#078199] to-[#30BDCC] lg:bg-none lg:bg-[#078199] p-2 text-white lg:shadow-lg lg:ring-1 ring-black/5 transition-all duration-150"
          onMouseEnter={() => timerRef.current && clearTimeout(timerRef.current)}
          onMouseLeave={() => {
            timerRef.current = setTimeout(() => {
              setOpen(false)
              setHoveredIndex(null)
            }, 150)
          }}
        >
          {item.submenu.map((submenuItem, i) => (
            <li
              key={i}
              className="relative"
              onMouseEnter={() => {
                if (timerRef.current) clearTimeout(timerRef.current)
                setHoveredIndex(i)
              }}
              onMouseLeave={() => {
                timerRef.current = setTimeout(() => {
                  setHoveredIndex(null)
                }, 150)
              }}
            >
              {/* solo renderizamos el link visible del primer nivel */}
              <AppNavLink
                item={{ ...submenuItem, submenu: undefined } as NavItem}
                className="block rounded-md px-3 py-2 text-sm text-white hover:bg-[#30BDCC] transition-colors duration-200"
                onDone={onDone}
              />
        
              {/* submenú lateral visible solo al hacer hover */}
              {submenuItem.submenu && hoveredIndex === i && (
                <ul
                  className="relative lg:absolute ps-5 lg:ps-0 lg:left-[98%] top-0 z-[60] w-56 rounded-md bg-none lg:bg-[#078199] p-2 text-white lg:shadow-xl lg:ring-1 ring-black/5 transition-all duration-150"
                  onMouseEnter={() => timerRef.current && clearTimeout(timerRef.current)}
                  onMouseLeave={() => {
                    timerRef.current = setTimeout(() => {
                      setHoveredIndex(null)
                    }, 150)
                  }}
                >
                  {submenuItem.submenu.map((subSubItem, j) => (
                    <li key={j}>
                      <AppNavLink
                        item={subSubItem as NavItem}
                        className="block rounded-md px-3 py-2 text-sm text-white hover:bg-[#30BDCC] hover:text-[#05353B] transition-colors duration-200"
                        onDone={onDone}
                      />
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
        
        )}
      </div>
    )
  }

  return (
    <Link
      to={item.href}
      className={className}
      onClick={handleAnchorClick}
      role="menuitem"
    >
      {item.label}
    </Link>
  )
}
//@ts-ignore
export default function Nav({ open, setOpen }) {
  const { authenticated } = useAuth()
    const isLarge = useIsLargeScreen()
    const navigate = useNavigate()
  return (
    <>
      <nav className={`menuhome flex items-center justify-center ${open ? 'py-2' : ''} lg:py-3`}>
        <ul className="hidden lg:flex items-center gap-2 text-center">
          {navItems.map((item) => (
            <li key={item.label}>
              <AppNavLink
                item={item}
                className="block px-3 py-2 rounded-md text-sm font-semibold text-white/90 hover:bg-[#30BDCC] hover:text-white transition-colors duration-200"
              />
            </li>
          ))}
        </ul>
      </nav>

      <div id="mobile-nav" className={`lg:hidden ${open ? 'block' : 'hidden'}`}>
        <ul className="grid">
          <li>
            <div className="flex flex-col lg:flex-row items-center gap-3 block lg:hidden pb-3">
                {authenticated ? (
                    <UserDropdown />
                ) : (
                    <div className="flex lg:flex-row items-center gap-3">
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
                            className="text-xs lg:text-sm border-0 text-primary"
                        >
                            {' '}
                            INICIAR SESIÓN
                        </Button>
                    </div>
                )}
            </div>
          </li>
          <li className="inline-flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-bold text-white lg:hidden text-xl">
              <svg
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              Menú
          </li>
          {navItems.map((item) => (
            <li key={item.label}>
              <AppNavLink
                item={item}
                className="border-t-1 border-primary rounded-none block rounded-md px-3 py-3 ps-6 lg:ps-0 lg:text-center text-sm font-medium text-white/95 hover:bg-white/10 hover:text-white transition-colors"
                onDone={() => setOpen(false)}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
