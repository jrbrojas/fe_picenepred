import { Fragment, useEffect, useMemo, useState } from 'react'
import Card from '@/components/ui/Card'
import { Select, Tooltip } from '@/components/ui'
import { SingleValue } from 'react-select'
import promedioDeGrupo, { Valor, promedio, promedioPorSuma } from './promedio'
import MapaPeru from './MapaPeru'
import { apiGetCategorias, apiGetMonitoreo } from '@/services/MonitoreService'
import { Pregunta, preguntas } from '@/constants/preguntas.constant'
import { MonitoreoResponse, MonitoreoRespuesta } from '@/services/types/getmonitoreo'
import { ChartInfo, ChartPorDepartamento } from './ChartPorDepartamento'
import Tabs from '@/components/ui/Tabs'
import { ChartPorEntidad, ChartPorEntidadInfo } from './ChartPorEntidad'

const { TabNav, TabList, TabContent } = Tabs


interface PreguntaTooltipProps {
    pregunta: Pregunta | null
}
const PreguntaTooltip = (props: PreguntaTooltipProps) => {
    if (!props.pregunta) {
        return null
    }

    function getTooltipText(codigo: string) {
        const pregunta = preguntas.find(c => c.codigo == codigo)
        return pregunta?.pregunta || "";
    }
    return (
        <div>
            <p>{props.pregunta.pregunta}</p>
        </div>
    );
}

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

