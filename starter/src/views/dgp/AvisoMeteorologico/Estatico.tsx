import { Button, Card, Skeleton, Tabs } from "@/components/ui";
import AdaptiveCard from '@/components/shared/AdaptiveCard'
import Container from '@/components/shared/Container'
import usePlantilla from "../hooks/usePlantilla";
import { TbMapPin } from "react-icons/tb";
import { FaHome, FaUsers } from "react-icons/fa";
import { BiDownload, BiSolidSchool } from 'react-icons/bi'
import { BsHospital } from "react-icons/bs";
import ImageLoad from "../ImageLoad";
import NumeroFormateado from "../../../utils/numerFormat";

const { TabNav, TabList, TabContent } = Tabs

const nivelColorClasses: { [key: string]: string } = {
    'MUY ALTO': 'text-red-500 bg-red-500',
    'ALTO': 'text-orange-400 bg-orange-400',
    'MEDIO': 'text-yellow-500 bg-yellow-500',
    'BAJO': 'text-green-400 bg.green-400',
    'MUY BAJO': 'text-green-700 bg-green-700',
    '': 'text-gray-500 bg-gray-500',
}

const formatNombreArray = (pgArray: string) => {
    if (!pgArray) return "";

    // quitar llaves { }
    let clean = pgArray.replace(/[{}]/g, "");

    // separar por comas
    let items = clean.split(",").filter((v) => v && v !== "NULL");

    // Retornar como lista con viñetas
    return (
        <div>
            {items.map((item, index) => (
                <div key={index}>• {item.trim()}</div>
            ))}
        </div>
    );

    // casos según cantidad
    if (items.length === 0) return "";
    if (items.length === 1) return items[0];
    if (items.length === 2) return items.join(" y ");
    return items.slice(0, -1).join(", ") + " y " + items[items.length - 1];
};

