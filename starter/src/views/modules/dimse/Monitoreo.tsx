/* import { useState, useMemo } from 'react'
import Card from '@/components/ui/Card'
import Segment from '@/components/ui/Segment'
import ApexChart from 'react-apexcharts'
import { COLORS } from '@/constants/chart.constant'

const COLS = Array.from({ length: 30 }, (_, i) => `P${i + 1}`)

type Row = {
    nivel: 'Departamento' | 'Provincia' | 'Distrito'
    region: string
    values: (number | '' | null)[]
    total?: number | string
}

const datita = {
    campagin: [440, 505, 414, 671, 227, 413, 201, 352, 752, 320, 257, 160],
    email: [23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 12, 16],
    label: [
        '01 Jan',
        '02 Jan',
        '03 Jan',
        '04 Jan',
        '05 Jan',
        '06 Jan',
        '07 Jan',
        '08 Jan',
        '09 Jan',
        '10 Jan',
        '11 Jan',
        '12 Jan',
    ],
}

const rows: Row[] = [
    {
        nivel: 'Departamento',
        region: 'Lima',
        values: Array(30).fill(''),
        total: '75%',
    },
    {
        nivel: 'Provincia',
        region: 'Lima',
        values: Array(30).fill(''),
        total: '50%',
    },

    {
        nivel: 'Distrito',
        region: 'Comas',
        values: [
            1,
            '',
            1,
            '',
            1,
            '',
            '',
            '',
            '',
            '',
            '',
            1,
            '',
            1,
            '',
            1,
            '',
            1,
            1,
            1,
            1,
            '',
            1,
            '',
            1,
            '',
            1,
            '',
            1,
        ],
    },
    {
        nivel: 'Distrito',
        region: 'San Borja',
        values: [
            1,
            1,
            '',
            1,
            '',
            '',
            '',
            1,
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
        ],
    },
    { nivel: 'Distrito', region: 'San Isidro', values: Array(30).fill(0) },
    { nivel: 'Distrito', region: 'San Miguel', values: Array(30).fill(0) },

    {
        nivel: 'Provincia',
        region: 'Barranca',
        values: Array(30).fill(''),
        total: '100%',
    },
    { nivel: 'Distrito', region: 'Barranca', values: Array(30).fill(1) },
    { nivel: 'Distrito', region: 'Paramonga', values: Array(30).fill(1) },
]

function computeTotal(row: Row) {
    if (typeof row.total !== 'undefined') return row.total
    const sum = row.values.reduce(
        (acc: number, v) => (typeof v === 'number' ? acc + v : acc),
        0,
    )
    return sum
}

export default function MonitoreoTabla() {
    const [category, setCategory] = useState('all')

    const series = useMemo(() => {
        const campaignSeries = {
            name: 'Campaign (ROI)',
            type: 'column',
            data: datita.campagin,
            color: function ({
                dataPointIndex,
                value,
            }: {
                dataPointIndex: number
                value: number
            }) {
                if (
                    dataPointIndex > 0 &&
                    value < datita.campagin[dataPointIndex - 1]
                ) {
                    return COLORS[7]
                }
                return COLORS[9]
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } as any,
        }

        const emailSeries = {
            name: 'Email (ROI)',
            type: 'line',
            data: datita.email,
            color: COLORS[0],
        }

        if (category === 'all') {
            return [campaignSeries, emailSeries]
        }

        if (category === 'campagin') {
            return [campaignSeries]
        }

        if (category === 'email') {
            return [emailSeries]
        }

        return []
    }, [category])
    return (
        <>
            <div className="relative w-full">
                <div className="text-center">
                    <h2 className="text-sm font-medium uppercase tracking-wide text-slate-600">
                        MONITOREO
                    </h2>
                    <p className="text-[13px] text-slate-500">
                        (INPLEM POLITICA Y PLAN)
                    </p>
                </div>

                <div className="mt-6 overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm">
                    <table className="min-w-[1200px] table-fixed border-separate border-spacing-0">
                        <thead>
                            <tr>
                                <th className="sticky left-0 z-20 w-[140px] bg-white p-2 text-left text-[12px] font-semibold text-slate-700 ring-1 ring-slate-200">
                                    Ámbito
                                </th>
                                <th className="sticky left-[140px] z-20 w-[220px] bg-white p-2 text-left text-[12px] font-semibold text-slate-700 ring-1 ring-slate-200">
                                    Regiones
                                </th>
                                {COLS.map((c) => (
                                    <th
                                        key={c}
                                        className="min-w-[44px] bg-white p-2 text-center text-[12px] font-semibold text-slate-700 ring-1 ring-slate-200"
                                    >
                                        {c}
                                    </th>
                                ))}
                                <th className="min-w-[80px] bg-white p-2 text-center text-[12px] font-semibold text-slate-700 ring-1 ring-slate-200">
                                    TOTAL PTS
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {rows.map((row, idx) => (
                                <tr key={idx} className="even:bg-slate-50/40">
                                    <td className="sticky left-0 z-10 whitespace-nowrap p-2 text-[12px] font-medium text-slate-600 ring-1 ring-slate-200 bg-white">
                                        {row.nivel}
                                    </td>

                                    <td className="sticky left-[140px] z-10 truncate p-2 text-[12px] text-slate-700 ring-1 ring-slate-200 bg-white">
                                        <span
                                            className={
                                                row.nivel === 'Provincia' ||
                                                row.nivel === 'Departamento'
                                                    ? 'font-semibold text-slate-700'
                                                    : 'text-sky-700 underline'
                                            }
                                        >
                                            {row.region}
                                        </span>
                                    </td>
                                    {COLS.map((_, i) => (
                                        <td
                                            key={i}
                                            className="p-2 text-center text-[12px] text-slate-700 ring-1 ring-slate-200"
                                        >
                                            {row.values[i] === 0 ||
                                            row.values[i] === 1
                                                ? row.values[i]
                                                : ''}
                                        </td>
                                    ))}

                                    <td className="p-2 text-center text-[12px] font-semibold text-slate-800 ring-1 ring-slate-200">
                                        {computeTotal(row)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                        <tfoot>
                            <tr>
                                <td
                                    colSpan={2}
                                    className="bg-white p-2 text-right text-[11px] text-slate-500 ring-1 ring-slate-200"
                                ></td>
                                <td
                                    colSpan={COLS.length}
                                    className="bg-white p-2 text-center text-[11px] text-slate-500 ring-1 ring-slate-200"
                                >
                                    Valor de clasificación:{' '}
                                    <span className="font-medium">0, 1</span>
                                </td>
                                <td className="bg-white p-2 ring-1 ring-slate-200" />
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
                <div className="relative min-h-[450px] rounded-xl overflow-hidden ring-1 ring-slate-200 bg-slate-100">
                    <img
                        src="https://es.maps-peru.com/img/0/mapa-f%C3%ADsico-de-per%C3%BA.jpg"
                        alt="Vista de referencia"
                        className="absolute left-1/2 top-1/2
      -translate-x-1/2 -translate-y-1/2
      max-w-[100%] max-h-[100%]  
      object-contain"
                        loading="lazy"
                    />
                </div>
                <Card className="h-full">
                    <div className="flex items-center justify-between">
                        <h4>Ads performance</h4>
                        <div>
                            <Segment
                                className="gap-1"
                                value={category}
                                size="sm"
                                onChange={(val) => setCategory(val as string)}
                            >
                                <Segment.Item value="all">All</Segment.Item>
                                <Segment.Item value="campagin">
                                    Campagin
                                </Segment.Item>
                                <Segment.Item value="email">Email</Segment.Item>
                            </Segment>
                        </div>
                    </div>

                    <div className="mt-6">
                        <ApexChart
                            options={{
                                chart: {
                                    type: 'line',
                                    zoom: { enabled: false },
                                    toolbar: { show: false },
                                },
                                legend: { show: false },
                                stroke: {
                                    width:
                                        category === 'email' ? 2.5 : [0, 2.5],
                                    curve: 'smooth',
                                    lineCap: 'round',
                                },
                                states: { hover: { filter: { type: 'none' } } },
                                tooltip: {
                                    custom: ({ series, dataPointIndex }) => {
                                        const renderCampaignData = () => `
                <div class="flex items-center gap-2">
                  <div class="h-[10px] w-[10px] rounded-full" style="background-color: ${COLORS[9]}"></div>
                  <div class="flex gap-2">Campaign: <span class="font-bold">${series[0][dataPointIndex]}</span></div>
                </div>`
                                        const renderEmailData = () => `
                <div class="flex items-center gap-2">
                  <div class="h-[10px] w-[10px] rounded-full" style="background-color: ${COLORS[0]}"></div>
                  <div class="flex gap-2">Email: <span class="font-bold">${
                      series[category === 'all' ? 1 : 0][dataPointIndex]
                  }</span></div>
                </div>`
                                        const content =
                                            category === 'all'
                                                ? `${renderCampaignData()}${renderEmailData()}`
                                                : category === 'campagin'
                                                  ? renderCampaignData()
                                                  : renderEmailData()
                                        return `
                <div class="py-2 px-4 rounded-xl">
                  <div class="flex flex-col gap-2">
                    <div>${datita.label[dataPointIndex]}</div>
                    ${content}
                  </div>
                </div>`
                                    },
                                },
                                labels: datita.label,
                                yaxis:
                                    category === 'all'
                                        ? [{}, { opposite: true }]
                                        : [],
                                plotOptions: {
                                    bar: {
                                        horizontal: false,
                                        columnWidth: '35px',
                                        borderRadius: 4,
                                        borderRadiusApplication: 'end',
                                    },
                                },
                            }}
                            series={series}
                            height={450}
                        />
                    </div>
                </Card>
            </div>
        </>
    )
}
 */

