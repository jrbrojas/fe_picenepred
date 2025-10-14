import { Fragment, useEffect, useState } from 'react'
import MapaPeru from './MapaPeru'
import { DirectorioResponse } from './types'
import { apiGetDirectorio } from '@/services/MonitoreService'
import { formatDateYYYYMMDD } from '@/utils/datetime'
import FiltrosDirectorio from './FiltrosDirectorio'

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
}

function mapMonitoreoResponseToData(response: DirectorioResponse[]): Departamento[] {
    let data: Departamento[] = [];
    const mapValores = (item: DirectorioResponse): Entidad => ({
        id: item.id,
        nombre: item.nombre,
        nombre_entidad: item.nombre_entidad,
        apellido: item.apellido,
        cargo: item.cargo,
        dni: item.dni,
        email: item.email,
        fecha_fin: new Date(item.fecha_fin),
        fecha_inicio: new Date(item.fecha_inicio),
        rol: item.rol,
        telefono: item.telefono,
    })
    for (let i = 0; i < response.length; i++) {
        const monitoreo = response[i];
        const indexDepartamento = data.findIndex((item) => item.id == String(monitoreo.id_departamento));
        // no esta el departamento
        if (indexDepartamento === -1) {
            data.push({
                id: String(monitoreo.id_departamento),
                nombre: monitoreo.departamento,
                provincias: [{
                    id: String(monitoreo.id_provincia),
                    nombre: monitoreo.provincia,
                    distritos: [{
                        id: monitoreo.ubigeo,
                        nombre: monitoreo.distrito,
                        entidades: [mapValores(monitoreo)]
                    }]
                }]
            })
            continue;
        }
        const indexProvincia = data[indexDepartamento].provincias.findIndex((item) => item.id == String(monitoreo.id_provincia));
        // no esta la provincia
        if (indexProvincia === -1) {
            data[indexDepartamento].provincias.push({
                id: String(monitoreo.id_provincia),
                nombre: monitoreo.provincia,
                distritos: [{
                    id: monitoreo.ubigeo,
                    nombre: monitoreo.distrito,
                    entidades: [mapValores(monitoreo)],
                }]
            });
            continue;
        }
        const indexDistrito = data[indexDepartamento].provincias[indexProvincia].distritos.findIndex((item) => item.id == monitoreo.ubigeo);
        // no esta el distrito
        if (indexDistrito === -1) {
            data[indexDepartamento].provincias[indexProvincia].distritos.push({
                id: monitoreo.ubigeo,
                nombre: monitoreo.distrito,
                entidades: [mapValores(monitoreo)],
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

    async function fetchValues(distrito: string) {
        const response = await apiGetDirectorio(distrito)
        setData(mapMonitoreoResponseToData(response))
    }
    useEffect(() => {
        //boot();
    }, []);

    const toggle = (key: string) => {
        const next = new Set(expanded)
        next.has(key) ? next.delete(key) : next.add(key)
        setExpanded(next)
    }

    function onDistrito(distrito: string) {
        if (distrito) {
            fetchValues(distrito)
            return;
        }
        setData([]);
    }

    return (
        <>
            <div className="space-y-6">
                {/* Encabezado */}
                <div className="text-center">
                    <FiltrosDirectorio onDistrito={onDistrito} />
                </div>

                <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
                    {/* Tabla */}
                    <div className="flex min-w-full items-start">
                        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm flex-1">
                            <table className="min-w-full table-fixed border-separate border-spacing-0">
                                <thead>
                                    <tr>
                                        <th onClick={() => { setQuery(`Peru`); }} className="text-center cursor-pointer sticky left-0 z-20 min-w-[240px] max-w-[240px] bg-slate-50 p-3 text-[12px] font-semibold uppercase tracking-wide text-slate-600 ring-1 ring-slate-200">
                                            Localización
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
                                                </tr>

                                                {depOpen &&
                                                    dep.provincias.map((prov) => {
                                                        const provKey = `P:${prov.id}`
                                                        const provOpen =
                                                            expanded.has(provKey)
                                                        return (
                                                            <Fragment key={prov.id}>
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
                                                                </tr>

                                                                {/* Distritos de la Provincia */}
                                                                {provOpen &&
                                                                    prov.distritos.map((d) => {
                                                                        const distKey = `D:${d.id}`
                                                                        const distOpen = expanded.has(distKey)
                                                                        return (
                                                                            <Fragment key={d.id}>
                                                                                <tr className="hover:bg-slate-50 bg-emerald-5">
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
                                                                                {distOpen &&
                                                                                    d.entidades.map((entidad) => {
                                                                                        const entidadKey = `D:${entidad.id}`
                                                                                        const entidadOpen = expanded.has(entidadKey)
                                                                                        return (
                                                                                            <Fragment key={d.id}>
                                                                                                <tr className="hover:bg-slate-50 bg-purple-5">
                                                                                                    <td className="bg-purple-50 cursor-pointer sticky left-0 z-10 p-3 pl-22 ring-1 ring-slate-200"
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
                                                                                                                        toggle(entidadKey);
                                                                                                                        //setQuery(`${d.nombre}, ${prov.nombre}, ${dep.nombre}, Peru`);
                                                                                                                    }}>
                                                                                                                    <div className="grid justify-items-center">
                                                                                                                        <h3 className='mb-4'>Datos del responsable:</h3>
                                                                                                                        <div className="grid grid-cols-4 justify-items-between gap-4 min-w-full">
                                                                                                                            <div>
                                                                                                                                <p>Nombre</p>
                                                                                                                                <p className="font-bold text-lg">{entidad.nombre}</p>
                                                                                                                            </div>
                                                                                                                            <div>
                                                                                                                                <p>Apellido</p>
                                                                                                                                <p className="font-bold text-lg">{entidad.apellido}</p>
                                                                                                                            </div>
                                                                                                                            <div>
                                                                                                                                <p>DNI</p>
                                                                                                                                <p className="font-bold text-lg">{entidad.dni}</p>
                                                                                                                            </div>
                                                                                                                            <div>
                                                                                                                                <p>Cargo</p>
                                                                                                                                <p className="font-bold text-lg">{entidad.cargo}</p>
                                                                                                                            </div>
                                                                                                                            <div>
                                                                                                                                <p>Email</p>
                                                                                                                                <p className="font-bold text-lg">{entidad.email}</p>
                                                                                                                            </div>
                                                                                                                            <div>
                                                                                                                                <p>Telefono</p>
                                                                                                                                <p className="font-bold text-lg">{entidad.telefono}</p>
                                                                                                                            </div>
                                                                                                                            <div>
                                                                                                                                <p>Rol</p>
                                                                                                                                <p className="font-bold text-lg">{entidad.rol}</p>
                                                                                                                            </div>
                                                                                                                            <div>
                                                                                                                                <p>Fecha Inicio</p>
                                                                                                                                <p className="font-bold text-lg">{formatDateYYYYMMDD(entidad.fecha_inicio)}</p>
                                                                                                                            </div>
                                                                                                                            <div>
                                                                                                                                <p>Fecha Fin</p>
                                                                                                                                <p className="font-bold text-lg">{formatDateYYYYMMDD(entidad.fecha_fin)}</p>
                                                                                                                            </div>
                                                                                                                        </div>
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
