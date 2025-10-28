import { Fragment, useEffect, useState } from 'react'
import MapaPeru from './MapaPeru'
import { apiExportarExcelDeEntidades, apiGetDirectorio } from '@/services/MonitoreService'
import FiltrosDirectorio from './FiltrosDirectorio'
import { EntidadResponse } from '@/shared/services/ControlesService'
import { Button } from '@/components/ui'
import { FaFileExcel } from "react-icons/fa6";
import { DirectorioInfo } from './DirectorioInfo'
import { DirectorioResponse } from '@/services/types/getdirectorio'

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
type Entidad = {
    id: number
    nombre: string
    nombre_entidad: string
    apellido: string
    dni: string
    cargo: string
    email: string
    telefono: string
    rol: string
    fecha_inicio: Date
    fecha_fin: Date
    originalData: DirectorioResponse
}

function mapMonitoreoResponseToData(response: DirectorioResponse[]): Departamento[] {
    let data: Departamento[] = [];
    const mapValores = (item: DirectorioResponse): Entidad => ({
        id: item.id,
        nombre: item.responsable.nombre,
        nombre_entidad: item.entidad.nombre,
        apellido: item.responsable.apellido,
        cargo: item.responsable.cargo.nombre,
        dni: item.responsable.dni,
        email: item.responsable.email,
        fecha_fin: new Date(item.responsable.fecha_fin),
        fecha_inicio: new Date(item.responsable.fecha_inicio),
        rol: item.responsable.roles_responsable.nombre,
        telefono: item.responsable.telefono,
        originalData: item
    })
    for (let i = 0; i < response.length; i++) {
        const monitoreo = response[i];
        const indexDepartamento = data.findIndex((item) => item.id == String(monitoreo.entidad.distrito.provincia.departamento_id));
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
                        entidades: [mapValores(monitoreo)]
                    }]
                }]
            })
            continue;
        }
        const indexProvincia = data[indexDepartamento].provincias.findIndex((item) => item.id == String(monitoreo.entidad.distrito.provincia_id));
        // no esta la provincia
        if (indexProvincia === -1) {
            data[indexDepartamento].provincias.push({
                id: String(monitoreo.entidad.distrito.provincia_id),
                nombre: monitoreo.entidad.distrito.provincia.nombre,
                distritos: [{
                    id: String(monitoreo.entidad.distrito_id),
                    nombre: monitoreo.entidad.distrito.nombre,
                    entidades: [mapValores(monitoreo)]
                }]
            });
            continue;
        }
        const indexDistrito = data[indexDepartamento].provincias[indexProvincia].distritos.findIndex((item) => item.id == String(monitoreo.entidad.distrito_id));
        // no esta el distrito
        if (indexDistrito === -1) {
            data[indexDepartamento].provincias[indexProvincia].distritos.push({
                id: String(monitoreo.entidad.distrito_id),
                nombre: monitoreo.entidad.distrito.nombre,
                entidades: [mapValores(monitoreo)]
            })
            continue;
        }
        data[indexDepartamento].provincias[indexProvincia].distritos[indexDistrito].entidades.push(mapValores(monitoreo))
    }
    return data;
}
export default function TreeTableMonitoreo3Niveles() {
    // Set de expandibles: claves tipo "D:<depId>" y "P:<provId>"
    const [expanded, setExpanded] = useState<Set<string>>(new Set())
    const [data, setData] = useState<Departamento[]>([])
    const [query, setQuery] = useState("Peru");
    const [originalData, setOriginalData] = useState<DirectorioResponse[]>([])

    function newData(data: Departamento[]) {
        setData(data);
        setExpanded(new Set())
    }

    const toggle = (key: string) => {
        const next = new Set(expanded)
        next.has(key) ? next.delete(key) : next.add(key)
        setExpanded(next)
    }

    function fillData(response: DirectorioResponse[]) {
        if (response.length > 0) {
            const first = response[0];
            setQuery(`${first.entidad.distrito.nombre}, ${first.entidad.distrito.provincia.nombre}, ${first.entidad.distrito.provincia.departamento.nombre}, Peru`);
        }
        setOriginalData(response)
        newData(mapMonitoreoResponseToData(response))
        setExpanded(new Set(response.map((i) => `EE:${i.id}`)))
    }

    async function onDistrito(distrito: string) {
        newData([]);
        if (distrito) {
            const response = await apiGetDirectorio(String(distrito))
            fillData(response);
            return;
        }
        setQuery("Peru");
    }
    async function onSearchEntidad(entidad: EntidadResponse | null) {
        newData([]);
        if (entidad) {
            const response = await apiGetDirectorio("", "", String(entidad.id))
            if (response) {
                fillData(response);
                return;
            }
        }
        setQuery("Peru");
    }
    async function onSearchText(text: string | null) {
        newData([]);
        if (text) {
            const response = await apiGetDirectorio("", text)
            if (response) {
                fillData(response);
                return;
            }
        }
        setQuery("Peru");
    }

    async function onExportExcel() {
        try {
            const ids = Array.from(new Set(originalData.map((i) => i.entidad_id)))

            const response: any = await apiExportarExcelDeEntidades(ids);

            // Crear un objeto URL temporal con el Blob del PDF
            const url = window.URL.createObjectURL(response);

            // Crear un link oculto para forzar la descarga
            const link = document.createElement("a");
            link.href = url;
            const timestamp = new Date().getTime();
            link.setAttribute("download", `entidades_${timestamp}.xlsx`); // nombre del archivo
            document.body.appendChild(link);
            link.click();

            // Limpiar
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error al descargar el Excel:", error);
        }

    }

    return (
        <>
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-4">
                <div>
                    <h4 className="mb-1">Directorio Nacional</h4>
                    <p>Lista de contactos a nivel nacional GRD</p>
                </div>
                <div className="flex items-center w-[100nw] md:w-[35vw] w-full justify-end">
                    <FiltrosDirectorio onDistrito={onDistrito} onSearchEntidad={onSearchEntidad} onSearchText={onSearchText}/>
                </div>
            </div>

            <div className="space-y-6">

                <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
                    {/* Tabla */}
                    <div className="flex min-w-full items-start">
                        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm flex-1">
                            <table className="min-w-full table-fixed border-separate border-spacing-0">
                                <thead>
                                    <tr>
                                        <th onClick={() => { setQuery(`Peru`); }} className="text-center cursor-pointer sticky left-0 z-20 min-w-[240px] max-w-[240px] bg-slate-50 p-3 text-[12px] font-semibold uppercase tracking-wide text-slate-600 ring-1 ring-slate-200">
                                            <div className='flex items-center justify-center w-full min-h-[48px] h-full relative'>
                                                Localización
                                                <Button
                                                    className="absolute top-0 right-0"
                                                    onClick={onExportExcel}
                                                    icon={<FaFileExcel />}
                                                >Exportar</Button>
                                            </div>
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {data.map((dep) => {
                                        const depKey = `D:${dep.id}`
                                        const depOpen = expanded.has(depKey)

                                        return (
                                            <Fragment key={dep.id}>
                                                {/* Fila Departamento */}
                                                <tr className="bg-amber-50 hover:bg-slate-50/60 hidden">
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
                                                </tr>

                                                {//depOpen &&
                                                    dep.provincias.map((prov) => {
                                                        const provKey = `P:${prov.id}`
                                                        const provOpen =
                                                            expanded.has(provKey)
                                                        return (
                                                            <Fragment key={prov.id}>
                                                                <tr className="bg-cyan-50 hover:bg-slate-50/60 hidden">
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
                                                                </tr>

                                                                {/* Distritos de la Provincia */}
                                                                {//provOpen &&
                                                                    prov.distritos.map((d) => {
                                                                        const distKey = `D:${d.id}`
                                                                        const distOpen = expanded.has(distKey)
                                                                        return (
                                                                            <Fragment key={d.id}>
                                                                                <tr className="hover:bg-slate-50 bg-emerald-5 hidden">
                                                                                    <td className="bg-emerald-50 cursor-pointer sticky left-0 z-10 p-3 pl-16 ring-1 ring-slate-200"
                                                                                        onClick={() => {
                                                                                            toggle(distKey);
                                                                                            setQuery(`${d.nombre}, ${prov.nombre}, ${dep.nombre}, Peru`);
                                                                                        }}>
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
                                                                                </tr>
                                                                                {/* Entidades de distrito */}
                                                                                {//distOpen &&
                                                                                    d.entidades.map((entidad) => {
                                                                                        const entidadKey = `EE:${entidad.id}`
                                                                                        const entidadOpen = expanded.has(entidadKey)
                                                                                        return (
                                                                                            <Fragment key={entidad.id}>
                                                                                                <tr className="hover:bg-slate-50 bg-purple-5">
                                                                                                    <td className="bg-purple-50 cursor-pointer sticky left-0 z-10 p-3 ring-1 ring-slate-200"
                                                                                                        onClick={() => {
                                                                                                            toggle(entidadKey);
                                                                                                            setQuery(`${d.nombre}, ${prov.nombre}, ${dep.nombre}, Peru`);
                                                                                                        }}>
                                                                                                        <button
                                                                                                            type="button"
                                                                                                            aria-expanded={
                                                                                                                entidadOpen
                                                                                                            }
                                                                                                            className="inline-flex items-center gap-2"
                                                                                                        >
                                                                                                            <svg
                                                                                                                className={`h-4 w-4 transform transition-transform ${entidadOpen ? 'rotate-90' : ''}`}
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
                                                                                                                {entidad.nombre_entidad}
                                                                                                            </span>
                                                                                                        </button>
                                                                                                    </td>
                                                                                                </tr>
                                                                                                {/* Entidades de distrito */}
                                                                                                {entidadOpen &&
                                                                                                    (
                                                                                                        <Fragment key={d.id}>
                                                                                                            <tr className="hover:bg-slate-50 bg-purple-5">
                                                                                                                <td className="bg-purple-50 cursor-pointer sticky left-0 z-10 p-3 pl-10 ring-1 ring-slate-200"
                                                                                                                    onClick={() => {
                                                                                                                        //toggle(entidadKey);
                                                                                                                        //setQuery(`${d.nombre}, ${prov.nombre}, ${dep.nombre}, Peru`);
                                                                                                                    }}>
                                                                                                                    <div className="grid justify-items-center">
                                                                                                                        <DirectorioInfo directorio={entidad.originalData}/>
                                                                                                                    </div>
                                                                                                                </td>
                                                                                                            </tr>
                                                                                                        </Fragment>
                                                                                                    )}
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
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                    <div className="relative min-h-[450px] rounded-xl overflow-hidden ring-1 ring-slate-200 bg-slate-100 max-h-[440px]">
                        <MapaPeru query={query} />
                    </div>
                </div>
            </div>

        </>
    )
}