type ApexSeries = Array<{
    name: string
    data: number[]
}>

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

    // Estados para los filtros
    const [selectedDepartamento, setSelectedDepartamento] = useState<CategoriaOption | null>(null)
    const [selectedProvincia, setSelectedProvincia] = useState<CategoriaOption | null>(null)
    const [selectedDistrito, setSelectedDistrito] = useState<CategoriaOption | null>(null)

    // Opciones para los selects
    const departamentoOptions = useMemo(() =>
        data.map(dep => ({
            value: dep.id,
            label: dep.nombre
        })), [data])

    const provinciaOptions = useMemo(() => {
        if (!selectedDepartamento) return []
        const departamento = data.find(dep => dep.id === selectedDepartamento.value)
        return departamento?.provincias.map(prov => ({
            value: prov.id,
            label: prov.nombre
        })) || []
    }, [data, selectedDepartamento])

    const distritoOptions = useMemo(() => {
        if (!selectedProvincia || !selectedDepartamento) return []
        const departamento = data.find(dep => dep.id === selectedDepartamento.value)
        const provincia = departamento?.provincias.find(prov => prov.id === selectedProvincia.value)
        return provincia?.distritos.map(dist => ({
            value: dist.id,
            label: dist.nombre
        })) || []
    }, [data, selectedDepartamento, selectedProvincia])

    // Manejadores de cambio
    const handleDepartamentoChange = (newValue: SingleValue<CategoriaOption>) => {
        setSelectedDepartamento(newValue)
        setSelectedProvincia(null)
        setSelectedDistrito(null)
    }

    const handleProvinciaChange = (newValue: SingleValue<CategoriaOption>) => {
        setSelectedProvincia(newValue)
        setSelectedDistrito(null)
    }

    const handleDistritoChange = (newValue: SingleValue<CategoriaOption>) => {
        setSelectedDistrito(newValue)
    }

    function getPregunta(codigo: string): Pregunta | null {
        return preguntas.find(c => c.codigo == codigo) || null
    }

    // Efecto para actualizar el gráfico cuando cambian los filtros
    useEffect(() => {
        updateChartData()
    }, [selectedDepartamento, selectedProvincia, selectedDistrito, data])

    const updateChartData = () => {
        //let seriesData: number[] = Array(COLS.length).fill(0)
        //let seriesName = 'Perú'

        //if (selectedDepartamento && !selectedProvincia && !selectedDistrito) {
        //    // Filtrar por departamento
        //    const departamento = data.find(dep => dep.id === selectedDepartamento.value)
        //    if (departamento) {
        //        const allDistritos = departamento.provincias.flatMap(prov => prov.distritos)
        //        seriesData = sumByIndex(allDistritos.map(d => d.valores))
        //        seriesName = `Departamento: ${departamento.nombre}`
        //    }
        //} else if (selectedDepartamento && selectedProvincia && !selectedDistrito) {
        //    // Filtrar por provincia
        //    const departamento = data.find(dep => dep.id === selectedDepartamento.value)
        //    const provincia = departamento?.provincias.find(prov => prov.id === selectedProvincia.value)
        //    if (provincia) {
        //        seriesData = sumByIndex(provincia.distritos.map(d => d.valores))
        //        seriesName = `Provincia: ${provincia.nombre}`
        //    }
        //} else if (selectedDepartamento && selectedProvincia && selectedDistrito) {
        //    // Filtrar por distrito
        //    const departamento = data.find(dep => dep.id === selectedDepartamento.value)
        //    const provincia = departamento?.provincias.find(prov => prov.id === selectedProvincia.value)
        //    const distrito = provincia?.distritos.find(dist => dist.id === selectedDistrito.value)
        //    if (distrito) {
        //        seriesData = distrito.valores
        //        seriesName = `Distrito: ${distrito.nombre}`
        //    }
        //} else {
        //    // Datos de todo Perú
        //    const allDistritos = data.flatMap(dep =>
        //        dep.provincias.flatMap(prov => prov.distritos)
        //    )
        //    seriesData = sumByIndex(allDistritos.map(d => d.valores))
        //    seriesName = 'Perú'
        //}

        // setChartSeries([{
        //     name: [], //seriesName,
        //     data: [] //seriesData
        // }])
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
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-4">
                <div>
                    <h4 className="mb-1">Monitoreo</h4>
                    <p>Avance de Implementación de la Política Nacional y el PLANAGERD</p>
                </div>
                <div className="flex items-center gap-2">
                    <span>Categoria:</span>
                    <Select
                            options={categorias}
                            value={currentCategoria}
                            onChange={(n) => onCategoria(n)}
                            placeholder="Seleccione una categoria"
                            isDisabled={fetching}
                        />
                </div>
            </div>

            <Card bordered={true} className="flex">
                <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
                    <table className="min-w-[1000px] table-fixed border-separate border-spacing-0">
                        <thead>
                            <tr>
                                <th onClick={() => { setQuery(`Peru`); }} className="text-center cursor-pointer sticky left-0 z-20 min-w-[240px] max-w-[240px] bg-slate-50 p-2 text-[12px] font-semibold uppercase tracking-wide text-slate-600 ring-1 ring-slate-200">
                                    Localización
                                </th>
                                {COLS.map((c) => (
                                    <th
                                        key={c}
                                        className="bg-slate-50 p-2 text-center text-[12px] font-semibold uppercase tracking-wide text-slate-600 ring-1 ring-slate-200"
                                    >
                                        {!getPregunta(c) ? c :
                                            <Tooltip title={<PreguntaTooltip pregunta={getPregunta(c)} />}>
                                                {c}
                                            </Tooltip>
                                        }
                                    </th>
                                ))}
                                <th className="w-[120px] bg-slate-50 p-2 text-center text-[12px] font-semibold uppercase tracking-wide text-slate-600 ring-1 ring-slate-200 whitespace-nowrap">
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
                                            <td className="sticky cursor-pointer bg-amber-50 left-0 z-10 p-3 ring-1 ring-slate-200"
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
                                                    className="p-3 text-center text-sm text-slate-700 ring-1 ring-slate-200"
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
                                                                        className="p-3 text-center text-sm text-slate-700 ring-1 ring-slate-200"
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
                                                                            <td onClick={() => {
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
                                                                                        className="p-3 text-center text-sm text-slate-700 ring-1 ring-slate-200"
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

                                                                                return (
                                                                                    <Fragment key={`FRAGENT-${entKey}`}>
                                                                                        <tr className="hover:bg-slate-50 bg-purple-50">
                                                                                            <td onClick={() => {
                                                                                                setQuery(`${d.nombre}, ${prov.nombre}, ${dep.nombre}, Peru`);
                                                                                            }} className="cursor-pointer bg-purple-50 sticky left-0 z-10 p-3 pl-22 ring-1 ring-slate-200">
                                                                                                <span className="text-sm font-semibold text-slate-800">
                                                                                                    {
                                                                                                        entidad.nombre
                                                                                                    }
                                                                                                </span>
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
                                                                                                        className="p-3 text-center text-sm text-slate-700 ring-1 ring-slate-200 text-[11px]"
                                                                                                    >
                                                                                                        {v ? 'SI' : 'NO'}
                                                                                                    </td>
                                                                                                ),
                                                                                            )}
                                                                                            <td className="p-3 text-center text-sm font-semibold text-slate-800 ring-1 ring-slate-200">
                                                                                                <Tooltip title={`Cantidad de Si: ${entidad.monitoreo.filter(m => m == 1).length}`}>
                                                                                                    {(promedioPorSuma(entidad.monitoreo, 30) * 100).toFixed(2)} %
                                                                                                </Tooltip>
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
