import { Fragment, MouseEventHandler, useEffect, useMemo, useState } from 'react'
import Card from '@/components/ui/Card'
import { Select, Dialog, Button } from '@/components/ui'
import { SingleValue } from 'react-select'
import MapaPeru from './MapaPeru'
import { apiGetCategorias, apiGetSupervision } from '@/services/MonitoreService'
import { SupervisionResponse, SupervisionRespuesta } from '@/services/types/getsupervision'
import { ChartInfo, ChartPorDepartamento } from './ChartPorDepartamento'
import Tabs from '@/components/ui/Tabs'
import { ChartPorEntidad, ChartPorEntidadInfo } from './ChartPorEntidad'
import { Tooltip } from 'react-tooltip'
import UploadFile from '@/shared/forms/UploadFile'
import { urlToFile } from '@/shared/file'

const { TabNav, TabList, TabContent } = Tabs

type Entidad = {
    id: string
    nombre: string
    supervision: number[]
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

const COLS = ["Actividades", "Programas", "Proyectos", "Otros"]

function mapMonitoreoResponseToData(response: SupervisionResponse[]): Departamento[] {
    let data: Departamento[] = [];
    const mapValores = (respuestas: SupervisionRespuesta[]) => respuestas.map((r) => r.respuesta.toLowerCase() === "si" ? parseFloat(r.promedio) : 0)
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
                                supervision: mapValores(monitoreo.supervision_respuestas)
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
                            supervision: mapValores(monitoreo.supervision_respuestas)
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
                        supervision: mapValores(monitoreo.supervision_respuestas)
                    }
                ]
            })
            continue;
        }
        data[indexDepartamento].provincias[indexProvincia].distritos[indexDistrito].entidades.push({
            id: String(monitoreo.entidad.id),
            nombre: monitoreo.entidad.nombre,
            supervision: mapValores(monitoreo.supervision_respuestas)
        })
    }
    return data;
}
interface ShowDataModalProps {
    isOpen: boolean
    data: SupervisionRespuesta | null
    onRequestClose: () => void
}
function ShowDataModal({
    isOpen,
    data,
    onRequestClose,
}: ShowDataModalProps) {
    function onDialogClose() {
        onRequestClose();
        console.log("close")
    }
    return (
        <Dialog
            isOpen={isOpen}
            bodyOpenClassName="overflow-hidden"
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
        >
            <h5 className="mb-4 uppercase">{data?.nombre}</h5>
            {
                data?.files.map((file, i) => {
                    const [fileObj, setFileObj] = useState<File | null>(null)
                    useEffect(() => {
                        urlToFile(file.url).then((i) => setFileObj(i));
                    }, []);
                    return (
                        <div className={'grid grid-cols-2 ' + (i > 0 ? 'border-t' : '')} key={file.id}>
                            <div>{file.description ?? 'No hay descripcion'}</div>
                            <div className="font-bold text-right">{Number(file.porcentaje ?? 0).toFixed(2)} %</div>
                            {fileObj && <div className="col-span-2"><UploadFile
                                uploadLimit={1}
                                disabled={true}
                                fileList={[fileObj]}
                                multiple={false}
                            /></div>}
                        </div>
                    )
                })
            }
            {data && data.files.length === 0 && (<div className='w-full text-center uppercase'>No hay mas informacion</div>)}
            <div><strong>Total: </strong>{Number(data?.promedio).toFixed(2)} %</div>
        </Dialog>
    );
}

type Counter = { cols: number[]; total: number }

interface CategoriaOption {
    value: string;
    label: string;
}

