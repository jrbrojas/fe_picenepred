import { formatDateYYYYMMDD, noHaPasado } from "@/utils/datetime";
import { DirectorioResponse } from "./responses/directorio/types";
import { Table, Tooltip } from "@/components/ui";

const { Tr, Th, Td, THead, TBody } = Table


interface DirectorioInfoProps {
    directorio: DirectorioResponse
}
export function DirectorioInfo({ directorio }: DirectorioInfoProps) {
    return (
        <>
            <h3 className='mb-4'>Datos de la Entidad:</h3>
            <div className="grid grid-cols-4 justify-items-between gap-4 min-w-full">
                {/*
                <div>
                    <p>Nombre</p>
                    <p className="font-bold text-lg">{directorio.entidad.nombre}</p>
                </div>
                */}
                <div>
                    <p>Departamento</p>
                    <p className="font-bold text-lg">{directorio.departamento}</p>
                </div>
                <div>
                    <p>Provincia</p>
                    <p className="font-bold text-lg">{directorio.provincia}</p>
                </div>
                <div>
                    <p>Distrito</p>
                    <p className="font-bold text-lg">{directorio.distrito}</p>
                </div>
                <div>
                    <p>Ubigeo</p>
                    <p className="font-bold text-lg">{directorio.ubigeo}</p>
                </div>
                <div>
                    <p>Categoria</p>
                    <p className="font-bold text-lg">{directorio.categoria}</p>
                </div>
                {/*
                <div>
                    <p>Fecha de Registro</p>
                    <p className="font-bold text-lg">{formatDateYYYYMMDD(new Date(directorio.fecha_inicio))}</p>
                </div>
                */}
            </div>
            <h3 className='mb-4'>Datos del Responsable:</h3>
            <div className="grid grid-cols-4 justify-items-between gap-4 min-w-full">
                <div>
                    <p>Nombre</p>
                    <p className="font-bold text-lg">{directorio.nombre}</p>
                </div>
                <div>
                    <p>Apellido</p>
                    <p className="font-bold text-lg">{directorio.apellido}</p>
                </div>
                <div>
                    <p>DNI</p>
                    <p className="font-bold text-lg">{directorio.dni}</p>
                </div>
                <div>
                    <p>Cargo</p>
                    <p className="font-bold text-lg">{directorio.cargo}</p>
                </div>
                <div>
                    <p>Email</p>
                    <p className="font-bold text-lg">{directorio.email}</p>
                </div>
                <div>
                    <p>Telefono</p>
                    <p className="font-bold text-lg">{directorio.telefono}</p>
                </div>
                <div>
                    <p>Rol</p>
                    <p className="font-bold text-lg">{directorio.rol}</p>
                </div>
                <div>
                    <p>Fecha Inicio</p>
                    <p className="font-bold text-lg">{formatDateYYYYMMDD(new Date(directorio.fecha_inicio))}</p>
                </div>
                <div>
                    <p>Fecha Fin</p>
                    <p className="font-bold text-lg">{formatDateYYYYMMDD(new Date(directorio.fecha_fin))}</p>
                </div>
            </div>
            <h3 className='mb-4'>Historial de Responsables:</h3>
            {directorio.historial.length == 0 ? <p>No hay historial</p> :
                <Table>
                    <THead>
                        <Tr>
                            <Th>Nombres</Th>
                            <Th>Apellidos</Th>
                            <Th>DNI</Th>
                            <Th>Fecha Inicio</Th>
                            <Th>Fecha Fin</Th>
                            <Th>Estado</Th>
                        </Tr>
                    </THead>
                    <TBody>
                        {directorio.historial.map(r =>
                            <Tr key={r.id}>
                                <Td>{r.nombre}</Td>
                                <Td>{r.apellido}</Td>
                                <Td>{r.dni}</Td>
                                <Td>{formatDateYYYYMMDD(new Date(r.fecha_inicio))}</Td>
                                <Td>{formatDateYYYYMMDD(new Date(r.fecha_fin))}</Td>
                                <Td>{noHaPasado(new Date(r.fecha_fin)) ? 'Activo' : 'Inactivo'}</Td>
                            </Tr>
                        )}
                    </TBody>
                </Table>
            }
        </>
    )
}