import { Fragment, useMemo, useState } from 'react'
import Card from '@/components/ui/Card'
import Segment from '@/components/ui/Segment'
import ApexChart from 'react-apexcharts'
import { COLORS } from '@/constants/chart.constant'

const datita = {
    campagin: [440, 505, 414, 671, 227, 413, 201, 352, 752, 320, 257, 160],
    email: [23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 12, 16],
    label: [
        '01 Jan',
        '02 Jan',
        '03 Jan',
        '04 Jan',
        '05 Jan',
        '06 Jan',
        '07 Jan',
        '08 Jan',
        '09 Jan',
        '10 Jan',
        '11 Jan',
        '12 Jan',
    ],
}

type Distrito = {
    id: string
    nombre: string
    valores: number[] // [P1..P5] 0/1
}

type Provincia = {
    id: string
    nombre: string
    distritos: Distrito[]
}

type Departamento = {
    id: string
    nombre: string
    provincias: Provincia[]
}

const COLS = [
    'P1',
    'P2',
    'P3',
    'P4',
    'P5',
    'P6',
    'P7',
    'P8',
    'P9',
    'P10',
    'P11',
    'P12',
    'P13',
    'P14',
    'P15',
    'P16',
    'P17',
]

// ===== Demo data (ajústalo a tu dataset real) =====
const DATA: Departamento[] = [
    {
        id: 'dep-lima',
        nombre: 'Lima',
        provincias: [
            {
                id: 'prov-lima',
                nombre: 'Lima',
                distritos: [
                    {
                        id: 'd-comas',
                        nombre: 'Comas',
                        valores: [
                            1, 0, 1, 0, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0,
                        ],
                    },
                    {
                        id: 'd-sanborja',
                        nombre: 'San Borja',
                        valores: [
                            1, 0, 1, 0, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0,
                        ],
                    },
                    {
                        id: 'd-sanisidro',
                        nombre: 'San Isidro',
                        valores: [
                            1, 0, 1, 0, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0,
                        ],
                    },
                    {
                        id: 'd-sanmiguel',
                        nombre: 'San Miguel',
                        valores: [
                            1, 0, 1, 0, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0,
                        ],
                    },
                ],
            },
            {
                id: 'prov-barranca',
                nombre: 'Barranca',
                distritos: [
                    {
                        id: 'd-barranca',
                        nombre: 'Barranca',
                        valores: [
                            1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1,
                        ],
                    },
                    {
                        id: 'd-paramonga',
                        nombre: 'Paramonga',
                        valores: [
                            1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1,
                        ],
                    },
                ],
            },
        ],
    },
    {
        id: 'dep-cusco',
        nombre: 'Cusco',
        provincias: [
            {
                id: 'prov-cusco',
                nombre: 'Cusco',
                distritos: [
                    {
                        id: 'd-santiago',
                        nombre: 'Santiago',
                        valores: [
                            1, 0, 0, 1, 1, 0, 0, 0, 0, 3, 3, 4, 5, 5, 6, 6, 6,
                        ],
                    },
                    {
                        id: 'd-sanjeronimo',
                        nombre: 'San Jerónimo',
                        valores: [
                            0, 1, 0, 1, 0, 0, 0, 0, 0, 2, 3, 4, 5, 6, 7, 8, 1,
                        ],
                    },
                ],
            },
        ],
    },
]

