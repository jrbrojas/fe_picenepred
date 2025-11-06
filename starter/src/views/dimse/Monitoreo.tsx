import { Fragment, useEffect, useMemo, useState } from 'react'
import Card from '@/components/ui/Card'
import { Badge, Select } from '@/components/ui'
import { SingleValue } from 'react-select'
import promedioDeGrupo, { Valor, promedio, promedioPorSuma } from './promedio'
import MapaPeru from './MapaPeru'
import { apiGetCategorias, apiGetMonitoreo } from '@/services/MonitoreService'
import { Pregunta, preguntas } from '@/constants/preguntas.constant'
import { MonitoreoResponse, MonitoreoRespuesta } from '@/services/types/getmonitoreo'
import { ChartInfo, ChartPorDepartamento } from './ChartPorDepartamento'
import Tabs from '@/components/ui/Tabs'
import { ChartPorEntidad, ChartPorEntidadInfo } from './ChartPorEntidad'
import { Tooltip } from 'react-tooltip'
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { FaTimesCircle } from "react-icons/fa";

const { TabNav, TabList, TabContent } = Tabs

type Entidad = {
    id: string
    nombre: string
    monitoreo: number[]
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

const COLS = Array.from({ length: 30 }, (_, i) => `P${i + 1}`)

function mapMonitoreoResponseToData(response: MonitoreoResponse[]): Departamento[] {
    let data: Departamento[] = [];
    const mapValores = (respuestas: MonitoreoRespuesta[]) => respuestas.map((r) => r.respuesta.toLowerCase() === "si" ? 1 : 0)
    for (let i = 0; i < response.length; i++) {
        const monitoreo = response[i];
        const indexDepartamento = data.findIndex((item) => +item.id == monitoreo.entidad.distrito.provincia.departamento_id);
        // no esta el departamento
        if (indexDepartamento === -1) {
            data.push({
                id: String(monitoreo.entidad.distrito.provincia.departamento_id),
                nombre: monitoreo.entidad.distrito.provincia.departamento.nombre,
                provincias: [{
                    id: String(monitoreo.entidad.distrito.provincia_id),
                    nombre: monitoreo.entidad.distrito.provincia.nombre,
                    distritos: [{
                        id: String(monitoreo.entidad.distrito_id),
                        nombre: monitoreo.entidad.distrito.nombre,
                        entidades: [
                            {
                                id: String(monitoreo.entidad.id),
                                nombre: monitoreo.entidad.nombre,
                                monitoreo: mapValores(monitoreo.monitoreo_respuestas)
                            }
                        ]
                    }]
                }]
            })
            continue;
        }
        const indexProvincia = data[indexDepartamento].provincias.findIndex((item) => +item.id == monitoreo.entidad.distrito.provincia_id);
        // no esta la provincia
        if (indexProvincia === -1) {
            data[indexDepartamento].provincias.push({
                id: String(monitoreo.entidad.distrito.provincia_id),
                nombre: monitoreo.entidad.distrito.provincia.nombre,
                distritos: [{
                    id: String(monitoreo.entidad.distrito_id),
                    nombre: monitoreo.entidad.distrito.nombre,
                    entidades: [
                        {
                            id: String(monitoreo.entidad.id),
                            nombre: monitoreo.entidad.nombre,
                            monitoreo: mapValores(monitoreo.monitoreo_respuestas)
                        }
                    ]
                }]
            });
            continue;
        }
        const indexDistrito = data[indexDepartamento].provincias[indexProvincia].distritos.findIndex((item) => +item.id == monitoreo.entidad.distrito_id);
        // no esta el distrito
        if (indexDistrito === -1) {
            data[indexDepartamento].provincias[indexProvincia].distritos.push({
                id: String(monitoreo.entidad.distrito_id),
                nombre: monitoreo.entidad.distrito.nombre,
                entidades: [
                    {
                        id: String(monitoreo.entidad.id),
                        nombre: monitoreo.entidad.nombre,
                        monitoreo: mapValores(monitoreo.monitoreo_respuestas)
                    }
                ]
            })
            continue;
        }
        data[indexDepartamento].provincias[indexProvincia].distritos[indexDistrito].entidades.push({
            id: String(monitoreo.entidad.id),
            nombre: monitoreo.entidad.nombre,
            monitoreo: mapValores(monitoreo.monitoreo_respuestas)
        })
    }
    return data;
}

type Counter = {
    cols: number[];
    total: number
}

interface CategoriaOption {
    value: string;
    label: string;
}

function ListaRespuestas({ respuestas }: { respuestas: number[] }) {
    function getPregunta(codigo: string): Pregunta | null {
        return preguntas.find(c => c.codigo == codigo) || null
    }
    return (
        <div
            className="grid grid-cols-2 p-2"
            style={{ gridTemplateColumns: "1fr auto" }}
        >
                    {respuestas.map(
                        (r, index) => (<>
                            <p className="p-2 whitespace-normal border border-dashed border-gray-200">{getPregunta(`P${index + 1}`)?.pregunta}</p>
                            <p className="p-2 border border-dashed border-gray-200 flex items-center justify-center">
                                <span className={"w-[48px] flex items-center justify-center gap-[2px] badge px-2 py-1 min-w-6 rounded-full text-xs font-semibold text-white " + (r == 1 ? 'bg-success':'bg-error') }>
                                    {r == 1 ? (<><IoCheckmarkDoneCircle /> SI</>): (<><FaTimesCircle /> NO</>) }
                                </span>
                            </p>
                        </>)
                    )}
        </div>
    )
}

interface Monitoreo extends MonitoreoResponse, ChartPorEntidadInfo {}
export default function TreeTableMonitoreo3Niveles() {
    // Set de expandibles: claves tipo "D:<depId>" y "P:<provId>"
    const [expanded, setExpanded] = useState<Set<string>>(new Set())
    const [data, setData] = useState<Departamento[]>([])
    const [categorias, setCategorias] = useState<CategoriaOption[]>([])
    const [originalData, setOriginalData] = useState<Monitoreo[]>([])
    const [currentCategoria, setCurrentCategoria] = useState<CategoriaOption | null>(null)
    const [chartSeries, setChartSeries] = useState([{ name: "Porcentaje", data: [] as number[] }])
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

    function onSelectChartEntidad(info: Monitoreo) {
        setQuery(`${info.entidad.distrito.nombre}, ${info.entidad.distrito.provincia.nombre}, ${info.entidad.distrito.provincia.departamento.nombre}, Perú`)
    }

    async function fetchValues(categoria: string) {
        const response = await apiGetMonitoreo(categoria)
        setData(mapMonitoreoResponseToData(response))
        const mapValores = (respuestas: MonitoreoRespuesta[]) => respuestas.map((r) => r.respuesta.toLowerCase() === "si" ? 1 : 0)
        setOriginalData(
            response.map(i => {
                const n = mapValores(i.monitoreo_respuestas)
                const nombre2 = i.entidad.nombre.replace(/MUNICIPALIDAD PROVINCIAL DE|MUNICIPALIDAD DISTRITAL DE/, "")
                return {
                    ...i,
                    chartNombre: i.entidad.nombre,
                    chartAcronimo: nombre2,
                    chartTotal: promedioPorSuma(n, n.length) * 100,
                    chartLugar: `${i.entidad.distrito.nombre} - ${i.entidad.distrito.provincia.nombre} - ${i.entidad.distrito.provincia.departamento.nombre}`
                }
            }).sort((a, b) => b.chartTotal - a.chartTotal)
        )
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
    const { provTotals, depTotals, distTotals } = useMemo(() => {
        const validacion = (i: Valor) => i == 1
        const promedioSiNo = (vals: Valor[][]) => promedioDeGrupo(vals, validacion)
        const distTotals = new Map<string, Counter>()
        const provTotals = new Map<string, Counter>()
        const depTotals = new Map<string, Counter>()

        for (const dep of data) {
            const promediosDeProvincias = []
            for (const prov of dep.provincias) {
                const promediosDeDistritos: number[] = []
                for (const dist of prov.distritos) {
                    const numbers = dist.entidades.map(i => i.monitoreo);
                    const total = promedioSiNo(numbers);
                    const cols = Array.from<number>({ length: 30 }).fill(0)
                    promediosDeDistritos.push(total)
                    distTotals.set(dist.id, { cols, total })
                }
                const total = promedioPorSuma(promediosDeDistritos, promediosDeDistritos.length);
                const cols = Array.from<number>({ length: 30 }).fill(0)
                promediosDeProvincias.push(total)
                provTotals.set(prov.id, { cols, total })
            }
            const total = promedioPorSuma(promediosDeProvincias, promediosDeProvincias.length);
            const cols = Array.from<number>({ length: 30 }).fill(0)
            depTotals.set(dep.id, { cols, total })
        }
        return { provTotals, depTotals, distTotals }
    }, [data])

    function getPregunta(codigo: string): Pregunta | null {
        return preguntas.find(c => c.codigo == codigo) || null
    }

    // data ordenada para el grafico de barras
    interface DepartamentoChart extends Departamento, ChartInfo {}
    const ordenData: DepartamentoChart[] = [...data]
        .sort((a, b) => Number(depTotals.get(b.id)?.total ?? 0) - Number(depTotals.get(a.id)?.total ?? 0))
        .map<DepartamentoChart>((item) => {
            return {
                ...item,
                chartAcronimo: item.nombre,
                chartNombre: item.nombre,
                chartLugar: item.nombre,
                chartTotal: Number(depTotals.get(item.id)?.total ?? 0),
            }
    })
    function onSelect(departamento: DepartamentoChart) {
        setQuery(`${departamento.nombre}, Peru`);
    }

    return (
        <>
            <Tooltip id="monitoreo-tooltip" style={{ zIndex: 1000 }} opacity={1}/>
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-4">
                <div>
                    <h4 className="mb-1">Monitoreo{query}</h4>
                    <p>Avance de Implementación de la Política Nacional y el PLANAGERD</p>
                </div>
                <div className="flex items-center gap-2">
                    <span>Categoria:</span>
                    <Select
                            className="w-[360px]"
                            options={categorias}
                            value={currentCategoria}
                            onChange={(n) => onCategoria(n)}
                            placeholder="Seleccione una categoria"
                            isDisabled={fetching}
                        />
                </div>
            </div>

            <Card bordered={true} className="flex overflow-x-scroll">
                <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
                    <table className="w-full table-fixed border-separate border-spacing-0 table-nowrap">
                        <thead>
                            <tr>
                                <th onClick={() => { setQuery(`Peru`); }} className="w-[240px] text-center cursor-pointer sticky left-0 z-20 min-w-[240px] max-w-[240px] bg-slate-50 p-2 text-[12px] font-semibold uppercase tracking-wide text-slate-600 ring-1 ring-slate-200">
                                    Localización
                                </th>
                                {COLS.map((c) => (
                                    <th
                                        key={c}
                                        className="w-[48px] max-w-[48px] bg-slate-50 p-1 text-center text-[10px] font-semibold uppercase tracking-wide text-slate-600 ring-1 ring-slate-200 lg:table-cell hidden"
                                        data-tooltip-id='monitoreo-tooltip'
                                        data-tooltip-content={getPregunta(c)?.pregunta || ''}
                                    >
                                        {c}
                                    </th>
                                ))}
                                <th className="w-[100px] max-w-[100px] bg-slate-50 p-2 text-center text-[12px] font-semibold uppercase tracking-wide text-slate-600 ring-1 ring-slate-200 whitespace-nowrap">
                                    Total %
                                </th>
                            </tr>
                        </thead>

                        <tbody className="[&_tr_last-child_td_>_span.tooltip-wrapper]:whitespace-nowrap">
                            {ordenData.map((dep) => {
                                const depKey = `D:${dep.id}`
                                const depOpen = expanded.has(depKey)
                                const dTotals = depTotals.get(dep.id)!

                                return (
                                    <Fragment key={`FRAGD-${depKey}`}>
                                        {/* Fila Departamento */}
                                        <tr className="bg-amber-50 hover:bg-slate-50/60">
                                            <td className="sticky cursor-pointer bg-amber-50 left-0 z-10 p-3 ring-1 ring-slate-200"
                                                data-tooltip-id='monitoreo-tooltip'
                                                data-tooltip-content='Departamento'
                                                onClick={() => {
                                                    toggle(depKey);
                                                    setQuery(`${dep.nombre}, Peru`);
                                                }}>
                                                <button
                                                    type="button"
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
                                                    className="p-3 text-center text-sm text-slate-700 ring-1 ring-slate-200 lg:table-cell hidden"
                                                >
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
                                                const pTotals = provTotals.get(prov.id,)!

                                                return (
                                                    <Fragment key={`FRAGP-${provKey}`}>
                                                        <tr className="bg-cyan-50 hover:bg-slate-50/60">
                                                            <td className="bg-cyan-50 cursor-pointer sticky left-0 z-10 p-3 pl-10 ring-1 ring-slate-200"
                                                                data-tooltip-id='monitoreo-tooltip'
                                                                data-tooltip-content='Provincia'
                                                                onClick={() => {
                                                                    toggle(provKey);
                                                                    setQuery(`${prov.nombre}, ${dep.nombre}, Peru`);
                                                                }}>
                                                                <button
                                                                    type="button"
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
                                                                        className="p-3 text-center text-sm text-slate-700 ring-1 ring-slate-200 lg:table-cell hidden"
                                                                    >
                                                                    </td>
                                                                ),
                                                            )}
                                                            <td className="p-3 text-center text-sm font-semibold text-slate-800 ring-1 ring-slate-200">
                                                                {pTotals.total.toFixed(2)} %
                                                            </td>
                                                        </tr>

                                                        {/* Distritos de la Provincia */}
                                                        {provOpen &&
                                                            prov.distritos.map((d) => {
                                                                const distKey = `DD:${d.id}`
                                                                const distOpen = expanded.has(distKey)
                                                                const dTotals = distTotals.get(d.id)!
                                                                return (
                                                                    <Fragment key={`FRAGDI-${distKey}`}>
                                                                        <tr className="hover:bg-slate-50 bg-emerald-50">
                                                                            <td
                                                                                data-tooltip-id='monitoreo-tooltip'
                                                                                data-tooltip-content='Distrito'
                                                                                onClick={() => {
                                                                                toggle(distKey);
                                                                                setQuery(`${d.nombre}, ${prov.nombre}, ${dep.nombre}, Peru`);
                                                                            }} className="cursor-pointer bg-emerald-50 sticky left-0 z-10 p-3 pl-22 ring-1 ring-slate-200">
                                                                                <button
                                                                                    type="button"
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
                                                                            {dTotals.cols.map(
                                                                                (
                                                                                    v,
                                                                                    i,
                                                                                ) => (
                                                                                    <td
                                                                                        key={
                                                                                            `${d.id}-${i}`
                                                                                        }
                                                                                        className="p-3 text-center text-sm text-slate-700 ring-1 ring-slate-200 lg:table-cell hidden"
                                                                                    >
                                                                                    </td>
                                                                                ),
                                                                            )}
                                                                            <td className="p-3 text-center text-sm font-semibold text-slate-800 ring-1 ring-slate-200">
                                                                                {dTotals.total.toFixed(2)} %
                                                                            </td>
                                                                        </tr>
                                                                        {/* Entidad del Distrito */}
                                                                        {distOpen &&
                                                                            d.entidades.map((entidad) => {
                                                                                const entKey = `ENT:${entidad.id}`
                                                                                const entOpen = expanded.has(entKey)
                                                                                return (
                                                                                    <Fragment key={`FRAGENT-${entKey}`}>
                                                                                        <tr className="hover:bg-slate-50 bg-purple-50">
                                                                                            <td
                                                                                                data-tooltip-id='monitoreo-tooltip'
                                                                                                data-tooltip-content='Entidad'
                                                                                                onClick={() => {
                                                                                                toggle(entKey);
                                                                                                setQuery(`${entidad.nombre}, ${d.nombre}, ${prov.nombre}, ${dep.nombre}, Peru`);
                                                                                                //setQuery(`${d.nombre}, ${prov.nombre}, ${dep.nombre}, Peru`);
                                                                                            }} className="cursor-pointer bg-purple-50 sticky left-0 z-10 p-3 pl-22 ring-1 ring-slate-200">
                                                                                                <button
                                                                                                    type="button"
                                                                                                    aria-expanded={
                                                                                                        distOpen
                                                                                                    }
                                                                                                    className="inline-flex items-center gap-2"
                                                                                                >
                                                                                                    <svg
                                                                                                        className={`h-4 w-4 transform transition-transform ${entOpen ? 'rotate-90' : ''}`}
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
                                                                                                            entidad.nombre
                                                                                                        }
                                                                                                    </span>
                                                                                                </button>
                                                                                            </td>
                                                                                            {entidad.monitoreo.map(
                                                                                                (
                                                                                                    v,
                                                                                                    i,
                                                                                                ) => (
                                                                                                    <td
                                                                                                        key={
                                                                                                            `${entidad.id}-${i}`
                                                                                                        }
                                                                                                        className="p-3 text-center text-sm text-slate-700 ring-1 ring-slate-200 text-[11px] lg:table-cell hidden"
                                                                                                    >
                                                                                                        {v ? 'SI' : 'NO'}
                                                                                                    </td>
                                                                                                ),
                                                                                            )}
                                                                                            <td
                                                                                                data-tooltip-id='monitoreo-tooltip'
                                                                                                data-tooltip-content={`Cantidad de Si: ${entidad.monitoreo.filter(m => m == 1).length}`}
                                                                                                className="p-3 text-center text-sm font-semibold text-slate-800 ring-1 ring-slate-200"
                                                                                            >
                                                                                                    {(promedioPorSuma(entidad.monitoreo, 30) * 100).toFixed(2)} %
                                                                                            </td>
                                                                                        </tr>
                                                                                        {entOpen &&
                                                                                            <tr className="table-row lg:hidden bg-slate">
                                                                                                <td colSpan={2}>
                                                                                                    <ListaRespuestas respuestas={entidad.monitoreo} />
                                                                                                </td>
                                                                                            </tr>
                                                                                        }
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
                    </table>
                </div>
            </Card>

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
                <div className="relative min-h-[450px] rounded-xl overflow-hidden ring-1 ring-slate-200 bg-slate-100">
                    <MapaPeru query={query} />
                </div>

                <Card className="h-full">
                    <Tabs defaultValue="tab1">
                        <TabList>
                            <TabNav value="tab1">Por Deparmentos</TabNav>
                            <TabNav value="tab2">Por Entidades</TabNav>
                        </TabList>
                        <div className="p-6">
                            <TabContent value="tab1">
                                <ChartPorDepartamento info={ordenData} onSelect={onSelect} />
                            </TabContent>
                            <TabContent value="tab2">
                                <ChartPorEntidad<Monitoreo>
                                    info={originalData}
                                    onSelect={onSelectChartEntidad}
                                />
                            </TabContent>
                        </div>
                    </Tabs>
                </Card>
            </div>
        </>
    )
}
