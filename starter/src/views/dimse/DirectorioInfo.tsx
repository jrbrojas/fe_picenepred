import { formatDateYYYYMMDD, noHaPasado } from "@/utils/datetime";
import { Table, Tooltip } from "@/components/ui";
import { DirectorioResponse } from "@/services/types/getdirectorio";
import { useMemo } from "react";

const { Tr, Th, Td, THead, TBody } = Table


interface DirectorioInfoProps {
    directorio: DirectorioResponse
}
export function DirectorioInfo({ directorio }: DirectorioInfoProps) {
    const historial = useMemo(() => {
        return directorio.historial_responsables.filter((_,i) => i > 0).sort((a, b) => b.id - a.id);
    })
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
                    <p className="font-bold text-lg">{directorio.entidad.distrito.provincia.departamento.nombre}</p>
                </div>
                <div>
                    <p>Provincia</p>
                    <p className="font-bold text-lg">{directorio.entidad.distrito.provincia.nombre}</p>
                </div>
                <div>
                    <p>Distrito</p>
                    <p className="font-bold text-lg">{directorio.entidad.distrito.nombre}</p>
                </div>
                <div>
                    <p>Ubigeo</p>
                    <p className="font-bold text-lg">{directorio.entidad.distrito.codigo}</p>
                </div>
                <div>
                    <p>Categoria</p>
                    <p className="font-bold text-lg">{directorio.entidad.categoria.nombre}</p>
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
                    <p className="font-bold text-lg">{directorio.responsable.nombre}</p>
                </div>
                <div>
                    <p>Apellido</p>
                    <p className="font-bold text-lg">{directorio.responsable.apellido}</p>
                </div>
                <div>
                    <p>DNI</p>
                    <p className="font-bold text-lg">{directorio.responsable.dni}</p>
                </div>
                <div>
                    <p>Cargo</p>
                    <p className="font-bold text-lg">{directorio.responsable.cargo?.nombre}</p>
                </div>
                <div>
                    <p>Email</p>
                    <p className="font-bold text-lg">{directorio.responsable.email}</p>
                </div>
                <div>
                    <p>Telefono</p>
                    <p className="font-bold text-lg">{directorio.responsable.telefono}</p>
                </div>
                <div>
                    <p>Rol</p>
                    <p className="font-bold text-lg">{directorio.responsable.roles_responsable?.nombre}</p>
                </div>
                <div>
                    <p>Fecha Inicio</p>
                    <p className="font-bold text-lg">{formatDateYYYYMMDD(new Date(directorio.responsable.fecha_inicio))}</p>
                </div>
                <div>
                    <p>Fecha Fin</p>
                    <p className="font-bold text-lg">{formatDateYYYYMMDD(new Date(directorio.responsable.fecha_fin))}</p>
                </div>
            </div>
            <h3 className='mb-4'>Historial de Responsables:</h3>
            {historial.length == 0 ? <p>No hay historial</p> :
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
                        {historial.map(r =>
                            <Tr key={r.id}>
                                <Td>{r.responsable.nombre}</Td>
                                <Td>{r.responsable.apellido}</Td>
                                <Td>{r.responsable.dni}</Td>
                                <Td>{formatDateYYYYMMDD(new Date(r.responsable.fecha_inicio))}</Td>
                                <Td>{formatDateYYYYMMDD(new Date(r.responsable.fecha_fin))}</Td>
                                <Td>{noHaPasado(new Date(r.responsable.fecha_fin)) ? 'Activo' : 'Inactivo'}</Td>
                            </Tr>
                        )}
                    </TBody>
                </Table>
            }
        </>
    )
}

