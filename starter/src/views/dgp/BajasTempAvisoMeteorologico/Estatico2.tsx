import { Button, Card, Skeleton, Tabs } from "@/components/ui";
import AdaptiveCard from '@/components/shared/AdaptiveCard'
import Container from '@/components/shared/Container'
import usePlantilla from "../hooks/usePlantilla";
import { TbMapPin } from "react-icons/tb";
import { FaHome, FaUsers } from "react-icons/fa";
import ImageLoad from "../ImageLoad";
import { BiDownload } from "react-icons/bi";
import NumeroFormateado from "../../../utils/numerFormat";
import TableInstrumentos from "../TableInstrumentos";


const nivelColorClasses: { [key: string]: string } = {
    'MUY ALTO': 'text-red-500 bg-red-500',
    'ALTO': 'text-orange-400 bg-orange-400',
    'MEDIO': 'text-yellow-500 bg-yellow-500',
    'BAJO': 'text-green-400 bg.green-400',
    'MUY BAJO': 'text-green-700 bg-green-700',
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

const formatNombreArray = (pgArray: string) => {
    if (!pgArray) return "";

    // quitar llaves { }
    let clean = pgArray.replace(/[{}]/g, "");

    // separar por comas
    let items = clean.split(",").filter((v) => v && v !== "NULL");

    return (
        <div>
            {items.map((item, index) => (
                <div key={index}>• {item.trim()}</div>
            ))}
        </div>
    );
};

const BajasTempAvisoMeteorologicoEstatico2 = () => {
    const { escenario, data, instrumentos, isLoading } = usePlantilla('4');
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
                                    Descargar PPT
                                </Button>
                            </div>

                            <div className='flex justify-between gap-4 items-center mb-3'>
                                <span className="text-lg p-2 font-medium text-white bg-teal-600 rounded-lg">
                                    Aviso N° {escenario.aviso}
                                </span>
                                <h2 className="text-center font-semibold text-teal-600 ml-8">Escenario de Riesgos por exposición</h2>

                                <span className='text-lg p-2 font-medium text-white bg-teal-600 rounded-full'>CORTO PLAZO</span>
                            </div>

                            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 items-start'>
                                <div className='flex flex-col flex-1 gap-3'>

                                    <div className='flex flex-col gap-1 justify-center items-center'>

                                        <div className='flex items-center justify-between w-full'>
                                            <div className='flex-1'></div>

                                            <div className="bg-blue-600/60 text-white text-lg font-medium rounded-lg px-4 py-1 text-center">
                                                <p>Pronóstico de Bajas Temperaturas {year}</p>
                                            </div>

                                            <div className='flex-1 flex justify-end'>
                                                <div className='bg-yellow-950/80 bg-opacity-70 rounded-lg text-lg font-semibold text-white px-4 py-1'>
                                                    <span>{escenario.nombre}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='text-teal-600 flex flex-col gap-1 items-center'>
                                            <p className='text-lg font-semibold'>{escenario.subtitulo}</p>
                                            <p>
                                                del {new Date(escenario.fecha_inicio).getDate()} al
                                                {new Date(escenario.fecha_fin).getDate()} de {new Date(escenario.fecha_fin).toLocaleDateString("es-ES", { month: "long" })}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 w-full border rounded-xl border-teal-600 shadow-md bg-white justify-items-stretch items-stretch">

                                        {data['inundaciones'].slice(0, 1).map((item, index) => (
                                            <div key={`data-inundaciones-${index}`} className="p-3 h-full flex flex-col justify-between text-left"> {/* h-full */}
                                                <div className="flex flex-col gap-2">
                                                    <div className={`${nivelColorClasses[nivelNombre[item.nivel].toUpperCase()]} text-white text-center font-semibold py-1 rounded`}>
                                                        {nivelNombre[item.nivel]}
                                                    </div>
                                                    <div className="text-sm text-teal-600">
                                                        Departamentos:
                                                        <span className={`${nivelColorClasses[nivelNombre[item.nivel].toUpperCase()]} bg-white font-semibold`}>
                                                            {item.departamentos && formatNombreArray(item.departamentos)}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="flex flex-col text-teal-600">
                                                    <span className='text-xs mb-4'>Departamentos con poblaion expuesta:</span>
                                                    {item.departamentos_poblacion?.map((depa, i) => (
                                                        <div key={i} className="flex justify-between items-center">
                                                            <span className="text-xs">{depa.departamento}</span>
                                                            <span className='text-xs'>{NumeroFormateado(depa.total_poblacion)}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}

                                        <div className="p-2 col-span-2">
                                            <div className="grid grid-cols-[1fr_auto_1fr] justify-items-center items-center gap-6 w-full text-teal-600 font-semibold">

                                                {/* Datos del bloque izquierdo */}
                                                {data['inundaciones'].slice(0, 1).map((item, index) => (
                                                    <div key={`izq-${index}`} className="grid gap-3 justify-items-center text-center">
                                                        <div>
                                                            <p className="text-xl font-bold">{NumeroFormateado(item.total_distritos)}</p>
                                                            <p>Distritos</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-xl font-bold">{NumeroFormateado(item.total_poblacion)}</p>
                                                            <p>Población</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-xl font-bold">{NumeroFormateado(item.total_vivienda)}</p>
                                                            <p>Viviendas</p>
                                                        </div>
                                                    </div>
                                                ))}

                                                {/* Iconos centrales */}
                                                <div className="grid gap-3 justify-items-center text-cyan-600">
                                                    <TbMapPin size={50} />
                                                    <FaUsers size={50} />
                                                    <FaHome size={50} />
                                                </div>

                                                {/* Datos del bloque derecho */}
                                                {data['inundaciones'].slice(1, 2).map((item, index) => (
                                                    <div key={`der-${index}`} className="grid gap-3 justify-items-center text-center">
                                                        <div>
                                                            <p className="text-xl font-bold">{NumeroFormateado(item.total_distritos)}</p>
                                                            <p>Distritos</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-xl font-bold">{NumeroFormateado(item.total_poblacion)}</p>
                                                            <p>Población</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-xl font-bold">{NumeroFormateado(item.total_vivienda)}</p>
                                                            <p>Viviendas</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {data['inundaciones'].slice(1, 2).map((item, index) => (
                                            <div key={`data-inundaciones-${index}`} className="p-3 h-full flex flex-col justify-between text-left"> {/* h-full */}
                                                <div className="flex flex-col gap-2">
                                                    <div className={`${nivelColorClasses[nivelNombre[item.nivel].toUpperCase()]} text-white text-center font-semibold py-1 rounded`}>
                                                        {nivelNombre[item.nivel]}
                                                    </div>
                                                    <div className="text-sm text-teal-600">
                                                        Departamentos:
                                                        <span className={`${nivelColorClasses[nivelNombre[item.nivel].toUpperCase()]} bg-white font-semibold`}>
                                                            {item.departamentos && formatNombreArray(item.departamentos)}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="flex flex-col text-teal-600 mt-4">
                                                    <span className='text-xs mb-4'>Departamentos con poblaion expuesta:</span>
                                                    {item.departamentos_poblacion?.map((depa, i) => (
                                                        <div key={i} className="flex justify-between items-center">
                                                            <span className="text-xs">{depa.departamento}</span>
                                                            <span className='text-xs'>{NumeroFormateado(depa.total_poblacion)}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="w-full overflow-x-auto">
                                        <div className="min-w-[720px] sm:min-w-0">
                                            <TableInstrumentos instrumentos={instrumentos} tipo={'inundaciones'} />
                                        </div>
                                    </div>

                                    <div className='flex items-center gap-2'>
                                        <span className='text-xs'>Fuente: CENEPRED (2025)</span>
                                        <a className='bg-teal-600 p-2 text-white rounded-md' href={escenario.url_base} target='_blank'>
                                            {escenario.url_base}
                                        </a>
                                    </div>

                                </div>

                                <div className='flex items-center  justify-center w-full'>
                                    {escenario.mapas && escenario.mapas[0] && (
                                        <ImageLoad path={escenario.mapas[0] ?
                                            escenario.mapas[0].ruta : null} />
                                    )}
                                </div>

                            </div>

                        </div>
                    )}
            </AdaptiveCard>
        </Container>

    )
}

export default BajasTempAvisoMeteorologicoEstatico2
