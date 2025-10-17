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
    'MUY ALTO': 'text-red-500 bg-red-500',
    'ALTO': 'text-orange-400 bg-orange-400',
    'MEDIO': 'text-yellow-500 bg-yellow-500',
    'BAJO': 'text-green-400 bg.green-400',
    'MUY BAJO': 'text-green-700 bg-green-700',
    '': 'text-gray-500 bg-gray-500',
}

const BajasTempInformacionClimaticaEstatico = () => {
    const { escenario, data, isLoading } = usePlantilla('6');
    const year = new Date().getFullYear();
    const tipoPeligro = Object.keys(data);

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
                                    Descargar PDF
                                </Button>
                            </div>

                            <div className='flex justify-between gap-4 items-center mb-3'>
                                <div className='flex-1 flex flex-col items-center text-center'>
                                    <h2 className="text-2xl text-center font-semibold text-teal-600">
                                        {escenario.nombre}
                                    </h2>
                                </div>
                                <h2 className="text-2xl p-2 font-medium text-white bg-teal-600 rounded-full">
                                    <p className='mr-5 ml-5'>HELADAS</p>
                                </h2>

                            </div>

                            <div className='grid grid-cols-1 lg:grid-cols-4 gap-4'>

                                <div className='w-full flex justify-start'>
                                    <div className='flex flex-col gap-4'>
                                        {escenario.mapas && escenario.mapas[0] && (
                                            <ImageLoad path={escenario.mapas.filter(m => m.tipo === 'mapa_izquierdo')[0].ruta} />
                                        )}

                                        <div className='flex flex-col items-center gap-2'>
                                            <span className='font-bold'>Fuente: CENEPRED (2025)</span>
                                            <a className='bg-teal-600 p-2 text-white rounded-md' href={escenario.url_base} target='_blank'>
                                                {escenario.url_base}
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <div className='col-span-2'>
                                    <div className='w-full flex justify-center'>
                                        {escenario.mapas && escenario.mapas[0] && (
                                            <ImageLoad path={escenario.mapas.filter(m => m.tipo === 'mapa_centro')[0].ruta} />
                                        )}
                                    </div>

                                </div>

                                {data['inundaciones'].slice(0, 1).map((item, index) => (
                                    <div key={index} className="flex flex-col gap-1 justify-center items-center">
                                        <div className="bg-gray-200/50 rounded-4xl p-12 space-y-5">
                                            {/* Distritos */}
                                            <div className="flex items-center gap-8">
                                                <TbMapPin className="text-cyan-600" size={50} />
                                                <div className='flex-1 flex flex-col gap-1 font-semibold text-center text-teal-600'>
                                                    <p className="text-xl font-bold">{item.total_distritos}</p>
                                                    <p className="text-md">Distritos</p>
                                                </div>
                                            </div>
                                            {/* Población */}
                                            <div className="flex items-center gap-8">
                                                <FaUsers className="text-cyan-600" size={50} />
                                                <div className='flex-1 flex flex-col gap-1 font-semibold text-center text-teal-600'>
                                                    <p className="text-xl font-bold">{item.total_poblacion}</p>
                                                    <p className="text-md">Población</p>
                                                </div>
                                            </div>
                                            {/* Viviendas */}
                                            <div className="flex items-center gap-8">
                                                <FaHome className="text-cyan-600" size={50} />
                                                <div className='flex-1 flex flex-col gap-1 font-semibold text-center text-teal-600'>
                                                    <p className="text-xl font-bold">{item.total_vivienda}</p>
                                                    <p className="text-md">Viviendas</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col p-8">
                                            {/* Nivel de riesgo */}
                                            <div className={`${nivelColorClasses[item.nivel.toUpperCase()]} text-white text-center font-semibold py-1 rounded mt-10`}>
                                                {item.nivel}
                                            </div>
                                            <div className="mt-3 text-sm text-teal-600 font-semibold">
                                                Departamentos con mayor población expuesta:
                                                {item.departamentos_poblacion && item.departamentos_poblacion?.map((depa, index) => (
                                                    <p key={index} className='flex justify-between items-center'>
                                                        <span className="font-bold">{depa.departamento}</span> {depa.total_poblacion}
                                                    </p>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>
                    )}
            </AdaptiveCard>
        </Container>

    )
}

export default BajasTempInformacionClimaticaEstatico
