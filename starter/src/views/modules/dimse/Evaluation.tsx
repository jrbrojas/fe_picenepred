import React from 'react'
import ResumenTablasApiladas from './Data'

const StatCard = ({
    title,
    value,
    caption,
    icon,
}: {
    title: string
    value: string
    caption: string
    icon: React.ReactNode
}) => (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-start justify-between">
            <div>
                <div className="text-sm font-medium text-slate-500">
                    {title}
                </div>
                <div className="mt-2 text-4xl font-extrabold tracking-tight text-indigo-700">
                    {value}
                </div>
                <div className="mt-1 flex items-center gap-2 text-[13px] font-semibold text-emerald-600">
                    <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        className="fill-current"
                    >
                        <path d="M13 7l5 5-1.5 1.5L13 10.5V20h-2v-9.5L7.5 13.5 6 12l5-5h2z" />
                    </svg>
                    {caption}
                </div>
            </div>
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-indigo-50 text-indigo-600 ring-1 ring-indigo-100">
                {icon}
            </div>
        </div>
    </div>
)

export default function ResumenNacional() {
    return (
        <>
            <div className="min-h-screen w-full bg-slate-50">
                <div className="mx-auto max-w-7xl px-4 py-8">
                    <h1 className="text-3xl font-extrabold tracking-wide text-slate-800">
                        RESUMEN - NIVEL NACIONAL
                    </h1>

                    <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
                        <StatCard
                            title="PPRRD Aprobados"
                            value="638"
                            caption="Aprobados"
                            icon={
                                <svg viewBox="0 0 24 24" className="h-6 w-6">
                                    <path
                                        className="fill-current"
                                        d="M5 4h14a1 1 0 011 1v13l-4-3H5a1 1 0 01-1-1V5a1 1 0 011-1z"
                                    />
                                </svg>
                            }
                        />
                        <StatCard
                            title="PPRRD Vigentes"
                            value="405"
                            caption="Vigentes"
                            icon={
                                <svg viewBox="0 0 24 24" className="h-6 w-6">
                                    <path
                                        className="fill-current"
                                        d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h10v2H4v-2z"
                                    />
                                </svg>
                            }
                        />
                        <StatCard
                            title="EVAR Entidades Asistidas"
                            value="125"
                            caption="Entidades"
                            icon={
                                <svg viewBox="0 0 24 24" className="h-6 w-6">
                                    <path
                                        className="fill-current"
                                        d="M16 11c1.66 0 2.99-1.34 2.99-3A3 3 0 0016 5a3 3 0 000 6zm-8 0a3 3 0 100-6 3 3 0 000 6zm0 2c-2.33 0-7 1.17-7 3.5V20h14v-3.5C15 14.17 10.33 13 8 13zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.95 1.97 3.45V20h6v-3.5c0-2.33-4.67-3.5-7-3.5z"
                                    />
                                </svg>
                            }
                        />
                        <StatCard
                            title="OTROS Planes Aprobados"
                            value="601"
                            caption="Aprobados"
                            icon={
                                <svg viewBox="0 0 24 24" className="h-6 w-6">
                                    <path
                                        className="fill-current"
                                        d="M3 6c0-1.1 3.58-2 9-2s9 .9 9 2-3.58 2-9 2-9-.9-9-2zm0 6c0-1.1 3.58-2 9-2s9 .9 9 2-3.58 2-9 2-9-.9-9-2zm0 6c0-1.1 3.58-2 9-2s9 .9 9 2-3.58 2-9 2-9-.9-9-2z"
                                    />
                                </svg>
                            }
                        />
                    </div>
                    <div className="mt-7 grid grid-cols-1 gap-6 xl:grid-cols-3">
                        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                            <h3 className="text-center text-base font-extrabold text-slate-700">
                                SELECCIONE EL DEPARTAMENTO
                            </h3>

                            <div className="relative mt-5 aspect-[4/5] w-full overflow-hidden rounded-xl ring-1 ring-slate-200">
                                <img
                                    src="https://thumbs.dreamstime.com/b/mapa-de-provincias-per%C3%BA-un-gris-dividido-en-188540518.jpg"
                                    alt="Mapa del Perú"
                                    className="h-full w-full object-contain"
                                    loading="lazy"
                                />

                                <div className="absolute left-3 top-3 flex flex-col gap-2">
                                    <button className="grid h-8 w-8 place-items-center rounded-md bg-white text-slate-700 shadow ring-1 ring-slate-200">
                                        +
                                    </button>
                                    <button className="grid h-8 w-8 place-items-center rounded-md bg-white text-slate-700 shadow ring-1 ring-slate-200">
                                        −
                                    </button>
                                </div>
                                <button className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-md bg-white text-slate-700 shadow ring-1 ring-slate-200">
                                    <svg
                                        viewBox="0 0 24 24"
                                        className="h-5 w-5"
                                    >
                                        <path
                                            className="fill-current"
                                            d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"
                                        />
                                    </svg>
                                </button>
                                <button className="absolute bottom-3 left-3 grid h-9 w-9 place-items-center rounded-md bg-white text-slate-700 shadow ring-1 ring-slate-200">
                                    <svg
                                        viewBox="0 0 24 24"
                                        className="h-5 w-5"
                                    >
                                        <path
                                            className="fill-current"
                                            d="M12 7l5 3v6l-5 3-5-3V10l5-3m0-2L4 9v8l8 4 8-4V9l-8-4z"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                            <h3 className="text-center text-base font-extrabold text-slate-700">
                                CURSOS BÁSICOS Y ESPECIALIZADOS
                            </h3>

                            <div className="mt-4 overflow-hidden rounded-xl bg-white">
                                <svg
                                    viewBox="0 0 700 360"
                                    className="h-[340px] w-full"
                                >
                                    <g stroke="#e2e8f0" strokeWidth="1">
                                        {Array.from({ length: 6 }).map(
                                            (_, i) => (
                                                <line
                                                    key={i}
                                                    x1="60"
                                                    x2="690"
                                                    y1={300 - i * 50}
                                                    y2={300 - i * 50}
                                                />
                                            ),
                                        )}
                                    </g>
                                    {/* eje Y */}
                                    <line
                                        x1="60"
                                        y1="40"
                                        x2="60"
                                        y2="300"
                                        stroke="#94a3b8"
                                    />
                                    {/* series */}
                                    {[
                                        {
                                            x: 90,
                                            h: [
                                                40, 60, 150, 220, 260, 300, 340,
                                                320, 280,
                                            ],
                                            c: '#6366f1',
                                        },
                                        {
                                            x: 110,
                                            h: [
                                                10, 30, 60, 120, 150, 160, 180,
                                                140, 120,
                                            ],
                                            c: '#22c55e',
                                        },
                                    ].map((s, si) =>
                                        s.h.map((h, i) => (
                                            <rect
                                                key={`${si}-${i}`}
                                                x={s.x + i * 60}
                                                y={300 - h}
                                                width="18"
                                                height={h}
                                                rx="4"
                                                fill={s.c}
                                                opacity={si === 1 ? 0.9 : 0.9}
                                            />
                                        )),
                                    )}
                                    <text
                                        x="120"
                                        y="340"
                                        fontSize="11"
                                        fill="#475569"
                                    >
                                        2017 2018 2019 2020 2021 2022 2023 2024
                                        2025
                                    </text>
                                    <rect
                                        x="120"
                                        y="20"
                                        width="10"
                                        height="10"
                                        fill="#6366f1"
                                    />
                                    <text
                                        x="135"
                                        y="29"
                                        fontSize="12"
                                        fill="#334155"
                                    >
                                        Formación Básica
                                    </text>
                                    <rect
                                        x="280"
                                        y="20"
                                        width="10"
                                        height="10"
                                        fill="#22c55e"
                                    />
                                    <text
                                        x="295"
                                        y="29"
                                        fontSize="12"
                                        fill="#334155"
                                    >
                                        Formación Especializada
                                    </text>
                                </svg>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                            <h3 className="text-center text-base font-extrabold text-slate-700">
                                CURSOS Y PERSONAS CAPACITADAS
                            </h3>

                            <div className="mt-4 overflow-hidden rounded-xl bg-white">
                                <svg
                                    viewBox="0 0 700 360"
                                    className="h-[340px] w-full"
                                >
                                    <g stroke="#e2e8f0" strokeWidth="1">
                                        {Array.from({ length: 7 }).map(
                                            (_, i) => (
                                                <line
                                                    key={i}
                                                    x1="60"
                                                    x2="690"
                                                    y1={300 - i * 40}
                                                    y2={300 - i * 40}
                                                />
                                            ),
                                        )}
                                    </g>
                                    <line
                                        x1="60"
                                        y1="40"
                                        x2="60"
                                        y2="300"
                                        stroke="#94a3b8"
                                    />
                                    <polyline
                                        fill="none"
                                        stroke="#2563eb"
                                        strokeWidth="2"
                                        points="70,295 130,285 190,240 250,220 310,225 370,220 430,230 490,210 550,240"
                                    />
                                    {[
                                        [70, 295],
                                        [130, 285],
                                        [190, 240],
                                        [250, 220],
                                        [310, 225],
                                        [370, 220],
                                        [430, 230],
                                        [490, 210],
                                        [550, 240],
                                    ].map(([x, y], i) => (
                                        <circle
                                            key={i}
                                            cx={x}
                                            cy={y}
                                            r="4"
                                            fill="#2563eb"
                                        />
                                    ))}
                                    <polyline
                                        fill="none"
                                        stroke="#ef4444"
                                        strokeWidth="2.5"
                                        points="70,300 130,295 190,360 250,310 310,280 370,260 430,240 490,180 550,260"
                                    />
                                    {[
                                        [70, 300],
                                        [130, 295],
                                        [190, 360],
                                        [250, 310],
                                        [310, 280],
                                        [370, 260],
                                        [430, 240],
                                        [490, 180],
                                        [550, 260],
                                    ].map(([x, y], i) => (
                                        <circle
                                            key={i}
                                            cx={x}
                                            cy={y}
                                            r="4.5"
                                            fill="#ef4444"
                                        />
                                    ))}
                                    <text
                                        x="120"
                                        y="340"
                                        fontSize="11"
                                        fill="#475569"
                                    >
                                        2017 2018 2019 2020 2021 2022 2023 2024
                                        2025
                                    </text>
                                    <circle
                                        cx="120"
                                        cy="22"
                                        r="5"
                                        fill="#ef4444"
                                    />
                                    <text
                                        x="135"
                                        y="26"
                                        fontSize="12"
                                        fill="#334155"
                                    >
                                        cursos
                                    </text>
                                    <circle
                                        cx="190"
                                        cy="22"
                                        r="5"
                                        fill="#2563eb"
                                    />
                                    <text
                                        x="205"
                                        y="26"
                                        fontSize="12"
                                        fill="#334155"
                                    >
                                        personas
                                    </text>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
                <ResumenTablasApiladas />
            </div>
        </>
    )
}
