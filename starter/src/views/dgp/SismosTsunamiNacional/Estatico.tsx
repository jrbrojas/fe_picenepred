import { Button, Card, Skeleton, Tabs } from "@/components/ui";
import AdaptiveCard from '@/components/shared/AdaptiveCard'
import Container from '@/components/shared/Container'
import usePlantilla from "../hooks/usePlantilla";
import { TbMapPin } from "react-icons/tb";
import { FaCarSide, FaFaucet, FaHome, FaUsers } from "react-icons/fa";
import { BiDownload, BiSolidSchool } from "react-icons/bi";
import { BsHospital } from "react-icons/bs";
import NumeroFormateado from "@/utils/numerFormat";
import TableInstrumentos from "../TableInstrumentos";
import ImageZoom from "../ImageZoom";

const { TabNav, TabList, TabContent } = Tabs

const nivelColorClasses: { [key: string]: string } = {
    'MUY ALTO': 'text-red-500 bg-red-500',
    'ALTO': 'text-orange-400 bg-orange-400',
    'MEDIO': 'text-yellow-500 bg-yellow-500',
    'BAJO': 'text-green-400 bg.green-400',
    'MUY BAJO': 'text-green-700 bg-green-700',
    '': 'text-gray-500 bg-gray-500',
}

const SismosTsunamiNacionalEstatico = () => {
    const { escenario, data, instrumentos, isLoading } = usePlantilla('9');
    const year = new Date().getFullYear();
    const tipoPeligro = Object.keys(data);

    const formatTabName = (name: string) => {
        return name.charAt(0).toUpperCase() + name.slice(1).replace(/_/g, ' ');
    }

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
                    </div>) : (

                    <Tabs defaultValue="sismos">
                        <TabList button={
                            <Button size="xs" variant="solid" icon={<BiDownload />}>
                                Descargar PPT
                            </Button>
                        }
                        >
                            {tipoPeligro.map(tipo => (
                                <TabNav key={tipo} value={tipo}>{formatTabName(tipo)}</TabNav>
                            ))}
                        </TabList>

                        {tipoPeligro.map((tipo, index) => (
                            <TabContent key={tipo} value={tipo}>
                                {data[tipo] && data[tipo].length > 0 ? (
                                    <div className='p-2'>
                                        <div className='grid grid-cols-1 lg:grid-cols-4 gap-4'>

                                            <div className="flex flex-col gap-4 justify-start items-center w-full">
                                                <div className='flex justify-center'>
                                                    <div className="bg-teal-600 text-white text-center font-semibold p-2 rounded">
                                                        RIESGO POR {(formatTabName(tipo)).toUpperCase()}
                                                    </div>
                                                </div>

                                                {escenario.mapas && escenario.mapas[index] && (
                                                    <ImageZoom src={escenario.mapas.filter(m => m.tipo === 'mapa_izquierdo')[index] ?
                                                        escenario.mapas.filter(m => m.tipo === 'mapa_izquierdo')[index].ruta : null} />
                                                )}


                                                <div className="flex flex-col items-center text-center gap-2 w-full">
                                                    <span className="text-xs flex-shrink-0">Fuente: CENEPRED (2025)</span>
                                                    <a
                                                        href={escenario.url_base}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        title={escenario.url_base}
                                                        className="block bg-teal-600 p-2 text-white rounded-md overflow-hidden whitespace-nowrap text-ellipsis"
                                                    >
                                                        Ver mayor detalles
                                                    </a>
                                                </div>
                                            </div>

                                            <div className='col-span-3 flex flex-col gap-2 justify-center items-center'>
                                                <div className='flex-1 flex flex-col items-center text-center'>
                                                    <h4 className="text-center font-semibold text-teal-600">
                                                        {escenario.nombre}
                                                    </h4>
                                                    <h4 className="text-center font-semibold text-green-600/70">
                                                        {escenario.subtitulo}
                                                    </h4>
                                                </div>

                                                <div className='flex justify-center items-center gap-4'>
                                                    <span className='text-sm font-bold'>ELEMENTOS EXPUESTOS A NIVEL NACIONAL</span>
                                                    {data[tipo].slice(0, 1).map((item, index) => (
                                                        <div key={`${tipo}-${index}-${item.nivel}`} className={`${nivelColorClasses[item.nivel.toUpperCase()]} text-white text-center text-sm font-semibold p-2 rounded`}>
                                                            {item.nivel.toUpperCase()}
                                                        </div>
                                                    ))}
                                                </div>

                                                <div className='w-full flex justify-center items-center'>
                                                    {escenario.mapas && escenario.mapas[1] && (
                                                        <ImageZoom src={escenario.mapas.filter(m => m.tipo === 'mapa_centro')[index] ?
                                                            escenario.mapas.filter(m => m.tipo === 'mapa_centro')[index].ruta : null} />
                                                    )}
                                                </div>

                                                {data[tipo].slice(0, 1).map((item, index) => (
                                                    <div key={`${tipo}-${index}-data`} className='flex flex-col gap-5 items-center'>
                                                        <div className="flex flex-col gap-3 justify-center items-center">

                                                            <div className="flex flex-wrap justify-center items-center gap-6 bg-gray-200/50 rounded-xl p-4 max-w-full overflow-hidden">
                                                                {/* Población */}
                                                                <div className="flex items-center gap-5">
                                                                    <FaUsers className="text-cyan-600" size={50} />
                                                                    <div className='flex-1 flex flex-col gap-1 font-semibold text-center text-teal-600'>
                                                                        <p className="text-lg font-bold">{NumeroFormateado(item.total_poblacion)}</p>
                                                                        <p className="text-md">Población</p>
                                                                    </div>
                                                                </div>
                                                                {/* Distritos */}
                                                                <div className="flex items-center gap-5">

                                                                    <TbMapPin className="text-cyan-600" size={50} />
                                                                    <div className='flex-1 flex flex-col gap-1 font-semibold text-center text-teal-600'>
                                                                        <p className="text-lg font-bold">{NumeroFormateado(item.total_distritos)}</p>
                                                                        <p className="text-md">Distritos</p>
                                                                    </div>
                                                                </div>
                                                                {/* Viviendas */}
                                                                <div className="flex items-center gap-5">
                                                                    <FaHome className="text-cyan-600" size={50} />
                                                                    <div className='flex-1 flex flex-col gap-1 font-semibold text-center text-teal-600'>
                                                                        <p className="text-lg font-bold">{NumeroFormateado(item.total_vivienda)}</p>
                                                                        <p className="text-md">Viviendas</p>
                                                                    </div>
                                                                </div>
                                                                {/* Inst. Educativas */}
                                                                <div className="flex items-center gap-5">
                                                                    <BiSolidSchool className="text-cyan-600" size={50} />
                                                                    <div className='flex-1 flex flex-col gap-1 font-semibold text-center text-teal-600'>
                                                                        <p className="text-lg font-bold">{NumeroFormateado(item.total_inst_educativa)}</p>
                                                                        <p className="text-md">Inst. Educativas</p>
                                                                    </div>
                                                                </div>
                                                                {/* Est. Salud */}
                                                                <div className="flex items-center gap-5">
                                                                    <BsHospital className="text-cyan-600" size={50} />
                                                                    <div className='flex-1 flex flex-col gap-1 font-semibold text-center text-teal-600'>
                                                                        <p className="text-lg font-bold">{NumeroFormateado(item.total_est_salud)}</p>
                                                                        <p className="text-md">Est. de Salud</p>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                        <div className="flex flex-col gap-3 justify-center items-center">

                                                            <div className="flex flex-wrap justify-center items-center gap-6 bg-gray-200/50 rounded-xl p-4 max-w-full overflow-hidden">
                                                                {/* Red viales */}
                                                                <div className="flex items-center gap-5">
                                                                    <FaCarSide className="text-cyan-600" size={50} />
                                                                    <div className='flex flex-col gap-2 items-start'>
                                                                        <div className='flex-1 flex gap-2 font-semibold items-center text-teal-600'>
                                                                            <p className="text-lg font-bold">{NumeroFormateado(item.total_red_vial_nacional)}</p>
                                                                            <p className="text-md">Red Vial Nacional</p>
                                                                        </div>
                                                                        <div className='flex-1 flex gap-2 font-semibold items-center text-teal-600'>
                                                                            <p className="text-lg font-bold">{NumeroFormateado(item.total_red_vial_departamental)}</p>
                                                                            <p className="text-md">Red Vial Departamental</p>
                                                                        </div>
                                                                        <div className='flex-1 flex gap-2 font-semibold items-center text-teal-600'>
                                                                            <p className="text-lg font-bold">{NumeroFormateado(item.total_red_vial_vecinal)}</p>
                                                                            <p className="text-md">Red Vial Vecinal</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {/* Distritos */}
                                                                <div className="flex items-center gap-5">
                                                                    <FaFaucet className="text-cyan-600" size={50} />
                                                                    <div className='flex-1 flex flex-col gap-1 font-semibold text-center text-teal-600'>
                                                                        <p className="text-lg font-bold">{NumeroFormateado(item.total_red_agua)}</p>
                                                                        <p className="text-md">Red de Agua Potable (Tuberias)</p>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                        <div className="w-full overflow-x-auto p-3">
                                                            <div className="min-w-[720px] sm:min-w-0">
                                                                <TableInstrumentos instrumentos={instrumentos} tipo={tipo} />
                                                            </div>
                                                        </div>

                                                    </div>


                                                ))}

                                            </div>

                                        </div>
                                    </div>
                                ) : (
                                    <NoDataMessage />
                                )}
                            </TabContent>
                        ))}

                    </Tabs>)}
            </AdaptiveCard>
        </Container>
    )
}

export default SismosTsunamiNacionalEstatico