interface Supervision extends SupervisionResponse, ChartPorEntidadInfo {}
export default function TreeTableMonitoreo3Niveles() {
    // Set de expandibles: claves tipo "D:<depId>" y "P:<provId>"
    const [expanded, setExpanded] = useState<Set<string>>(new Set())
    const [data, setData] = useState<Departamento[]>([])
    const [categorias, setCategorias] = useState<CategoriaOption[]>([])
    const [originalData, setOriginalData] = useState<Supervision[]>([])
    const [currentCategoria, setCurrentCategoria] = useState<CategoriaOption | null>(null)
    const [fetching, setFetching] = useState(true)
    const [query, setQuery] = useState("Peru");
    const [openShowModal, setOpenShowModal] = useState(false);
    const [dataShowModal, setDataShowModal] = useState<SupervisionRespuesta | null>(null);


    async function onCategoria(newValue: SingleValue<CategoriaOption>) {
        if (!newValue) {
            return;
        }
        setFetching(true)
        setCurrentCategoria(newValue);
        await fetchValues(newValue.value)
        setFetching(false)
    }

    function onSelectChartEntidad(info: Supervision) {
        setQuery(`${info.entidad.distrito.nombre}, ${info.entidad.distrito.provincia.nombre}, ${info.entidad.distrito.provincia.departamento.nombre}, Perú`)
    }

    async function fetchValues(categoria: string) {
        const response = await apiGetSupervision(categoria)
        setData(mapMonitoreoResponseToData(response))
        const mapValores = (respuestas: SupervisionRespuesta[]) => respuestas.map((r) => r.respuesta.toLowerCase() === "si" ? parseFloat(r.promedio) : 0)
        setOriginalData(
            response.map(i => {
                const n = mapValores(i.supervision_respuestas)
                const nombre2 = i.entidad.nombre.replace(/MUNICIPALIDAD PROVINCIAL DE|MUNICIPALIDAD DISTRITAL DE/, "")
                return {
                    ...i,
                    chartNombre: i.entidad.nombre,
                    chartAcronimo: nombre2,
                    chartTotal: promedio(n, 4),
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
    function promedio(arr: number[], total: number): number {
        const sum = arr.reduce((a, b) => a + b, 0);
        return Number(((sum / total)).toFixed(2));
    }

    const { provTotals, depTotals, distTotals } = useMemo(() => {
        const distTotals = new Map<string, Counter>()
        const provTotals = new Map<string, Counter>()
        const depTotals = new Map<string, Counter>()

        for (const dep of data) {
            const promediosDeProvincias = []
            const columnasDeProvincias = []
            for (const prov of dep.provincias) {
                const promediosDeDistritos = []
                const columnasDeDistritos = []
                for (const dist of prov.distritos) {
                    const numbers = dist.entidades.map(i => i.supervision);
                    const arrayPromedios = numbers.map(i => promedio(i, i.length))
                    const total = promedio(arrayPromedios, arrayPromedios.length) || 0;
                    const cols = [0, 0, 0, 0];
                    for (let i = 0; i < 4; i++) {
                        const valoresColumna = numbers.map((v) => v[i])
                        cols[i] = promedio(valoresColumna, valoresColumna.length) || 0
                    }
                    promediosDeDistritos.push(total)
                    columnasDeDistritos.push(cols)
                    distTotals.set(dist.id, { cols, total })
                }
                const total = promedio(promediosDeDistritos, promediosDeDistritos.length)
                const cols = [0, 0, 0, 0];
                for (let i = 0; i < 4; i++) {
                    const valoresColumna = columnasDeDistritos.map((v) => v[i])
                    cols[i] = promedio(valoresColumna, valoresColumna.length) || 0
                }
                promediosDeProvincias.push(total)
                columnasDeProvincias.push(cols)
                provTotals.set(prov.id, { cols, total })
            }
            const total = promedio(promediosDeProvincias, promediosDeProvincias.length)
            const cols = [0, 0, 0, 0];
            for (let i = 0; i < 4; i++) {
                const valoresColumna = columnasDeProvincias.map((v) => v[i])
                cols[i] = promedio(valoresColumna, valoresColumna.length) || 0
            }
            depTotals.set(dep.id, { cols, total })
        }
        return { provTotals, depTotals, distTotals }
    }, [data])

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
    function handleShowDataModal(entidad: Entidad, index: number) {
        const supervision = originalData.find(item => item.entidad_id === Number(entidad.id));
        if (!supervision) {
            return console.error("No esta la supervision");
        }
        const respuesta = supervision?.supervision_respuestas[index];
        if (!respuesta) {
            return console.error("No esta la respuesta de la supervision");
        }
        if (respuesta.respuesta === "no") {
            return;
        }
        setDataShowModal(respuesta);
        setOpenShowModal(true);
    }

    return (
        <>
            <ShowDataModal isOpen={openShowModal} data={dataShowModal ?? null} onRequestClose={() => setOpenShowModal(false)} />
            <Tooltip id="supervision-tooltip" style={{ zIndex: 1000 }} opacity={1}/>
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-4">
                <div>
                    <h4 className="mb-1">Supervisión</h4>
                    <p>Estado de Implementación de Instrumentos</p>
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
            <Card bordered={true}>
                <div className="flex items-center gap-2">
                    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
                        <table className="min-w-[1000px] table-fixed border-separate border-spacing-0 table-nowrap">
                            <thead>
                                <tr>
                                    <th className="sticky left-0 z-20 min-w-[240px] max-w-[240px] bg-slate-50 p-3 text-left text-[12px] font-semibold uppercase tracking-wide text-slate-600 ring-1 ring-slate-200" rowSpan={2}>
                                        Localización
                                    </th>
                                    <th className="w-[120px] bg-slate-50 p-2 text-center text-[14px] font-semibold uppercase tracking-wide text-slate-600 ring-1 ring-slate-200 whitespace-nowrap" colSpan={4}>
                                        % DE AVANCE
                                    </th>
                                    <th className="w-[120px] bg-slate-50 p-3 text-center text-[12px] font-semibold uppercase tracking-wide text-slate-600 ring-1 ring-slate-200 whitespace-nowrap" rowSpan={2}>
                                        Total %
                                    </th>
                                </tr>
                                <tr>
                                    {COLS.map((c) => (
                                        <th
                                            key={c}
                                            className="bg-slate-50 p-2 text-center text-[12px] font-semibold uppercase tracking-wide text-slate-600 ring-1 ring-slate-200"
                                        >
                                            {c}
                                        </th>
                                    ))}
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
                                            <tr className="bg-amber-50 hover:[&>td]:bg-[#ccffff]">
                                                <td
                                                    data-tooltip-id='supervision-tooltip'
                                                    data-tooltip-content='Departamento'
                                                    className="sticky bg-amber-50 left-0 z-10 p-3 ring-1 ring-slate-200"
                                                    onClick={() => {
                                                        toggle(depKey);
                                                        setQuery(`${dep.nombre}, Peru`);
                                                    }}
                                                >
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
                                                            <tr className="bg-cyan-50 hover:[&>td]:bg-[#ccffff]">
                                                                <td
                                                                    data-tooltip-id='supervision-tooltip'
                                                                    data-tooltip-content='Provincia'
                                                                    className="sticky bg-cyan-50 left-0 z-10 p-3 pl-10 ring-1 ring-slate-200"
                                                                    onClick={() => {
                                                                        toggle(provKey);
                                                                        setQuery(`${prov.nombre}, ${dep.nombre}, Peru`);
                                                                    }}
                                                                >
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
                                                                prov.distritos.map(
                                                                    (d, index) => {
                                                                        const distKey = `DD:${d.id}`
                                                                        const distOpen = expanded.has(distKey)
                                                                        const valsDist: Counter = distTotals.get(d.id) || { cols: [], total: 0 }
                                                                        return (
                                                                            <Fragment key={`FRAGDI-${distKey}`}>
                                                                                <tr className="hover:[&>td]:bg-[#ccffff] bg-emerald-50">
                                                                                    <td
                                                                                        data-tooltip-id='supervision-tooltip'
                                                                                        data-tooltip-content='Distrito'
                                                                                        className="sticky bg-emerald-50 left-0 z-10 p-3 pl-16 ring-1 ring-slate-200"
                                                                                        onClick={() => {
                                                                                            toggle(distKey);
                                                                                            setQuery(`${d.nombre}, ${prov.nombre}, ${dep.nombre}, Peru`);
                                                                                        }}
                                                                                    >
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
                                                                                            </td>
                                                                                        ),
                                                                                    )}
                                                                                    <td className="p-3 text-center text-sm font-semibold text-slate-800 ring-1 ring-slate-200">
                                                                                        {valsDist.total.toFixed(2)} %
                                                                                    </td>
                                                                                </tr>
                                                                                {/* Entidades de Distrito */}
                                                                                {distOpen &&
                                                                                    d.entidades.map((entidad) => {
                                                                                        const entKey = `ENT:${entidad.id}`

                                                                                        return (
                                                                                            <Fragment key={`FRAGENT-${entKey}`}>
                                                                                                <tr
                                                                                                    className="hover:[&>td]:bg-[#ccffff] bg-purple-50"
                                                                                                >
                                                                                                    <td
                                                                                                        data-tooltip-id='supervision-tooltip'
                                                                                                        data-tooltip-content='Entidad'
                                                                                                        onClick={() => {
                                                                                                        setQuery(`${d.nombre}, ${prov.nombre}, ${dep.nombre}, Peru`);
                                                                                                    }} className="sticky bg-purple-50 left-0 z-10 p-3 pl-16 ring-1 ring-slate-200">
                                                                                                        <span className="text-sm font-semibold text-slate-800">
                                                                                                            {
                                                                                                                entidad.nombre
                                                                                                            }
                                                                                                        </span>
                                                                                                    </td>
                                                                                                    {entidad.supervision.map(
                                                                                                        (
                                                                                                            v,
                                                                                                            i,
                                                                                                        ) => (
                                                                                                            <td
                                                                                                                key={
                                                                                                                    `${entidad.id}-${i}`
                                                                                                                }
                                                                                                                className="p-3 text-center text-sm text-slate-700 ring-1 ring-slate-200"
                                                                                                                onMouseOver={() => handleShowDataModal(entidad, i)}
                                                                                                            >
                                                                                                                {
                                                                                                                    v.toFixed(2)
                                                                                                                } %
                                                                                                            </td>
                                                                                                        ),
                                                                                                    )}
                                                                                                    <td className="p-3 text-center text-sm font-semibold text-slate-800 ring-1 ring-slate-200">
                                                                                                        {(
                                                                                                            promedio(
                                                                                                                entidad.supervision,
                                                                                                                4,
                                                                                                            ) || 0
                                                                                                        ).toFixed(2)} %
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
                                <ChartPorEntidad<Supervision>
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
