import { Fragment, useEffect, useMemo, useState } from 'react'
import Card from '@/components/ui/Card'
import Segment from '@/components/ui/Segment'
import ApexChart from 'react-apexcharts'
import { COLORS } from '@/constants/chart.constant'
import { Select } from '@/components/ui'
import { SingleValue } from 'react-select'
import MapaPeru from './MapaPeru'
import { RespuestaElement, SupervicionResponse } from './types'
import { apiGetCategorias, apiGetSupervision } from '@/services/MonitoreService'

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
    valores: number[]
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

const COLS = ["Actividades", "Programas", "Proyectos", "Otros"]

const sumByIndex = (rows: number[][]) => {
    const res = Array(COLS.length).fill(0)
    ////rows.forEach((vals) => vals.forEach((v, i) => (res[i] += v)))
    rows.forEach((vals) => vals.forEach((v, i) => (res[i] += v)))
    return res
}
function mapMonitoreoResponseToData(response: SupervicionResponse[]): Departamento[] {
    let data: Departamento[] = [];
    const mapValores = (respuestas: RespuestaElement[]) => respuestas.map((r) => r.respuesta.toLowerCase() === "si" ? parseFloat(r.promedio) : 0)
    for (let i = 0; i < response.length; i++) {
        const monitoreo = response[i];
        const indexDepartamento = data.findIndex((item) => item.id == monitoreo.departamento_iddpto);
        // no esta el departamento
        if (indexDepartamento === -1) {
            data.push({
                id: monitoreo.departamento_iddpto,
                nombre: monitoreo.departamento.nombre,
                provincias: [{
                    id: monitoreo.provincia_idprov,
                    nombre: monitoreo.provincia.nombre,
                    distritos: [{
                        id: monitoreo.ubigeo,
                        nombre: monitoreo.distrito.distrito,
                        valores: mapValores(monitoreo.secciones),
                    }]
                }]
            })
            continue;
        }
        const indexProvincia = data[indexDepartamento].provincias.findIndex((item) => item.id == monitoreo.provincia_idprov);
        // no esta la provincia
        if (indexProvincia === -1) {
            data[indexDepartamento].provincias.push({
                id: monitoreo.provincia_idprov,
                nombre: monitoreo.provincia.nombre,
                distritos: [{
                    id: monitoreo.ubigeo,
                    nombre: monitoreo.distrito.distrito,
                    valores: mapValores(monitoreo.secciones),
                }]
            });
            continue;
        }
        const indexDistrito = data[indexDepartamento].provincias[indexProvincia].distritos.findIndex((item) => item.id == monitoreo.ubigeo);
        // no esta el distrito
        if (indexDistrito === -1) {
            data[indexDepartamento].provincias[indexProvincia].distritos.push({
                id: monitoreo.ubigeo,
                nombre: monitoreo.distrito.distrito,
                valores: mapValores(monitoreo.secciones),
            })
            continue;
        }
        data[indexDepartamento].provincias[indexProvincia].distritos[indexDistrito].valores = mapValores(monitoreo.secciones)
    }
    return data;
}
interface CategoriaOption {
    value: string;
    label: string;
}
export default function TreeTableMonitoreo3Niveles() {
    // Set de expandibles: claves tipo "D:<depId>" y "P:<provId>"
    const [expanded, setExpanded] = useState<Set<string>>(new Set())
    const [data, setData] = useState<Departamento[]>([])
    const [categorias, setCategorias] = useState<CategoriaOption[]>([])
    const [currentCategoria, setCurrentCategoria] = useState<CategoriaOption | null>(null)
    const [fetching, setFetching] = useState(true)
    const [query, setQuery] = useState("Peru");


    async function onCategoria(newValue: SingleValue<CategoriaOption>) {
        if (!newValue) {
            return;
        }
        setFetching(true)
        setCurrentCategoria(newValue);
        await fetchValues(newValue.value)
        setFetching(false)
    }
    async function fetchValues(categoria: string) {
        const response = await apiGetSupervision(categoria)
        setData(mapMonitoreoResponseToData(response))
    }
    async function boot(): Promise<void> {
        const res = await apiGetCategorias()
        setCategorias(res.map(cat => ({
            value: String(cat.id),
            label: cat.nombre
        })))
        const first = res[0]
        setCurrentCategoria({
            value: String(first.id),
            label: first.nombre,
        })
        await fetchValues(String(first.id))
        setFetching(false)
    }

    useEffect(() => {
        boot();
    }, []);

    const toggle = (key: string) => {
        const next = new Set(expanded)
        next.has(key) ? next.delete(key) : next.add(key)
        setExpanded(next)
    }

    // Totales por provincia y por departamento
    function promedio(arr: number[], total: number): number {
        const sum = arr.reduce((a, b) => a + b, 0);
        return Number(((sum / total)).toFixed(2));
    }
    const { provTotals, depTotals } = useMemo(() => {
        const provTotals = new Map<string, { cols: number[]; total: number }>()
        const depTotals = new Map<string, { cols: number[]; total: number }>()

        for (const dep of data) {
            const allDistrVals: number[][] = []

            for (const prov of dep.provincias) {
                const pv = sumByIndex(prov.distritos.map((d) => d.valores))
                provTotals.set(prov.id, { cols: pv, total: promedio(pv, 4 * prov.distritos.length) })
                allDistrVals.push(...prov.distritos.map((d) => d.valores))
            }

            const dv = sumByIndex(allDistrVals)
            depTotals.set(dep.id, { cols: dv, total: promedio(dv, 4 * allDistrVals.length) })
        }

        return { provTotals, depTotals }
    }, [data])

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
                    <Select
                        options={categorias}
                        value={currentCategoria}
                        onChange={(n) => onCategoria(n)}
                        isDisabled={fetching}
                    />
                </div>

                {/* Tabla */}
                <div className="flex items-center gap-2">
                    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
                        <table className="min-w-[1000px] table-fixed border-separate border-spacing-0">
                            <thead>
                                <tr>
                                    <th className="sticky left-0 z-20 min-w-[240px] max-w-[240px] bg-slate-50 p-3 text-left text-[12px] font-semibold uppercase tracking-wide text-slate-600 ring-1 ring-slate-200">
                                        Localización
                                    </th>
                                    {COLS.map((c) => (
                                        <th
                                            key={c}
                                            className="bg-slate-50 p-3 text-center text-[12px] font-semibold uppercase tracking-wide text-slate-600 ring-1 ring-slate-200"
                                        >
                                            {c}
                                        </th>
                                    ))}
                                    <th className="w-[120px] bg-slate-50 p-3 text-center text-[12px] font-semibold uppercase tracking-wide text-slate-600 ring-1 ring-slate-200 whitespace-nowrap">
                                        Total %
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {data.map((dep) => {
                                    const depKey = `D:${dep.id}`
                                    const depOpen = expanded.has(depKey)
                                    const dTotals = depTotals.get(dep.id)!

                                    return (
                                        <Fragment key={dep.id}>
                                            {/* Fila Departamento */}
                                            <tr className="bg-amber-50 hover:bg-slate-50/60">
                                                <td className="sticky left-0 z-10 p-3 ring-1 ring-slate-200">
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            toggle(depKey);
                                                            setQuery(`${dep.nombre}, Peru`);
                                                        }}
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
                                                        <span className="text-sm font-semibold text-slate-800">
                                                            {dep.nombre}
                                                        </span>
                                                    </button>
                                                </td>
                                                {dTotals?.cols?.map((v, idx) => (
                                                    <td
                                                        key={idx}
                                                        className="p-3 text-center text-sm text-slate-700 ring-1 ring-slate-200"
                                                    >
                                                        {v}
                                                    </td>
                                                ))}
                                                <td className="p-3 text-center text-sm font-semibold text-slate-800 ring-1 ring-slate-200">
                                                    {dTotals?.total}
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
                                                            <tr className="bg-cyan-50 hover:bg-slate-50/60">
                                                                <td className="sticky left-0 z-10 p-3 pl-10 ring-1 ring-slate-200">
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => {
                                                                            toggle(provKey);
                                                                            setQuery(`${prov.nombre}, ${dep.nombre}, Peru`);
                                                                        }}
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
                                                                        <span className="text-sm font-semibold text-slate-800">
                                                                            {
                                                                                prov.nombre
                                                                            }
                                                                        </span>
                                                                    </button>
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
                                                                            className="hover:bg-slate-50 bg-emerald-50"
                                                                        >
                                                                            <td onClick={() => {
                                                                                setQuery(`${d.nombre}, ${prov.nombre}, ${dep.nombre}, Peru`);
                                                                            }} className="sticky left-0 z-10 p-3 pl-22 ring-1 ring-slate-200">
                                                                                <span className="ml-2 text-sm text-slate-800 underline decoration-emerald-300">
                                                                                    {
                                                                                        d.nombre
                                                                                    }
                                                                                </span>
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
                                                                                {promedio(
                                                                                    d.valores,
                                                                                    4
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
            </div>

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
                <div className="relative min-h-[450px] rounded-xl overflow-hidden ring-1 ring-slate-200 bg-slate-100">
                    <MapaPeru query={query} />
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
                  <div class="flex gap-2">Email: <span class="font-bold">${series[category === 'all' ? 1 : 0][dataPointIndex]
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
