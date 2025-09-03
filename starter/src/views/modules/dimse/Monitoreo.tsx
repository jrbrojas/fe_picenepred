import { useState, useMemo } from 'react'
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

    // Ejemplo (pon aquí tus 0/1 reales)
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
        ], // 0/1 opcionales
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
      max-w-[100%] max-h-[100%]   /* ajusta 70% a lo que necesites */
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
