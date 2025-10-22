import { Fragment, useEffect, useMemo, useState } from 'react'
import Card from '@/components/ui/Card'
import Segment from '@/components/ui/Segment'
import ApexChart from 'react-apexcharts'
import { COLORS } from '@/constants/chart.constant'
import { Select, Tooltip } from '@/components/ui'
import { SingleValue } from 'react-select'
import promedioDeGrupo, { Valor, promedio, promedioPorSuma } from './promedio'
import MapaPeru from './MapaPeru'
import { MonitoreoResponse, RespuestaElement } from './types'
import { apiGetCategorias, apiGetMonitoreo } from '@/services/MonitoreService'
import { Pregunta, preguntas } from '@/constants/preguntas.constant'


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
    const mapValores = (respuestas: RespuestaElement[]) => respuestas.map((r) => r.respuesta.toLowerCase() === "si" ? 1 : 0)
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
                        nombre: monitoreo.distrito.nombre,
                        entidades: [
                            {
                                id: String(monitoreo.entidad.id),
                                nombre: monitoreo.entidad.nombre,
                                monitoreo: mapValores(monitoreo.respuestas)
                            }
                        ]
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
                    nombre: monitoreo.distrito.nombre,
                    entidades: [
                        {
                            id: String(monitoreo.entidad.id),
                            nombre: monitoreo.entidad.nombre,
                            monitoreo: mapValores(monitoreo.respuestas)
                        }
                    ]
                }]
            });
            continue;
        }
        const indexDistrito = data[indexDepartamento].provincias[indexProvincia].distritos.findIndex((item) => item.id == monitoreo.ubigeo);
        // no esta el distrito
        if (indexDistrito === -1) {
            data[indexDepartamento].provincias[indexProvincia].distritos.push({
                id: monitoreo.ubigeo,
                nombre: monitoreo.distrito.nombre,
                entidades: [
                    {
                        id: String(monitoreo.entidad.id),
                        nombre: monitoreo.entidad.nombre,
                        monitoreo: mapValores(monitoreo.respuestas)
                    }
                ]
            })
            continue;
        }
        data[indexDepartamento].provincias[indexProvincia].distritos[indexDistrito].entidades.push({
            id: String(monitoreo.entidad.id),
            nombre: monitoreo.entidad.nombre,
            monitoreo: mapValores(monitoreo.respuestas)
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

export default function TreeTableMonitoreo3Niveles() {
    // Set de expandibles: claves tipo "D:<depId>" y "P:<provId>"
    const [expanded, setExpanded] = useState<Set<string>>(new Set())
    const [data, setData] = useState<Departamento[]>([])
    const [categorias, setCategorias] = useState<CategoriaOption[]>([])
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

    async function fetchValues(categoria: string) {
        const response = await apiGetMonitoreo(categoria)
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
                                    <Fragment key={`FRAGP-${depKey}`}>
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
                                                const provOpen =
                                                    expanded.has(provKey)
                                                const pTotals = provTotals.get(
                                                    prov.id,
                                                )!

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
                                                                const distKey = `DD:${prov.id}`
                                                                const distOpen = expanded.has(distKey)
                                                                const dTotals = distTotals.get(d.id)!
                                                                return (
                                                                    <Fragment key={`FRAGDI-${distKey}`}>
                                                                        <tr
                                                                            key={
                                                                                d.id
                                                                            }
                                                                            className="hover:bg-slate-50 bg-emerald-50"
                                                                        >
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
                                                                                            i
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
                                                                                        <tr
                                                                                            key={
                                                                                                entidad.id
                                                                                            }
                                                                                            className="hover:bg-slate-50 bg-purple-50"
                                                                                        >
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
                                                                                                            i
                                                                                                        }
                                                                                                        className="p-3 text-center text-sm text-slate-700 ring-1 ring-slate-200"
                                                                                                    >
                                                                                                        {v}
                                                                                                    </td>
                                                                                                ),
                                                                                            )}
                                                                                            <td className="p-3 text-center text-sm font-semibold text-slate-800 ring-1 ring-slate-200">
                                                                                                {(promedioPorSuma(entidad.monitoreo, 30) * 100).toFixed(2)} %
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
                                    colSpan={1}
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
                    <MapaPeru query={query} />
                </div>

                <Card className="h-full">
                    {/* <div className="flex items-center justify-between mb-4">
                        <div className="flex gap-2">
                            <Select
                                className="min-w-[150px]"
                                placeholder="Departamento"
                                options={departamentoOptions}
                                value={selectedDepartamento}
                                onChange={handleDepartamentoChange}
                            />
                            <Select
                                className="min-w-[150px]"
                                placeholder="Provincia"
                                options={provinciaOptions}
                                value={selectedProvincia}
                                onChange={handleProvinciaChange}
                                isDisabled={!selectedDepartamento}
                            />
                            <Select
                                className="min-w-[150px]"
                                placeholder="Distrito"
                                options={distritoOptions}
                                value={selectedDistrito}
                                onChange={handleDistritoChange}
                                isDisabled={!selectedProvincia}
                            />
                        </div>
                    </div> */}

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
