import { Button, Card, Skeleton, Tabs } from "@/components/ui";
import AdaptiveCard from '@/components/shared/AdaptiveCard'
import Container from '@/components/shared/Container'
import usePlantilla from "../hooks/usePlantilla";
import { TbMapPin } from "react-icons/tb";
import { FaHome, FaUsers } from "react-icons/fa";
import ImageLoad from "../ImageLoad";
import { BiDownload, BiSolidSchool } from "react-icons/bi";
import { BsHospital } from "react-icons/bs";

const nivelColorClasses: { [key: string]: string } = {
    'MA': 'text-red-500 bg-red-500',
    'A': 'text-orange-400 bg-orange-400',
    'M': 'text-yellow-500 bg-yellow-500',
    'B': 'text-green-400 bg.green-400',
    'MB': 'text-green-700 bg-green-700',
    '': 'text-gray-500 bg-gray-500',
}

const nivelNombre: { [key: string]: string } = {
    'MA': 'Muy Alto',
    'A': 'Alto',
    'M': 'Medio',
    'B': 'Bajo',
    'MB': 'Muy Bajo',
    '': '',
}

const BajasTempAvisoTrimestralEstatico = () => {
    const { escenario, data, isLoading } = usePlantilla('5');
    const year = new Date().getFullYear();
    const tipoPeligro = Object.keys(data);
    const mesInicio = new Date(escenario.fecha_inicio).toLocaleString('es-ES', { month: 'long' });
    const mesFin = new Date(escenario.fecha_fin).toLocaleString('es-ES', { month: 'long' });

    const NoDataMessage = () => (
        <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="bg-yellow-100 text-yellow-600 p-4 rounded-full mb-4">
                ⚠️
            </div>
            <h3 className="text-lg font-semibold text-gray-700">No hay información disponible</h3>
            <p className="text-gray-500 mt-2 max-w-sm">
                Aún no se han registrado datos para este escenario.
            </p>
        </div>
    );

    const CardSkeleton = () => (
        <Card>
            <Skeleton height={28} width="50%" className="mb-4" />
            <div className="space-y-3">
                <Skeleton height={60} className='rounded-xl' />
                <Skeleton height={60} className='rounded-xl' />
                <Skeleton height={60} className='rounded-xl' />
            </div>
        </Card>
    )


    if (!isLoading && tipoPeligro.length == 0) {
        return <NoDataMessage />;
    }

    return (
        <Container>
            <AdaptiveCard>

                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Array.from({ length: 3 }).map((_, index) => <CardSkeleton key={index} />)}
                    </div>) :
                    (
                        <div className='p-2'>
                            <div className="flex items-center justify-end pb-5">
                                <Button variant="solid" icon={<BiDownload />}>
                                    Descargar PPT
                                </Button>
                            </div>

                            <div className='flex justify-between gap-4 items-center mb-3'>
                                <div className='flex-1 flex flex-col items-center text-center'>
                                    <h2 className="text-4xl text-center font-semibold text-teal-600">
                                        Escenario de Riesgo
                                    </h2>
                                    <p className='text-blue-400 text-lg'>{escenario.nombre}</p>
                                    <p className='text-teal-600 text-lg'>{escenario.titulo_base}</p>
                                </div>
                                <h2 className="text-2xl p-2 font-medium text-white bg-teal-600 rounded-full">
                                    <p className='mr-5 ml-5'>AVISO TRIMESTRAL</p>
                                </h2>

                            </div>

                            <div className='grid grid-cols-1 lg:grid-cols-5 gap-6'>

                                <div className='flex flex-col items-center justify-center gap-2'>
                                    <div className='w-full flex justify-center'>
                                        {escenario.mapas && escenario.mapas[0] && (
                                            <ImageLoad path={escenario.mapas.filter(m => m.tipo === 'mapa_izquierdo_superior')[0].ruta} />
                                        )}

                                    </div>
                                    <div className='w-full flex justify-center'>
                                        {escenario.mapas && escenario.mapas[0] && (
                                            <ImageLoad path={escenario.mapas.filter(m => m.tipo === 'mapa_izquierdo_inferior')[0].ruta} />
                                        )}
                                    </div>
                                </div>

                                <div className='col-span-2 flex items-center justify-center'>
                                    {escenario.mapas && escenario.mapas[0] && (
                                        <ImageLoad path={escenario.mapas.filter(m => m.tipo === 'mapa_centro')[0].ruta} />
                                    )}
                                </div>

                                <div className='col-span-2'>
                                    <h2 className='text-4xl font-semibold text-teal-600'>{mesInicio.toUpperCase()} - {mesFin.toUpperCase()}</h2>
                                    <div className='flex items-center gap-8 pb-5'>
                                        <h1 className='text-6xl font-semibold text-teal-600'>{year}</h1>
                                    </div>
                                    {data['inundaciones'].slice(0, 1).map((item, index) => (
                                        <div key={index} className="grid grid-cols-2 border rounded-xl border-teal-600 shadow-md bg-white">
                                            <div className="p-2 space-y-4">
                                                {/* Población */}
                                                <div className="flex items-center gap-3">
                                                    <FaUsers className="text-cyan-600" size={50} />
                                                    <div className='flex-1 flex flex-col gap-1 font-semibold text-center text-teal-600'>
                                                        <p className="text-xl font-bold">{item.total_poblacion}</p>
                                                        <p className="text-md">Población</p>
                                                    </div>
                                                </div>
                                                {/* Centros poblados */}
                                                <div className="flex items-center gap-3">
                                                    <TbMapPin className="text-cyan-600" size={50} />
                                                    <div className='flex-1 flex flex-col gap-1 font-semibold text-center text-teal-600'>
                                                        <p className="text-xl font-bold">{item.total_centro_poblado}</p>
                                                        <p className="text-md">Centros Poblados</p>
                                                    </div>
                                                </div>
                                                {/* Viviendas */}
                                                <div className="flex items-center gap-3">
                                                    <FaHome className="text-cyan-600" size={50} />
                                                    <div className='flex-1 flex flex-col gap-1 font-semibold text-center text-teal-600'>
                                                        <p className="text-xl font-bold">{item.total_vivienda}</p>
                                                        <p className="text-md">Viviendas</p>
                                                    </div>
                                                </div>
                                                {/* Instituciones Educativas */}
                                                <div className="flex items-center gap-3">
                                                    <BiSolidSchool className="text-cyan-600" size={50} />
                                                    <div className='flex-1 flex flex-col gap-1 font-semibold text-center text-teal-600'>
                                                        <p className="text-xl font-bold">{item.total_inst_educativa}</p>
                                                        <p className="text-md">Inst. Educativas</p>
                                                    </div>
                                                </div>
                                                {/* Establecimientos de Salud */}
                                                <div className="flex items-center gap-3">
                                                    <BsHospital className="text-cyan-600" size={50} />
                                                    <div className='flex-1 flex flex-col gap-1 font-semibold text-center text-teal-600'>
                                                        <p className="text-xl font-bold">{item.total_est_salud}</p>
                                                        <p className="text-md">Est. de Salud</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="border-l border-teal-600 p-2 flex flex-col">
                                                {/* Nivel de riesgo */}
                                                <div className={`${nivelColorClasses[item.nivel.toUpperCase()]} text-white text-center font-semibold py-1 rounded mt-10`}>
                                                    {nivelNombre[item.nivel]}
                                                </div>
                                                <div className="mt-3 text-sm text-teal-600 font-semibold">
                                                    Departamento población expuesta:
                                                    {item.departamentos_poblacion && item.departamentos_poblacion?.map((depa, index) => (
                                                        <p key={index} className='flex justify-between items-center'>
                                                            <span className="font-bold">{depa.departamento}</span> {depa.total_poblacion}
                                                        </p>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    <div className='flex flex-col items-center gap-2 pt-5'>
                                        <span className='font-bold'>Fuente: CENEPRED (2025)</span>
                                        <a className='bg-teal-600 p-2 text-white rounded-md' href={escenario.url_base} target='_blank'>
                                            {escenario.url_base}
                                        </a>
                                    </div>
                                </div>
                            </div>

                        </div>
                    )}
            </AdaptiveCard>
        </Container>

    )
}

export default BajasTempAvisoTrimestralEstatico
