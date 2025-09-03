import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const navItems = [
    { label: 'INICIO', href: '/' },
    {
        label: 'SIGRID',
        href: 'https://sigrid.cenepred.gob.pe/sigridv3/',
        external: true,
    },
    { label: 'GESTIÓN DE PROCESOS', href: '/sign-in' },
    { label: 'FORTALECIMIENTO Y ASISTENCIA TÉCNICA', href: '/sign-in' },
    {
        label: 'MONITOREO, SEGUIMIENTO, SUPERVISIÓN Y EVALUACIÓN',
        href: '/sign-in',
    },
    { label: 'AULA VIRTUAL DE MONITOREO', href: '/sign-in' },
    { label: 'BUENAS PRÁCTICAS', href: '/sign-in' },
]

/*
https://sigrid.cenepred.gob.pe/sigridv3/
*/
export default function Default() {
    const [open, setOpen] = useState(false)

    const mapUrl =
        'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2100&auto=format&fit=crop'

    return (
        <div className="flex min-h-screen w-full flex-col bg-slate-50 text-slate-800">
            <header className="border-b border-slate-200 bg-white">
                <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4">
                    <div className="flex items-center gap-3">
                        <img
                            src="/img/logo/logo-cenepred.jpg"
                            alt="CENEPRED"
                            className="h-12 md:h-14 w-auto object-contain"
                            loading="lazy"
                        />
                    </div>

                    <div className="hidden items-center gap-3 md:flex">
                        <img
                            src="/img/logo/logo_sigrid.png"
                            alt="CENEPRED"
                            className="h-12 md:h-14 w-auto object-contain"
                            loading="lazy"
                            onClick={() =>
                                window.open(
                                    'https://sigrid.cenepred.gob.pe/sigridv3/',
                                    '_blank',
                                )
                            }
                        />
                    </div>
                </div>

                <div className="w-full text-white shadow-sm bg-[#0097a7]">
                    <div className="mx-auto max-w-7xl px-4 py-3">
                        <nav className="flex items-center justify-between md:justify-center gap-2 py-3">
                            <ul className="hidden md:flex items-center gap-8">
                                {navItems.map((item) => (
                                    <li
                                        key={item.label}
                                        className="group relative"
                                    >
                                        <Link
                                            to={item.href}
                                            className="block px-2 text-center text-sm font-semibold tracking-wide text-white/90
               transition-colors duration-200 group-hover:text-white"
                                        >
                                            <a
                                                href={item.href} // El href para los enlaces externos
                                                target="_blank" // Abrir en una nueva pestaña
                                                rel="noopener noreferrer" // Seguridad adicional al abrir enlaces externos
                                            >
                                                {item.label}
                                            </a>
                                        </Link>
                                        <span
                                            className="pointer-events-none absolute -bottom-1 left-1/2 h-0.5 w-0 -translate-x-1/2
                         bg-white/80 transition-all duration-200 group-hover:w-10"
                                        />
                                    </li>
                                ))}
                            </ul>

                            <button
                                type="button"
                                className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium
                   ring-1 ring-inset ring-white/20 hover:bg-white/10 md:hidden"
                                aria-expanded={open}
                                aria-controls="mobile-nav"
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

                        {open && (
                            <div id="mobile-nav" className="md:hidden">
                                <ul className="grid gap-2 pb-3">
                                    {navItems.map((item) => (
                                        <li key={item.label}>
                                            <a
                                                href={item.href}
                                                className="block rounded-md px-3 py-2 text-center text-sm font-medium
                           text-white/95 hover:bg-teal-600 hover:text-white transition-colors"
                                                onClick={() => setOpen(false)}
                                            >
                                                {item.label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            <main className="flex-1 mx-auto w-full max-w-7xl px-0 py-8">
                <section
                    className="
            relative overflow-hidden bg-white ring-1 ring-slate-200 shadow-sm
            h-[calc(100dvh-var(--chrome))] min-h-[70vh]
            md:rounded-2xl
          "
                >
                    {/* Imagen ocupa TODO el alto disponible */}
                    <img
                        src={mapUrl}
                        alt="Mapa de la zona con polígonos de riesgo"
                        className="h-full w-full object-cover"
                    />

                    {/* Overlays */}
                    <svg
                        className="pointer-events-none absolute inset-0 h-full w-full"
                        viewBox="0 0 1920 1080"
                        preserveAspectRatio="none"
                    >
                        <polygon
                            points="820,520 900,480 980,520 940,580 860,570"
                            className="fill-yellow-400/60 stroke-yellow-600/70"
                            strokeWidth="3"
                        />
                        <polygon
                            points="650,610 720,580 780,630 730,690 660,660"
                            className="fill-red-500/60 stroke-red-700/70"
                            strokeWidth="3"
                        />
                        <polygon
                            points="1320,280 1400,250 1450,310 1380,360 1310,330"
                            className="fill-red-500/60 stroke-red-700/70"
                            strokeWidth="3"
                        />
                    </svg>

                    {/* Leyenda */}
                    <div className="absolute right-4 top-4 flex flex-col items-end gap-2">
                        <div className="rounded-lg bg-white/90 px-3 py-2 text-xs shadow-sm ring-1 ring-slate-200 backdrop-blur">
                            <div className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-slate-600">
                                Leyenda
                            </div>
                            <ul className="space-y-1 text-[12px]">
                                <li className="flex items-center gap-2">
                                    <span className="inline-block h-3 w-3 rounded-sm bg-red-500 ring-1 ring-red-700/60" />
                                    Zona de alto riesgo
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="inline-block h-3 w-3 rounded-sm bg-yellow-400 ring-1 ring-yellow-600/60" />
                                    Zona de riesgo medio
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="relative bg-[#0097a7] text-white">
                <div className="mx-auto max-w-7xl px-4 py-10">
                    <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
                        <div className="space-y-3">
                            <img
                                src="/img/logo/logo_cenepred_white.png"
                                alt="CENEPRED"
                                className="w-auto object-contain"
                                loading="lazy"
                            />
                        </div>

                        <div className="space-y-3">
                            <h6 className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-wide text-white">
                                <svg
                                    className="h-5 w-5"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    role="img"
                                    aria-label="Horario"
                                >
                                    <title>Horario</title>
                                    <circle cx="12" cy="12" r="9" />
                                    <path d="M12 7v5l3 2" />
                                </svg>
                                Horario de atención
                            </h6>
                            <ul className="space-y-3 text-white/90">
                                <li className="flex items-start gap-3">
                                    <svg
                                        className="mt-0.5 h-5 w-5 flex-none"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                    >
                                        <path d="M12 2c-4.97 0-9 4.03-9 9 0 7.5 9 11 9 11s9-3.5 9-11c0-4.97-4.03-9-9-9Zm0 12.25a3.25 3.25 0 1 1 0-6.5 3.25 3.25 0 0 1 0 6.5Z" />
                                    </svg>
                                    <div>
                                        <div className="text-sm">
                                            Lunes a Viernes:
                                        </div>
                                        <div className="text-sm">
                                            8:30 a. m. a 5:30 p. m.
                                        </div>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <svg
                                        className="mt-0.5 h-5 w-5 flex-none"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                    >
                                        <path d="M4 4.75A2.75 2.75 0 0 1 6.75 2h10.5A2.75 2.75 0 0 1 20 4.75v14.5A2.75 2.75 0 0 1 17.25 22H6.75A2.75 2.75 0 0 1 4 19.25Zm3.5.75a.75.75 0 0 0 0 1.5h9a.75.75 0 0 0 0-1.5Zm0 4a.75.75 0 0 0 0 1.5h9a.75.75 0 0 0 0-1.5Z" />
                                    </svg>
                                    <div>
                                        <div className="text-sm">
                                            Mesa de partes:
                                        </div>
                                        <div className="text-sm">
                                            8:30 a. m. a 4:30 p. m.
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div className="space-y-3">
                            <h6 className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-wide text-white">
                                <svg
                                    className="h-5 w-5"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M6.62 10.79a15.053 15.053 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.85 21 3 13.15 3 3a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.46.57 3.58a1 1 0 0 1-.24 1.01l-2.21 2.2Z" />
                                </svg>
                                Central telefónica
                            </h6>
                            <ul className="space-y-3 text-white/90">
                                <li className="flex items-start gap-3">
                                    <svg
                                        className="mt-0.5 h-5 w-5 flex-none"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                    >
                                        <path d="M2.25 6.75A2.75 2.75 0 0 1 5 4h14a2.75 2.75 0 0 1 2.75 2.75v10.5A2.75 2.75 0 0 1 19 20H5a2.75 2.75 0 0 1-2.75-2.75ZM5 6.5a1 1 0 0 0 0 2h14a1 1 0 1 0 0-2Z" />
                                    </svg>
                                    <div className="text-sm">
                                        +51 (01) 2013550
                                        <br />
                                        Anexos 124, 126, 127
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <svg
                                        className="mt-0.5 h-5 w-5 flex-none"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                    >
                                        <path d="M12 2C7.03 2 3 6.03 3 11c0 6.63 8.02 10.58 8.36 10.75.42.2.9.2 1.32 0C12.98 21.58 21 17.63 21 11 21 6.03 16.97 2 12 2Zm0 13a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7Z" />
                                    </svg>
                                    <div className="text-sm">
                                        Av. Del Parque Norte 829 - 833
                                        <br />
                                        San Isidro Lima - Perú
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div className="space-y-3">
                            <h6 className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-wide text-white">
                                <svg
                                    className="h-5 w-5"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M2.25 6.75A2.75 2.75 0 0 1 5 4h14a2.75 2.75 0 0 1 2.75 2.75v10.5A2.75 2.75 0 0 1 19 20H5a2.75 2.75 0 0 1-2.75-2.75ZM5 7.5l7 4.375L19 7.5" />
                                </svg>
                                Contáctenos
                            </h6>
                            <ul className="space-y-3 text-white/90">
                                <li className="flex items-start gap-3">
                                    <svg
                                        className="mt-0.5 h-5 w-5 flex-none"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                    >
                                        <path d="M2.25 6.75A2.75 2.75 0 0 1 5 4h14a2.75 2.75 0 0 1 2.75 2.75v10.5A2.75 2.75 0 0 1 19 20H5a2.75 2.75 0 0 1-2.75-2.75ZM5 7.5l7 4.375L19 7.5" />
                                    </svg>
                                    <a
                                        href="mailto:soporte-sigrid@cenepred.gob.pe"
                                        className="text-sm underline decoration-white/40 underline-offset-2 hover:decoration-white"
                                    >
                                        soporte-sigrid@cenepred.gob.pe
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Separador y copyright */}
                    <div className="mt-8 h-px w-full bg-white/70" />
                    <div className="mt-4 text-center text-xs text-white/90">
                        © Copyrights 2025, Todos los derechos reservados por{' '}
                        <span className="font-semibold">CENEPRED</span>.
                    </div>
                </div>
            </footer>
        </div>
    )
}