const sum = (arr: number[]) => arr.reduce((a, b) => a + b, 0)

const sumByIndex = (rows: number[][]) => {
    const res = Array(COLS.length).fill(0)
    rows.forEach((vals) => vals.forEach((v, i) => (res[i] += v)))
    return res
}

export default function TreeTableMonitoreo3Niveles() {
    // Set de expandibles: claves tipo "D:<depId>" y "P:<provId>"
    const [expanded, setExpanded] = useState<Set<string>>(new Set())

    const toggle = (key: string) => {
        const next = new Set(expanded)
        next.has(key) ? next.delete(key) : next.add(key)
        setExpanded(next)
    }

    // Totales por provincia y por departamento
    const { provTotals, depTotals } = useMemo(() => {
        const provTotals = new Map<string, { cols: number[]; total: number }>()
        const depTotals = new Map<string, { cols: number[]; total: number }>()

        for (const dep of DATA) {
            const allDistrVals: number[][] = []

            for (const prov of dep.provincias) {
                const pv = sumByIndex(prov.distritos.map((d) => d.valores))
                provTotals.set(prov.id, { cols: pv, total: sum(pv) })
                allDistrVals.push(...prov.distritos.map((d) => d.valores))
            }

            const dv = sumByIndex(allDistrVals)
            depTotals.set(dep.id, { cols: dv, total: sum(dv) })
        }

        return { provTotals, depTotals }
    }, [])

    const [category, setCategory] = useState('all')

    const series = useMemo(() => {
        const campaignSeries = {
            name: 'Campaign (ROI)',
            type: 'column',
            data: datita.campagin,
            color: function ({
                dataPointIndex,
                value,
            }: {
                dataPointIndex: number
                value: number
            }) {
                if (
                    dataPointIndex > 0 &&
                    value < datita.campagin[dataPointIndex - 1]
                ) {
                    return COLORS[7]
                }
                return COLORS[9]
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } as any,
        }

        const emailSeries = {
            name: 'Email (ROI)',
            type: 'line',
            data: datita.email,
            color: COLORS[0],
        }

        if (category === 'all') {
            return [campaignSeries, emailSeries]
        }

        if (category === 'campagin') {
            return [campaignSeries]
        }

        if (category === 'email') {
            return [emailSeries]
        }

        return []
    }, [category])

    return (
        <>
            <div className="space-y-6">
                {/* Encabezado */}
                <div className="text-center">
                   {/* <h2 className="text-sm font-medium uppercase tracking-wide text-slate-600">
                        MONITOREO
                    </h2>
                    <p className="text-[13px] text-slate-500">
                        (IMPLEM POLÍTICA Y PLAN)
                    </p>*/}
                </div>

                {/* Tabla */}
                <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
                    <table className="min-w-[1000px] table-fixed border-separate border-spacing-0">
                        <thead>
                            <tr>
                                <th className="sticky left-0 z-20 w-[240px] bg-slate-50 p-3 text-left text-[12px] font-semibold uppercase tracking-wide text-slate-600 ring-1 ring-slate-200">
                                    Ámbito / Nombre
                                </th>
                                <th className="sticky left-[240px] z-20 w-[220px] bg-slate-50 p-3 text-left text-[12px] font-semibold uppercase tracking-wide text-slate-600 ring-1 ring-slate-200">
                                    Departamento
                                </th>
                                {COLS.map((c) => (
                                    <th
                                        key={c}
                                        className="bg-slate-50 p-3 text-center text-[12px] font-semibold uppercase tracking-wide text-slate-600 ring-1 ring-slate-200"
                                    >
                                        {c}
                                    </th>
                                ))}
                                <th className="w-[120px] bg-slate-50 p-3 text-center text-[12px] font-semibold uppercase tracking-wide text-slate-600 ring-1 ring-slate-200">
                                    Total
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {DATA.map((dep) => {
                                const depKey = `D:${dep.id}`
                                const depOpen = expanded.has(depKey)
                                const dTotals = depTotals.get(dep.id)!

                                return (
                                    <Fragment key={dep.id}>
                                        {/* Fila Departamento */}
                                        <tr className="bg-white hover:bg-slate-50/60">
                                            <td className="sticky left-0 z-10 p-3 ring-1 ring-slate-200 bg-white">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        toggle(depKey)
                                                    }
                                                    aria-expanded={depOpen}
                                                    className="inline-flex items-center gap-2"
                                                >
                                                    <svg
                                                        className={`h-4 w-4 transform transition-transform ${depOpen ? 'rotate-90' : ''}`}
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    >
                                                        <path d="M9 18l6-6-6-6" />
                                                    </svg>
                                                    <span className="rounded bg-amber-50 px-2 py-0.5 text-[11px] font-semibold uppercase text-amber-700 ring-1 ring-amber-200">
                                                        Departamento
                                                    </span>
                                                    <span className="text-sm font-semibold text-slate-800">
                                                        {dep.nombre}
                                                    </span>
                                                </button>
                                            </td>
                                            <td className="sticky left-[240px] z-10 p-3 text-sm text-slate-500 ring-1 ring-slate-200 bg-white">
                                                —
                                            </td>
                                            {dTotals.cols.map((v, idx) => (
                                                <td
                                                    key={idx}
                                                    className="p-3 text-center text-sm text-slate-700 ring-1 ring-slate-200"
                                                >
                                                    {v}
                                                </td>
                                            ))}
                                            <td className="p-3 text-center text-sm font-semibold text-slate-800 ring-1 ring-slate-200">
                                                {dTotals.total}
                                            </td>
                                        </tr>

                                        {depOpen &&
                                            dep.provincias.map((prov) => {
                                                const provKey = `P:${prov.id}`
                                                const provOpen =
                                                    expanded.has(provKey)
                                                const pTotals = provTotals.get(
                                                    prov.id,
                                                )!

                                                return (
                                                    <Fragment key={prov.id}>
                                                        <tr className="bg-white hover:bg-slate-50/60">
                                                            <td className="sticky left-0 z-10 p-3 pl-10 ring-1 ring-slate-200 bg-white">
                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        toggle(
                                                                            provKey,
                                                                        )
                                                                    }
                                                                    aria-expanded={
                                                                        provOpen
                                                                    }
                                                                    className="inline-flex items-center gap-2"
                                                                >
                                                                    <svg
                                                                        className={`h-4 w-4 transform transition-transform ${provOpen ? 'rotate-90' : ''}`}
                                                                        viewBox="0 0 24 24"
                                                                        fill="none"
                                                                        stroke="currentColor"
                                                                        strokeWidth="2"
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                    >
                                                                        <path d="M9 18l6-6-6-6" />
                                                                    </svg>
                                                                    <span className="rounded bg-cyan-50 px-2 py-0.5 text-[11px] font-semibold uppercase text-cyan-700 ring-1 ring-cyan-200">
                                                                        Provincia
                                                                    </span>
                                                                    <span className="text-sm font-semibold text-slate-800">
                                                                        {
                                                                            prov.nombre
                                                                        }
                                                                    </span>
                                                                </button>
                                                            </td>
                                                            <td className="sticky left-[240px] z-10 p-3 text-sm text-slate-700 ring-1 ring-slate-200 bg-white">
                                                                {dep.nombre}
                                                            </td>
                                                            {pTotals.cols.map(
                                                                (v, idx) => (
                                                                    <td
                                                                        key={
                                                                            idx
                                                                        }
                                                                        className="p-3 text-center text-sm text-slate-700 ring-1 ring-slate-200"
                                                                    >
                                                                        {v}
                                                                    </td>
                                                                ),
                                                            )}
                                                            <td className="p-3 text-center text-sm font-semibold text-slate-800 ring-1 ring-slate-200">
                                                                {pTotals.total}
                                                            </td>
                                                        </tr>

                                                        {/* Distritos de la Provincia */}
                                                        {provOpen &&
                                                            prov.distritos.map(
                                                                (d) => (
                                                                    <tr
                                                                        key={
                                                                            d.id
                                                                        }
                                                                        className="hover:bg-slate-50"
                                                                    >
                                                                        <td className="sticky left-0 z-10 p-3 pl-16 ring-1 ring-slate-200 bg-white">
                                                                            <span className="rounded bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold uppercase text-emerald-700 ring-1 ring-emerald-200">
                                                                                Distrito
                                                                            </span>
                                                                            <span className="ml-2 text-sm text-slate-800 underline decoration-emerald-300">
                                                                                {
                                                                                    d.nombre
                                                                                }
                                                                            </span>
                                                                        </td>
                                                                        <td className="sticky left-[240px] z-10 p-3 text-sm text-slate-700 ring-1 ring-slate-200 bg-white">
                                                                            {
                                                                                dep.nombre
                                                                            }
                                                                        </td>
                                                                        {d.valores.map(
                                                                            (
                                                                                v,
                                                                                i,
                                                                            ) => (
                                                                                <td
                                                                                    key={
                                                                                        i
                                                                                    }
                                                                                    className="p-3 text-center text-sm text-slate-700 ring-1 ring-slate-200"
                                                                                >
                                                                                    {
                                                                                        v
                                                                                    }
                                                                                </td>
                                                                            ),
                                                                        )}
                                                                        <td className="p-3 text-center text-sm font-semibold text-slate-800 ring-1 ring-slate-200">
                                                                            {sum(
                                                                                d.valores,
                                                                            )}
                                                                        </td>
                                                                    </tr>
                                                                ),
                                                            )}
                                                    </Fragment>
                                                )
                                            })}
                                    </Fragment>
                                )
                            })}
                        </tbody>

                        <tfoot>
                            <tr>
                                <td
                                    colSpan={2}
                                    className="bg-white p-3 text-right text-[11px] text-slate-500 ring-1 ring-slate-200"
                                />
                                <td
                                    colSpan={COLS.length}
                                    className="bg-white p-3 text-center text-[11px] text-slate-500 ring-1 ring-slate-200"
                                >
                                    Valor de clasificación:{' '}
                                    <span className="font-medium">0 / 1</span>
                                </td>
                                <td className="bg-white p-3 ring-1 ring-slate-200" />
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
                <div className="relative min-h-[450px] rounded-xl overflow-hidden ring-1 ring-slate-200 bg-slate-100">
                    <img
                        src="https://es.maps-peru.com/img/0/mapa-f%C3%ADsico-de-per%C3%BA.jpg"
                        alt="Vista de referencia"
                        className="absolute left-1/2 top-1/2
      -translate-x-1/2 -translate-y-1/2
      max-w-[100%] max-h-[100%]  
      object-contain"
                        loading="lazy"
                    />
                </div>
                <Card className="h-full">
                    <div className="flex items-center justify-between">
                        <h4>Ads performance</h4>
                        <div>
                            <Segment
                                className="gap-1"
                                value={category}
                                size="sm"
                                onChange={(val) => setCategory(val as string)}
                            >
                                <Segment.Item value="all">All</Segment.Item>
                                <Segment.Item value="campagin">
                                    Campagin
                                </Segment.Item>
                                <Segment.Item value="email">Email</Segment.Item>
                            </Segment>
                        </div>
                    </div>

                    <div className="mt-6">
                        <ApexChart
                            options={{
                                chart: {
                                    type: 'line',
                                    zoom: { enabled: false },
                                    toolbar: { show: false },
                                },
                                legend: { show: false },
                                stroke: {
                                    width:
                                        category === 'email' ? 2.5 : [0, 2.5],
                                    curve: 'smooth',
                                    lineCap: 'round',
                                },
                                states: { hover: { filter: { type: 'none' } } },
                                tooltip: {
                                    custom: ({ series, dataPointIndex }) => {
                                        const renderCampaignData = () => `
                <div class="flex items-center gap-2">
                  <div class="h-[10px] w-[10px] rounded-full" style="background-color: ${COLORS[9]}"></div>
                  <div class="flex gap-2">Campaign: <span class="font-bold">${series[0][dataPointIndex]}</span></div>
                </div>`
                                        const renderEmailData = () => `
                <div class="flex items-center gap-2">
                  <div class="h-[10px] w-[10px] rounded-full" style="background-color: ${COLORS[0]}"></div>
                  <div class="flex gap-2">Email: <span class="font-bold">${
                      series[category === 'all' ? 1 : 0][dataPointIndex]
                  }</span></div>
                </div>`
                                        const content =
                                            category === 'all'
                                                ? `${renderCampaignData()}${renderEmailData()}`
                                                : category === 'campagin'
                                                  ? renderCampaignData()
                                                  : renderEmailData()
                                        return `
                <div class="py-2 px-4 rounded-xl">
                  <div class="flex flex-col gap-2">
                    <div>${datita.label[dataPointIndex]}</div>
                    ${content}
                  </div>
                </div>`
                                    },
                                },
                                labels: datita.label,
                                yaxis:
                                    category === 'all'
                                        ? [{}, { opposite: true }]
                                        : [],
                                plotOptions: {
                                    bar: {
                                        horizontal: false,
                                        columnWidth: '35px',
                                        borderRadius: 4,
                                        borderRadiusApplication: 'end',
                                    },
                                },
                            }}
                            series={series}
                            height={450}
                        />
                    </div>
                </Card>
            </div>
        </>
    )
}
