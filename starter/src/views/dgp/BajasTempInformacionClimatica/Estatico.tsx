import { Button, Card, Skeleton, Tabs } from "@/components/ui";
import AdaptiveCard from '@/components/shared/AdaptiveCard'
import Container from '@/components/shared/Container'
import usePlantilla from "../hooks/usePlantilla";
import { TbMapPin } from "react-icons/tb";
import { FaHome, FaUsers } from "react-icons/fa";
import ImageLoad from "../ImageLoad";
import { BiDownload, BiSolidSchool } from "react-icons/bi";
import { BsHospital } from "react-icons/bs";
import NumeroFormateado from "@/utils/numerFormat";
import TableInstrumentos from "../TableInstrumentos";

const nivelColorClasses: { [key: string]: string } = {
    'MUY ALTO': 'text-red-500 bg-red-500',
    'ALTO': 'text-orange-400 bg-orange-400',
    'MEDIO': 'text-yellow-500 bg-yellow-500',
    'BAJO': 'text-green-400 bg.green-400',
    'MUY BAJO': 'text-green-700 bg-green-700',
    '': 'text-gray-500 bg-gray-500',
}

const BajasTempInformacionClimaticaEstatico = () => {
    const { escenario, data, instrumentos, isLoading } = usePlantilla('6');
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
                            <div className='grid grid-cols-1 lg:grid-cols-4 gap-4'>

                                <div className='flex flex-col gap-4 w-full'>
                                    {escenario.mapas && escenario.mapas[0] && (
                                        <ImageLoad path={escenario.mapas.filter(m => m.tipo === 'mapa_izquierdo')[0] ?
                                            escenario.mapas.filter(m => m.tipo === 'mapa_izquierdo')[0].ruta : null} />
                                    )}
                                    <div className="flex flex-col items-center text-center gap-2 w-full">
                                        <span className="text-xs">Fuente: CENEPRED (2025)</span>
                                        <a
                                            className="bg-teal-600 px-3 py-2 text-white rounded-md hover:bg-teal-700 transition break-words whitespace-normal w-full max-w-full text-xs"
                                            href={escenario.url_base}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {escenario.url_base}
                                        </a>
                                    </div>
                                </div>

                                <div className='col-span-2 flex-col items-center justify-center'>
                                    <div className='flex-1 flex-col items-center text-center'>
                                        <h5 className="text-sm text-center font-semibold text-teal-600">{escenario.nombre}</h5>
                                        <h5 className="text-sm text-center font-semibold text-green-600/60">{escenario.subtitulo}</h5>
                                    </div>

                                    <div className='w-full flex justify-center mb-4'>
                                        {escenario.mapas && escenario.mapas[0] && (
                                            <ImageLoad path={escenario.mapas.filter(m => m.tipo === 'mapa_centro')[0] ?
                                                escenario.mapas.filter(m => m.tipo === 'mapa_centro')[0].ruta : null} />
                                        )}
                                    </div>

                                    <div className="w-full overflow-x-auto">
                                        <div className="min-w-[720px] sm:min-w-0">
                                            <TableInstrumentos instrumentos={instrumentos} tipo={'inundaciones'} />
                                        </div>
                                    </div>
                                </div>

                                {data['inundaciones'].slice(0, 1).map((item, index) => (
                                    <div key={index} className="flex flex-col gap-3 justify-start items-center">

                                        <div className="p-2 bg-teal-600 rounded-full">
                                            <h4 className='text-sm font-medium text-white mr-4 ml-4'>HELADAS</h4>
                                        </div>

                                        <div className="bg-gray-200/50 rounded-4xl p-12 space-y-5">
                                            {/* Distritos */}
                                            <div className="flex items-center gap-8">
                                                <TbMapPin className="text-cyan-600" size={50} />
                                                <div className='flex-1 flex flex-col gap-1 font-semibold text-center text-teal-600'>
                                                    <p className="text-xl font-bold">{NumeroFormateado(item.total_distritos)}</p>
                                                    <p className="text-md">Distritos</p>
                                                </div>
                                            </div>
                                            {/* Población */}
                                            <div className="flex items-center gap-8">
                                                <FaUsers className="text-cyan-600" size={50} />
                                                <div className='flex-1 flex flex-col gap-1 font-semibold text-center text-teal-600'>
                                                    <p className="text-xl font-bold">{NumeroFormateado(item.total_poblacion)}</p>
                                                    <p className="text-md">Población</p>
                                                </div>
                                            </div>
                                            {/* Viviendas */}
                                            <div className="flex items-center gap-8">
                                                <FaHome className="text-cyan-600" size={50} />
                                                <div className='flex-1 flex flex-col gap-1 font-semibold text-center text-teal-600'>
                                                    <p className="text-xl font-bold">{NumeroFormateado(item.total_vivienda)}</p>
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
                                                Departamentos con población expuesta:
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
