import { useAuth } from '@/auth'
import { Notification, toast } from '@/components/ui'
import { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router'

const REDIRECT_KEY = 'redirectTo'

type SubMenuItem = {
  label: string
  href: string
  external?: boolean
  protected?: boolean
  submenu?: SubMenuItem[]
  ariaLabel?: string
  title?: string
}

type NavItem = {
  label: string
  href: string
  external?: boolean
  protected?: boolean
  submenu?: SubMenuItem[]
  ariaLabel?: string
  title?: string
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
        ariaLabel: 'Abrir Normas Legales GRD en una nueva pestaña',
        title: 'Normas legales vigentes sobre Gestión del Riesgo de Desastres',
      },
      {
        label: 'Glosario de Términos GRD',
        external: true,
        href: 'https://dimse.cenepred.gob.pe/simse/glosario',
        ariaLabel: 'Abrir Glosario de Términos GRD en una nueva pestaña',
        title: 'Glosario oficial de términos utilizados en GRD',
      },
      {
        label: 'Directorio Nacional GRD',
        href: '#',
        ariaLabel: 'Abrir opciones del Directorio Nacional GRD',
        submenu: [
          {
            label: 'Responsable por entidad',
            href: '/sign-in?next=/monitoreo/directorioNacional',
            ariaLabel: 'Acceder al Directorio Nacional de responsables GRD por entidad',
          },
          {
            label: 'Visor',
            external: true,
            href: 'https://dimse.cenepred.gob.pe/mapadirectorio/Views/',
            ariaLabel: 'Abrir el visor geográfico del Directorio Nacional GRD',
          },
        ],
      },
    ],
  },
  {
    label: 'SIGRID',
    href: '#',
    ariaLabel: 'Abrir opciones de la Plataforma SIGRID',
    submenu: [
      {
        label: 'Plataforma SIGRID',
        external: true,
        href: 'https://sigrid.cenepred.gob.pe/',
        ariaLabel: 'Abrir Plataforma SIGRID en una nueva pestaña',
      },
      {
        label: 'Visor SIGRID',
        external: true,
        href: 'https://sigrid.cenepred.gob.pe/sigridv3/mapa?id=0',
        ariaLabel: 'Abrir Visor SIGRID en una nueva pestaña',
      },
    ],
  },
  {
    label: 'GESTIÓN DE PROCESOS',
    href: '/gestion-procesos/lluviasAvisoMeteorologico/estatico',
    protected: true,
    ariaLabel: 'Acceder al módulo de Gestión de Procesos de GRD',
  },
  {
    label: 'FORTALECIMIENTO Y ASISTENCIA TÉCNICA',
    href: '/fortalecimiento/pprrdrapi',
    protected: true,
    ariaLabel: 'Acceder al módulo de Fortalecimiento y Asistencia Técnica',
  },
  {
    label: 'MONITOREO, SEGUIMIENTO Y EVALUACIÓN',
    href: '/monitoreo/monitoreo',
    protected: true,
    ariaLabel: 'Acceder al módulo de Monitoreo, Seguimiento y Evaluación',
  },
  {
    label: 'AULA VIRTUAL',
    href: 'https://aulavirtual.cenepred.gob.pe/',
    external: true,
    ariaLabel: 'Abrir Aula Virtual CENEPRED en una nueva pestaña',
  },
  {
    label: 'BUENAS PRÁCTICAS',
    href: 'https://buenaspracticas.cenepred.gob.pe/',
    external: true,
    ariaLabel: 'Abrir portal de Buenas Prácticas en Gestión del Riesgo de Desastres',
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
          className="absolute left-0 top-full mt-2 z-50 w-56 rounded-md bg-[#078199] p-2 text-white shadow-lg ring-1 ring-black/5 transition-all duration-150"
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
                  className="absolute left-[98%] top-0 z-[60] w-56 rounded-md bg-[#078199] p-2 text-white shadow-xl ring-1 ring-black/5 transition-all duration-150"
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

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <nav className="menuhome flex items-center justify-center py-3">
        <ul className="hidden lg:flex items-center gap-8"  role="menubar" aria-label="Menú principal del portal CENEPRED" >
          {navItems.map((item) => (
            <li key={item.label} role="none">
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

      <div id="mobile-nav" className={`lg:hidden ${open ? 'block' : 'hidden'}`}>
        <ul className="grid gap-2 pb-3">
          {navItems.map((item) => (
            <li key={item.label}>
              <AppNavLink
                item={item}
                className="block rounded-md px-3 py-2 text-sm text-white hover:bg-[#067E91] hover:text-white transition-colors duration-200"
                onDone={() => setOpen(false)}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
