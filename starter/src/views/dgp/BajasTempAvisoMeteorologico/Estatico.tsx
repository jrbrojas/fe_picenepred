import { Card, Skeleton, Tabs } from "@/components/ui";
import AdaptiveCard from '@/components/shared/AdaptiveCard'
import Container from '@/components/shared/Container'
import usePlantilla from "../hooks/usePlantilla";
import { TbMapPin } from "react-icons/tb";
import { FaHome, FaUsers } from "react-icons/fa";
import ImageLoad from "../ImageLoad";


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

const formatArray = (pgArray: string) => {
    if (!pgArray) return "";

    // quitar llaves { }
    let clean = pgArray.replace(/[{}]/g, "");

    // separar por comas
    let items = clean.split(",").filter((v) => v && v !== "NULL");

    // casos según cantidad
    if (items.length === 0) return "";
    if (items.length === 1) return items[0];
    if (items.length === 2) return items.join(" y ");
    return items.slice(0, -1).join(", ") + " y " + items[items.length - 1];
};

const LluviasAvisoMeteorologicoEstatico = () => {
    const { escenario, data, isLoading } = usePlantilla('4');
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
                        <div className='p-4'>
                            <div className='flex justify-between items-center mb-3'>
                                <div className="text-2xl p-2 font-medium text-white bg-teal-600 rounded-lg">
                                    <p className='mr-3'>Aviso N° {escenario.aviso}</p>
                                </div>
                                <h2 className="text-2xl p-2 font-medium text-white bg-teal-600 rounded-full">
                                    <p className='mr-5 ml-5'>CORTO PLAZO</p>
                                </h2>
                            </div>

                            <div className='flex justify-between items-center mb-8'>
                                <h1 className="text-5xl font-semibold text-teal-600 ml-8">Escenario de Riesgo</h1>
                                <div className="text-2xl p-2 font-semibold text-white bg-yellow-950/80 rounded-xl mr-10">
                                    <p className='ml-3 mr-3'>{escenario.nombre}</p>
                                </div>
                            </div>

                            <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
                                <div className='col-span-2'>
                                    <div className='flex flex-col gap-3 justify-center items-center mb-3'>
                                        <div className="bg-blue-600/60 text-white text-2xl p-2 font-medium rounded-lg">
                                            <p className='mr-15 ml-15'>Pronostico de Bajas temperaturas {year}</p>
                                        </div>
                                        <div className="w-0 h-0 border-l-38 border-r-38 border-t-18 border-l-transparent border-r-transparent border-t-blue-600/60"></div>
                                        <div className='flex-1 flex flex-col text-center text-teal-600'>
                                            <p className='text-3xl font-semibold'>{escenario.subtitulo}</p>
                                            <p className='text-2xl'>
                                                {new Date(escenario.fecha_inicio).getDate()} al {new Date(escenario.fecha_fin).getDate()}
                                                de {new Date(escenario.fecha_fin).toLocaleDateString("es-ES", { month: "long" })}
                                            </p>
                                        </div>
                                    </div>

                                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-3'>
                                        {data['inundaciones'].slice(0, 2).map((item, index) => (
                                            <div key={index} className="grid grid-cols-2 border rounded-xl border-teal-600 shadow-md bg-white">
                                                <div className="p-2 space-y-4 flex flex-col justify-center">
                                                    {/* Distritos */}
                                                    <div className="flex items-center gap-3">
                                                        <TbMapPin className="text-cyan-600" size={50} />
                                                        <div className='flex-1 flex flex-col font-semibold text-center text-teal-600'>
                                                            <p className="text-xl font-bold">{item.total_distritos}</p>
                                                            <p className="text-md">Distritos</p>
                                                        </div>
                                                    </div>
                                                    {/* Población */}
                                                    <div className="flex items-center gap-3">
                                                        <FaUsers className="text-cyan-600" size={50} />
                                                        <div className='flex-1 flex flex-col font-semibold text-center text-teal-600'>
                                                            <p className="text-xl font-bold">{item.total_poblacion}</p>
                                                            <p className="text-md">Población</p>
                                                        </div>
                                                    </div>
                                                    {/* Viviendas */}
                                                    <div className="flex items-center gap-3">
                                                        <FaHome className="text-cyan-600" size={50} />
                                                        <div className='flex-1 flex flex-col font-semibold text-center text-teal-600'>
                                                            <p className="text-xl font-bold">{item.total_vivienda}</p>
                                                            <p className="text-md">Viviendas</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="border-l border-teal-600 p-2 flex flex-col justify-between">
                                                    {/* Nivel de riesgo */}
                                                    <div className='p-4'>
                                                        <div className={`${nivelColorClasses[nivelNombre[item.nivel].toUpperCase()]} text-white text-center font-semibold py-1 rounded`}>
                                                            {nivelNombre[item.nivel]}
                                                        </div>
                                                        <p className="text-sm text-teal-600 mt-2">
                                                            Departamentos en nivel:{" "}
                                                            <span className={`${nivelColorClasses[nivelNombre[item.nivel].toUpperCase()]} bg-white font-semibold`}>
                                                                {item.departamentos && formatArray(item.departamentos)}
                                                            </span>
                                                        </p>
                                                    </div>

                                                    {/* Departamentos con mayor población */}
                                                    <div className="mt-4 text-sm text-teal-600 font-semibold">
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

                                    <div className='flex justify-center mt-5'>
                                        <a className='bg-teal-600 p-2 text-white rounded-md' href={escenario.url_base} target='_blank'>
                                            {escenario.url_base}
                                        </a>
                                    </div>
                                </div>

                                <div className='w-full flex justify-center'>
                                    <ImageLoad path={escenario.mapas[0].ruta} />
                                </div>
                            </div>
                        </div>
                    )}
            </AdaptiveCard>
        </Container>

    )
}

export default LluviasAvisoMeteorologicoEstatico