const LluviasAvisoMeteorologicoEstatico = () => {
    const { escenario, data, isLoading } = usePlantilla('1');
    const year = new Date().getFullYear();
    const tipoPeligro = Object.keys(data);
    const tituloPeligo: { [key: string]: string } = {
        'inundaciones': 'Inundación',
        'movimiento_masa': 'Movimiento en masa',
    }

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

                    <Tabs defaultValue="inundaciones">
                        <TabList button={
                            <Button variant="solid" icon={<BiDownload />}>
                                Descargar PPT
                            </Button>
                        }
                        >
                            {tipoPeligro.map(tipo => (
                                <TabNav key={tipo} value={tipo}>{formatTabName(tipo)}</TabNav>
                            ))}
                        </TabList>

                        {tipoPeligro.map((tipo, index) => (
                            <TabContent key={tipo} value={tipo} >
                                {data[tipo] && data[tipo].length > 0 ? (
                                    <div className='p-3'>

                                        <div className='flex justify-between gap-4 items-center mb-3'>
                                            <div className="text-2xl p-2 font-medium text-white bg-teal-600 rounded-lg">
                                                <p className='mr-3'>Aviso N° {escenario.aviso}</p>
                                            </div>
                                            <div className="flex flex-col gap-2 justify-center items-center">
                                                <p className='mr-5 ml-5 text-2xl p-2 font-medium text-white bg-teal-600 rounded-full'>CORTO PLAZO</p>
                                                <div className="text-2xl p-2 font-semibold text-white bg-green-600 bg-opacity-70 rounded-xl mr-10">
                                                    <p className='ml-3 mr-3'>{escenario.nombre}</p>
                                                </div>

                                            </div>
                                        </div>

                                        <div className='flex justify-between items-center mb-10'>
                                        </div>


                                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 jsutify-start items-start'>
                                            <div className='flex flex-col gap-4 items-center'>

                                                <h1 className="text-6xl text-center font-semibold text-teal-600 ml-8">Escenario de Riesgos por exposición</h1>
                                                <div className='flex flex-col gap-3 justify-center items-center mb-3'>
                                                    <div className="bg-green-600 bg-opacity-70 text-white text-2xl font-medium rounded-lg">
                                                        <p className='mr-15 ml-15'>Pronóstico de Lluvia {year}</p>
                                                    </div>
                                                    <div className="w-0 h-0 border-l-38 border-r-38 border-t-18 border-l-transparent border-r-transparent border-t-green-600 bg-opacity-70"></div>
                                                    <div className='text-teal-600'>
                                                        <p className='text-3xl font-semibold'>{tituloPeligo[tipo]}</p>
                                                        <p className='text-lg ml-4'>
                                                            del {new Date(escenario.fecha_inicio).getDate()} al {new Date(escenario.fecha_fin).getDate()} de {new Date(escenario.fecha_fin).toLocaleDateString("es-ES", { month: "long" })}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 lg:grid-cols-4 border rounded-xl border-teal-600 shadow-md bg-white items-start justify-estart">
                                                    {data[tipo].slice(0, 1).map((item, index) => (
                                                        <div key={`data-${tipo}-${index}`} className="p-2 flex flex-col justify-between">
                                                            <div className='flex flex-col gap-2'>
                                                                <div className={`${nivelColorClasses[item.nivel.toUpperCase()]} text-white text-center font-semibold py-1 rounded`}>
                                                                    {item.nivel}
                                                                </div>
                                                                <div className="text-sm text-teal-600">
                                                                    Departamentos:
                                                                    <span className={`${nivelColorClasses[item.nivel.toUpperCase()]} bg-white font-semibold`}>
                                                                        {item.departamentos && formatNombreArray(item.departamentos)}
                                                                    </span>
                                                                </div>
                                                            </div>

                                                            <div className="mt-4 text-sm text-teal-600 font-semibold">
                                                                Departamentos con población expuesta:
                                                                {item.departamentos_poblacion && item.departamentos_poblacion?.map((depa, index) => (
                                                                    <div key={index} className='flex justify-between items-center'>
                                                                        <span className="font-bold">{depa.departamento}</span> {depa.total_poblacion}
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    ))}
                                                    <div className="p-2 col-span-2 flex items-center justify-center gap-2">
                                                        {/* data */}
                                                        {data[tipo].slice(0, 1).map((item, index) => (
                                                            <div key={`${tipo}-${index}`} className='flex flex-col items-center gap-2'>
                                                                <div className='flex-1 flex flex-col gap-1 font-semibold text-center text-teal-600'>
                                                                    <p className="text-xl font-bold">{tipo == 'inundaciones' ?
                                                                        NumeroFormateado(item.total_centro_poblado) : NumeroFormateado(item.total_distritos)}
                                                                    </p>
                                                                    <p className="text-md">{tipo == 'inundaciones' ? 'Centros Poblados' : 'Distritos'}</p>
                                                                </div>
                                                                <div className='flex-1 flex flex-col gap-1 font-semibold text-center text-teal-600'>
                                                                    <p className="text-xl font-bold">{NumeroFormateado(item.total_poblacion)}</p>
                                                                    <p className="text-md">Población</p>
                                                                </div>
                                                                <div className='flex-1 flex flex-col gap-1 font-semibold text-center text-teal-600'>
                                                                    <p className="text-xl font-bold">{NumeroFormateado(item.total_vivienda)}</p>
                                                                    <p className="text-md">Viviendas</p>
                                                                </div>
                                                                <div className='flex-1 flex flex-col gap-1 font-semibold text-center text-teal-600'>
                                                                    <p className="text-xl font-bold">{NumeroFormateado(item.total_inst_educativa)}</p>
                                                                    <p className="text-md">Inst. Educativas</p>
                                                                </div>
                                                                <div className='flex-1 flex flex-col gap-1 font-semibold text-center text-teal-600'>
                                                                    <p className="text-xl font-bold">{NumeroFormateado(item.total_est_salud)}</p>
                                                                    <p className="text-md">Est. de Salud</p>
                                                                </div>

                                                            </div>
                                                        ))}

                                                        {/* iconos */}
                                                        <div className='flex flex-col items-center gap-2'>
                                                            <TbMapPin className="text-cyan-600" size={50} />
                                                            <FaUsers className="text-cyan-600" size={50} />
                                                            <FaHome className="text-cyan-600" size={50} />
                                                            <BiSolidSchool className="text-cyan-600" size={50} />
                                                            <BsHospital className="text-cyan-600" size={50} />

                                                        </div>

                                                        {/* data */}
                                                        {data[tipo].slice(1, 2).map((item, index) => (

                                                            <div key={`${tipo}-${index}`} className='flex flex-col items-center gap-2'>
                                                                <div className='flex-1 flex flex-col gap-1 font-semibold text-center text-teal-600'>
                                                                    <p className="text-xl font-bold">{tipo == 'inundaciones' ?
                                                                        NumeroFormateado(item.total_centro_poblado) : NumeroFormateado(item.total_distritos)}
                                                                    </p>
                                                                    <p className="text-md">{tipo == 'inundaciones' ? 'Centros Poblados' : 'Distritos'}</p>
                                                                </div>
                                                                <div className='flex-1 flex flex-col gap-1 font-semibold text-center text-teal-600'>
                                                                    <p className="text-xl font-bold">{NumeroFormateado(item.total_poblacion)}</p>
                                                                    <p className="text-md">Población</p>
                                                                </div>
                                                                <div className='flex-1 flex flex-col gap-1 font-semibold text-center text-teal-600'>
                                                                    <p className="text-xl font-bold">{NumeroFormateado(item.total_vivienda)}</p>
                                                                    <p className="text-md">Viviendas</p>
                                                                </div>
                                                                <div className='flex-1 flex flex-col gap-1 font-semibold text-center text-teal-600'>
                                                                    <p className="text-xl font-bold">{NumeroFormateado(item.total_inst_educativa)}</p>
                                                                    <p className="text-md">Inst. Educativas</p>
                                                                </div>
                                                                <div className='flex-1 flex flex-col gap-1 font-semibold text-center text-teal-600'>
                                                                    <p className="text-xl font-bold">{NumeroFormateado(item.total_est_salud)}</p>
                                                                    <p className="text-md">Est. de Salud</p>
                                                                </div>

                                                            </div>

                                                        ))}
                                                    </div>
                                                    {data[tipo].slice(1, 2).map((item, index) => (

                                                        <div key={`data-${tipo}-${index}`} className="p-2 flex flex-col justify-between">
                                                            <div className='flex flex-1 justify-between gap-3'>
                                                                <div className='flex flex-col w-full gap-2'>
                                                                    <div className={`${nivelColorClasses[item.nivel.toUpperCase()]} text-white text-center font-semibold py-1 rounded`}>
                                                                        {item.nivel}
                                                                    </div>
                                                                    <div className="text-sm text-teal-600">
                                                                        Departamentos:
                                                                        <span className={`${nivelColorClasses[item.nivel.toUpperCase()]} bg-white font-semibold`}>
                                                                            {item.departamentos && formatNombreArray(item.departamentos)}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="mt-4 text-sm text-teal-600 font-semibold">
                                                                Departamentos con población expuesta:
                                                                {item.departamentos_poblacion && item.departamentos_poblacion?.map((depa, index) => (
                                                                    <div key={index} className='flex justify-between items-center'>
                                                                        <span className="font-bold">{depa.departamento}</span> {depa.total_poblacion}
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    ))}

                                                </div>

                                                <div className='flex flex-col items-center justify-center gap-2'>
                                                    <span className='font-bold'>Fuente: CENEPRED (2025)</span>
                                                    <a className='bg-teal-600 p-2 text-white rounded-md' href={escenario.url_base} target='_blank'>
                                                        {escenario.url_base}
                                                    </a>
                                                </div>

                                            </div>

                                            <div className='flex  w-full  justify-center'>
                                                {escenario.mapas && escenario.mapas[index] && (
                                                    <ImageLoad width="60%" path={escenario.mapas[index] ?
                                                        escenario.mapas[index].ruta : null} />
                                                )}
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

export default LluviasAvisoMeteorologicoEstatico
