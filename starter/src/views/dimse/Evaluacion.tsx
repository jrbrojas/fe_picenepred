import { Fragment, useEffect, useMemo, useState } from 'react'
import Card from '@/components/ui/Card'
import Segment from '@/components/ui/Segment'
import ApexChart from 'react-apexcharts'
import { COLORS } from '@/constants/chart.constant'
import { Select } from '@/components/ui'
import { SingleValue } from 'react-select'
import MapaPeru from './MapaPeru'
import { MonitoreoResponse, RespuestaElement } from './types'
import { apiGetCategorias, apiGetEvaluacion } from '@/services/MonitoreService'

type Entidad = {
    id: string
    nombre: string
    evaluacion: number[]
}

type Distrito = {
    id: string
    nombre: string
    entidades: Entidad[]
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

const COLS = ["Monitoreo", "Seguimiento", "Supervision"];

function mapMonitoreoResponseToData(response: MonitoreoResponse[]): Departamento[] {
    let data: Departamento[] = [];
    const mapValores = (respuestas: RespuestaElement[], i: string) => respuestas.find(r => r.nombre == i)?.calculo || 0
    const mapMonitoResponseToEntidad = (m: MonitoreoResponse): Entidad => ({
        id: String(m.entidad.id),
        nombre: m.entidad.nombre,
        evaluacion: [
            mapValores(m.respuestas, "Monitoreo"),
            mapValores(m.respuestas, "Seguimiento"),
            mapValores(m.respuestas, "Supervision"),
        ]
    })
    for (let i = 0; i < response.length; i++) {
        const monitoreo = response[i];
        const indexDepartamento = data.findIndex((item) => item.id == monitoreo.departamento.iddpto);
        // no esta el departamento
        if (indexDepartamento === -1) {
            data.push({
                id: monitoreo.departamento.iddpto,
                nombre: monitoreo.departamento.nombre,
                provincias: [{
                    id: monitoreo.provincia.idprov,
                    nombre: monitoreo.provincia.nombre,
                    distritos: [{
                        id: monitoreo.distrito.ubigeo,
                        nombre: monitoreo.distrito.nombre,
                        entidades: [
                            mapMonitoResponseToEntidad(monitoreo)
                        ]
                    }]
                }]
            })
            continue;
        }
        const indexProvincia = data[indexDepartamento].provincias.findIndex((item) => item.id == monitoreo.provincia.idprov);
        // no esta la provincia
        if (indexProvincia === -1) {
            data[indexDepartamento].provincias.push({
                id: monitoreo.provincia.idprov,
                nombre: monitoreo.provincia.nombre,
                distritos: [{
                    id: monitoreo.distrito.ubigeo,
                    nombre: monitoreo.distrito.nombre,
                    entidades: [
                        mapMonitoResponseToEntidad(monitoreo)
                    ]
                }]
            });
            continue;
        }
        const indexDistrito = data[indexDepartamento].provincias[indexProvincia].distritos.findIndex((item) => item.id == monitoreo.distrito.ubigeo);
        // no esta el distrito
        if (indexDistrito === -1) {
            data[indexDepartamento].provincias[indexProvincia].distritos.push({
                id: monitoreo.distrito.ubigeo,
                nombre: monitoreo.distrito.nombre,
                entidades: [
                    mapMonitoResponseToEntidad(monitoreo)
                ]
            })
            continue;
        }
        data[indexDepartamento].provincias[indexProvincia].distritos[indexDistrito].entidades.push(
            mapMonitoResponseToEntidad(monitoreo)
        )
    }
    return data;
}

type Counter = { cols: number[]; total: number }

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
        const response = await apiGetEvaluacion(categoria)
        setData(mapMonitoreoResponseToData(response))
    }

    async function boot(): Promise<void> {
        const res = await apiGetCategorias()
        setCategorias(res.map(cat => ({
            value: String(cat.id),
            label: cat.nombre
        })))
        //const first = res[0]
        //setCurrentCategoria({
        //    value: String(first.id),
        //    label: first.nombre,
        //})
        //await fetchValues(String(first.id))
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
        return Number((sum / total).toFixed(2));
    }

    function promedioDeGrupo(arr: number[][], total: number): number {
        const promedios = arr.map((a) => promedio(a, total))
        return promedio(promedios, promedios.length);
    }

    function valoresDistrito(distrito: Distrito): number[] {
        const valores = [];
        for(let i = 0; i < 3; i++) {
            valores[i] = distrito.entidades.reduce((a, b) => a + b.evaluacion[i], 0);
        }
        return valores
    }

    const { provTotals, depTotals, distTotals } = useMemo(() => {
        const distTotals = new Map<string, Counter>()
        const provTotals = new Map<string, Counter>()
        const depTotals = new Map<string, Counter>()

        for (const dep of data) {
            const promediosDeProvincias = []
            for (const prov of dep.provincias) {
                const promediosDeDistritos = []
                for (const dist of prov.distritos) {
                    const numbers = dist.entidades.map(i => i.evaluacion);
                    const total = promedioDeGrupo(numbers, 3);
                    const cols = [0,0,0];
                    for(let i = 0; i < 3; i++) {
                        cols[i] = promedio(numbers.map((v) => v[i]), numbers.length)
                    }
                    promediosDeDistritos.push(cols)
                    distTotals.set(dist.id, { cols, total })
                }
                const total = promedioDeGrupo(promediosDeDistritos, 3);
                const cols = [0,0,0];
                for(let i = 0; i < 3; i++) {
                    cols[i] = promedio(promediosDeDistritos.map((v) => v[i]), promediosDeDistritos.length)
                }
                promediosDeProvincias.push(cols)
                provTotals.set(prov.id, { cols, total })
            }
            const total = promedioDeGrupo(promediosDeProvincias, 3);
            const cols = [0,0,0];
            for(let i = 0; i < 3; i++) {
                cols[i] = promedio(promediosDeProvincias.map((v) => v[i]), promediosDeProvincias.length)
            }
            depTotals.set(dep.id, { cols, total })
        }
        return { provTotals, depTotals, distTotals }
    }, [data])

    // data ordenada para el grafico de barras
    const ordenData = [...data].sort((a, b) => Number(depTotals.get(b.id)?.total ?? 0) - Number(depTotals.get(a.id)?.total ?? 0))

    return (
        <>
            <div className="space-y-6">
                {/* Encabezado */}
                <div className="text-left flex justify-start">
                    <label className="sm:min-w-[300px] min-w-full">
                        <strong className="block mb-2">Categoria</strong>
                        <Select
                            options={categorias}
                            value={currentCategoria}
                            onChange={(n) => onCategoria(n)}
                            placeholder="Seleccione una categoria"
                            isDisabled={fetching}
                        />
                    </label>
                </div>

                {/* Tabla */}
                <div className="flex items-center gap-2">
                    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
                        <table className="table-fixed border-separate border-spacing-0">
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
                                {ordenData.map((dep) => {
                                    const depKey = `D:${dep.id}`
                                    const depOpen = expanded.has(depKey)
                                    const dTotals = depTotals.get(dep.id)!

                                    return (
                                        <Fragment key={`FRAGD-${depKey}`}>
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
                                                        {v.toFixed(2)} %
                                                    </td>
                                                ))}
                                                <td className="p-3 text-center text-sm font-semibold text-slate-800 ring-1 ring-slate-200">
                                                    {dTotals?.total.toFixed(2)} %
                                                </td>
                                            </tr>

                                            {depOpen &&
                                                dep.provincias.map((prov) => {
                                                    const provKey = `P:${prov.id}`
                                                    const provOpen = expanded.has(provKey)
                                                    const pTotals = provTotals.get(
                                                        prov.id,
                                                    )!

                                                    return (
                                                        <Fragment key={`FRAGP-${provKey}`}>
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
                                                                            {v.toFixed(2)} %
                                                                        </td>
                                                                    ),
                                                                )}
                                                                <td className="p-3 text-center text-sm font-semibold text-slate-800 ring-1 ring-slate-200">
                                                                    {pTotals.total.toFixed(2)} %
                                                                </td>
                                                            </tr>

                                                            {/* Distritos de la Provincia */}
                                                            {provOpen &&
                                                                prov.distritos.map(
                                                                    (d, index) => {
                                                                        const distKey = `DD:${d.id}`
                                                                        const distOpen = expanded.has(distKey)
                                                                        const valsDist: Counter = distTotals.get(d.id) || { cols: [], total: 0}
                                                                        return (
                                                                            <Fragment key={`FRAGDI-${distKey}`}>
                                                                                <tr className="hover:bg-slate-50 bg-emerald-50">
                                                                                    <td className="sticky left-0 z-10 p-3 pl-16 ring-1 ring-slate-200">
                                                                                        <button
                                                                                            type="button"
                                                                                            onClick={() => {
                                                                                                toggle(distKey);
                                                                                                setQuery(`${d.nombre}, ${prov.nombre}, ${dep.nombre}, Peru`);
                                                                                            }}
                                                                                            aria-expanded={
                                                                                                distOpen
                                                                                            }
                                                                                            className="inline-flex items-center gap-2"
                                                                                        >
                                                                                            <svg
                                                                                                className={`h-4 w-4 transform transition-transform ${distOpen ? 'rotate-90' : ''}`}
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
                                                                                                    d.nombre
                                                                                                }
                                                                                            </span>
                                                                                        </button>
                                                                                    </td>
                                                                                    {valsDist.cols.map(
                                                                                        (
                                                                                            v,
                                                                                            i,
                                                                                        ) => (
                                                                                            <td
                                                                                                key={
                                                                                                    `${d.id}-${i}`
                                                                                                }
                                                                                                className="p-3 text-center text-sm text-slate-700 ring-1 ring-slate-200"
                                                                                            >
                                                                                                {
                                                                                                    v.toFixed(2)
                                                                                                } %
                                                                                            </td>
                                                                                        ),
                                                                                    )}
                                                                                    <td className="p-3 text-center text-sm font-semibold text-slate-800 ring-1 ring-slate-200">
                                                                                        {valsDist.total} %
                                                                                    </td>
                                                                                </tr>
                                                                                {/* Entidades de Distrito */}
                                                                                {distOpen &&
                                                                                    d.entidades.map((entidad) => {
                                                                                        const entKey = `ENT:${entidad.id}`

                                                                                        return (
                                                                                            <Fragment key={`FRAGENT-${entKey}`}>
                                                                                                <tr className='hover:bg-slate-50 bg-purple-50'>
                                                                                                    <td onClick={() => {
                                                                                                        setQuery(`${d.nombre}, ${prov.nombre}, ${dep.nombre}, Peru`);
                                                                                                    }} className="sticky left-0 z-10 p-3 pl-16 ring-1 ring-slate-200">
                                                                                                        <span className="text-sm font-semibold text-slate-800">
                                                                                                            {
                                                                                                                entidad.nombre
                                                                                                            }
                                                                                                        </span>
                                                                                                    </td>
                                                                                                    {entidad.evaluacion.map(
                                                                                                        (
                                                                                                            v,
                                                                                                            i,
                                                                                                        ) => (
                                                                                                            <td
                                                                                                                key={
                                                                                                                    `${entidad.id}-${i}`
                                                                                                                }
                                                                                                                className="p-3 text-center text-sm text-slate-700 ring-1 ring-slate-200"
                                                                                                            >
                                                                                                                {
                                                                                                                    v.toFixed(2)
                                                                                                                } %
                                                                                                            </td>
                                                                                                        ),
                                                                                                    )}
                                                                                                    <td className="p-3 text-center text-sm font-semibold text-slate-800 ring-1 ring-slate-200">
                                                                                                        {promedio(
                                                                                                            entidad.evaluacion,
                                                                                                            3
                                                                                                        )} %
                                                                                                    </td>
                                                                                                </tr>
                                                                                            </Fragment>
                                                                                        )
                                                                                    })}
                                                                            </Fragment>
                                                                        )
                                                                    })}
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
                    <div className="mt-6">
                        <ApexChart
                            options={{
                                chart: {
                                    type: 'bar',
                                    height: 350,
                                    toolbar: {
                                        show: true,
                                        tools: {
                                            download: true,
                                            selection: true,
                                            zoom: true,
                                            zoomin: true,
                                            zoomout: true,
                                            pan: true,
                                            reset: true
                                        }
                                    },
                                    events: {
                                        dataPointSelection: (event, chartContext, config) => {
                                            const index = config.dataPointIndex
                                            const departamento = data[index].nombre
                                            setQuery(`${departamento}, Peru`);
                                        }
                                    },

                                },
                                plotOptions: {
                                    bar: {
                                        horizontal: false,
                                        columnWidth: '55%',
                                        distributed: true,
                                        borderRadius: 4,
                                        borderRadiusApplication: 'end',
                                    },
                                },
                                dataLabels: {
                                    enabled: false
                                },
                                stroke: {
                                    show: true,
                                    width: 2,
                                    colors: ['transparent']
                                },
                                xaxis: {
                                    categories: ordenData.map((d) => d.nombre),
                                    title: {
                                        text: 'Regiones'
                                    },
                                    labels: {
                                        rotate: -45,
                                        style: {
                                            fontSize: '10px'
                                        }
                                    }
                                },
                                yaxis: {
                                    title: {
                                        text: 'Porcentajes %'
                                    },
                                    min: 0,
                                    max: function (max) {
                                        // Para asegurar que el máximo sea al menos 1 si hay datos
                                        return Math.max(max, 1);
                                    }
                                },
                                fill: {
                                    opacity: 1
                                },
                                tooltip: {
                                    y: {
                                        formatter: function (val) {
                                            return val + "% respondieron 'Sí'"
                                        }
                                    }
                                },
                                colors: [COLORS[0], COLORS[3], COLORS[6], COLORS[9]],
                            }}
                            series={[{
                                name: 'Porcentajes %',
                                data: ordenData.map(dep => Number(depTotals.get(dep.id)?.total ?? 0))
                            }]}
                            type="bar"
                            height={450}
                        />
                    </div>
                </Card>
            </div>
        </>
    )
}
