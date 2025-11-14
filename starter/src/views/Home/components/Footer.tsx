import { REDIRECT_KEY } from "./Nav"
import { Link, useNavigate } from 'react-router'
import { PiChartLineUpDuotone } from "react-icons/pi";
import { IoMdMap, IoLogoFacebook, IoLogoInstagram, IoLogoLinkedin, IoLogoYoutube, IoLogoTwitter } from "react-icons/io";
import { MdOutlineMonitor } from "react-icons/md";

const Footer = () => {
    const navigate = useNavigate();
    const handleClickLink = (e: React.MouseEvent, href: string) => {
        e.preventDefault();
        localStorage.setItem(
            REDIRECT_KEY,
            href.split('/').filter(Boolean)[0] || '/',
        )
        navigate(href)
    }
    return (
        <footer className="relative bg-[#078199] text-white">
            <div className="mx-auto max-w-full px-4 py-10">
                <div className="grid grid-cols-1 gap-10 md:grid-cols-5 justify-items-center">
                    {/* LOGO */}
                    <div className="space-y-3">
                        <img
                            src="/img/logo/logo_cenepred_white.png"
                            alt="CENEPRED"
                            className="w-auto object-contain m-auto"
                            loading="lazy"
                        />
                        <div className="flex text-xl gap-4 mt-4">
                            <div>
                                <a href="https://www.facebook.com/cenepred" aria-label="Ir al facebook de CENEPRED"><IoLogoFacebook /></a>
                            </div>
                            <div>
                                <a href="https://www.instagram.com/cenepredperu" aria-label="Ir al instagram de CENEPRED"><IoLogoInstagram /></a>
                            </div>
                            <div>
                                <a href="https://www.linkedin.com/company/cenepred/" aria-label="Ir al linkedin de CENEPRED"><IoLogoLinkedin /></a>
                            </div>
                            <div>
                                <a href="https://x.com/CENEPRED" aria-label="Ir al X o Twitter de CENEPRED"><IoLogoTwitter /></a>
                            </div>
                            <div>
                                <a href="https://www.youtube.com/@cenepredperu5018" aria-label="Ir al youtube de CENEPRED"><IoLogoYoutube /></a>
                            </div>
                        </div>
                    </div>

                    {/* HORARIO */}
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
                        <ul className="space-y-3 text-white">
                            <li className="flex items-start gap-3">
                                <svg
                                    className="mt-0.5 h-5 w-5 flex-none"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    role="img"
                                    aria-label="Ubicación"
                                >
                                    <title>Ubicación</title>
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
                                    role="img"
                                    aria-label="Documento"
                                >
                                    <title>Documento</title>
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

                    {/* ENLACES */}
                    <div className="space-y-3 uppercase">
                        {/*
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
                        */}
                        <ul className="space-y-3 text-white">
                            <li className="flex items-start gap-2 hover:underline">
                                <PiChartLineUpDuotone className="h-5 w-5"/>
                                <div>
                                    <Link
                                        to={'/gestion-procesos/lluviasAvisoMeteorologico/estatico'}
                                        onClick={(e) =>handleClickLink(e, '/gestion-procesos/lluviasAvisoMeteorologico/estatico')}
                                        role="menuitem"
                                    >
                                        <div className="text-sm">
                                            Gestión de procesos
                                        </div>
                                    </Link>
                                </div>
                            </li>
                            <li className="flex items-start gap-2 hover:underline">
                                <IoMdMap className="h-5 w-5" />
                                <div>
                                    <Link
                                        to={'/gestion-procesos/lluviasAvisoMeteorologico/estatico'}
                                        onClick={(e) =>handleClickLink(e, '/fortalecimiento/pprrdrapi')}
                                        role="menuitem"
                                    >
                                        <div className="text-sm">
                                            Fortalecimiento y<br/> asistencia técnica
                                        </div>
                                    </Link>
                                </div>
                            </li>
                            <li className="flex items-start gap-3 hover:underline">
                                <MdOutlineMonitor className="h-5 w-5" />
                                <div>
                                    <Link
                                        to={'/gestion-procesos/lluviasAvisoMeteorologico/estatico'}
                                        onClick={(e) =>handleClickLink(e, '/monitoreo/monitoreo')}
                                        role="menuitem"
                                    >
                                        <div className="text-sm">
                                            Monitoreo, seguimiento <br/>y evaluación
                                        </div>
                                    </Link>
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* CENTRAL TELEFÓNICA */}
                    <div className="space-y-3">
                        <h6 className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-wide text-white">
                            <svg
                                className="h-5 w-5"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                role="img"
                                aria-label="Teléfono"
                            >
                                <title>Teléfono</title>
                                <path d="M6.62 10.79a15.053 15.053 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.85 21 3 13.15 3 3a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.46.57 3.58a1 1 0 0 1-.24 1.01l-2.21 2.2Z" />
                            </svg>
                            Central telefónica
                        </h6>
                        <ul className="space-y-3 text-white">
                            <li className="flex items-start gap-3">
                                <svg
                                    className="mt-0.5 h-5 w-5 flex-none"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    role="img"
                                    aria-label="Correo postal"
                                >
                                    <title>Correo postal</title>
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
                                    role="img"
                                    aria-label="Ubicación oficina"
                                >
                                    <title>Ubicación oficina</title>
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

                    {/* CONTACTO */}
                    <div className="space-y-3">
                        <h6 className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-wide text-white">
                            <svg
                                className="h-5 w-5"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                role="img"
                                aria-label="Correo electrónico"
                            >
                                <title>Correo electrónico</title>
                                <path d="M2.25 6.75A2.75 2.75 0 0 1 5 4h14a2.75 2.75 0 0 1 2.75 2.75v10.5A2.75 2.75 0 0 1 19 20H5a2.75 2.75 0 0 1-2.75-2.75ZM5 7.5l7 4.375L19 7.5" />
                            </svg>
                            Contáctenos
                        </h6>
                        <ul className="space-y-3 text-white">
                            <li className="flex items-start gap-3">
                                <svg
                                    className="mt-0.5 h-5 w-5 flex-none"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    role="img"
                                    aria-label="Correo electrónico"
                                >
                                    <title>Correo electrónico</title>
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
                <div className="mt-4 text-center text-xs text-white">
                    © Copyrights 2025, Todos los derechos reservados por{' '}
                    <span className="font-semibold">CENEPRED</span>.
                </div>
            </div>
        </footer>
    )
}

export default Footer


