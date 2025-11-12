import { Button, Card, Notification, Skeleton, Tabs, toast } from "@/components/ui";
import AdaptiveCard from '@/components/shared/AdaptiveCard'
import Container from '@/components/shared/Container'
import usePlantilla from "../hooks/usePlantilla";
import { TbMapPin } from "react-icons/tb";
import { FaHome, FaUsers } from "react-icons/fa";
import { BiDownload, BiSolidSchool } from 'react-icons/bi'
import { BsHospital } from "react-icons/bs";
import NumeroFormateado from "../../../utils/numerFormat";
import TableInstrumentos from "../TableInstrumentos";
import ImageZoom from "../ImageZoom";
import FechaRango from "../FechaReango";
import { useState } from "react";
import { apiPrintEscenario } from "@/services/ModeloDgpService";
import DownloadExcel from "../DownloadExcel";

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
    let clean = pgArray.replace(/[{}"]/g, "");

    // separar por comas
    let items = clean.split(",").filter((v) => v && v !== "NULL");

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

const LluviasAvisoMeteorologicoEstatico2 = () => {
    const { escenario, data, instrumentos, isLoading } = usePlantilla('1');
    const [loadingPrint, setLoadingPrint] = useState(false);
    
    const year = new Date().getFullYear();
    const tipoPeligro = Object.keys(data);
    const tituloPeligo: { [key: string]: string } = {
        'inundaciones': 'Inundación',
        'movimiento_masa': 'Movimiento en masa',
    }

    const exportPDF = async () => {
        try {            
            setLoadingPrint(true);
            const response = await apiPrintEscenario<Blob>(escenario.id, { data })

            const blob = new Blob([response as any])
            const url = window.URL.createObjectURL(blob)
            // window.open(url, "_blank");
            const a = document.createElement("a")
            a.href = url
            a.download = `${escenario.formulario.nombre}.pptx`
            a.click()
            // setTimeout(() => {
            //     window.URL.revokeObjectURL(url)                
            // }, 10000);
        } catch (error) {
            setLoadingPrint(false);
            toast.push(
                <Notification
                    title="Error al imprimir el escenario"
                    type="danger"
                >
                    Hubo un problema al intentar imprimir el escenario. Por favor, intenta de nuevo.
                </Notification>
            )

            console.error("Error exportando PDF:", error)
        } finally {
            setLoadingPrint(false);
        }
    };

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
                            <Button size="xs" variant="solid" onClick={() => exportPDF()} loading={loadingPrint}
                            className="bg-orange-500 hover:bg-orange-600" icon={<BiDownload />}>
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
                                    <div className='p-2'>
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

                                                    <div className='flex items-center justify-between gap-2 w-full'>
                                                        <div className='flex-1'></div>

                                                        <div className="bg-green-600 bg-opacity-70 text-white text-lg font-medium rounded-lg px-4 py-1 text-center">
                                                            <p>Pronóstico de Lluvia {year}</p>
                                                        </div>

                                                        <div className='flex-1 flex justify-end'>
                                                            <div className='bg-green-600 bg-opacity-70 rounded-lg font-semibold text-white px-4 py-2'>
                                                                <span>{escenario.nombre}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='text-teal-600 flex flex-col gap-1 items-center'>
                                                        <p className='text-lg font-semibold'>{tituloPeligo[tipo]}</p>
                                                        <p>
                                                            <FechaRango
                                                                fechaInicio={escenario.fecha_inicio}
                                                                fechaFin={escenario.fecha_fin}
                                                            />
                                                        </p>

                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 w-full border rounded-xl border-teal-600 shadow-md justify-items-stretch items-stretch">
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

                                                            <div className="flex flex-col text-teal-600 mt-4 font-bold">
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
                                                            {data[tipo].slice(0, 1).map((item, index) => (
                                                                <div key={`izq-${index}`} className="grid gap-3 justify-items-center text-center">
                                                                    <div>
                                                                        <p className="text-xl font-bold">
                                                                            {tipo == 'inundaciones' ? NumeroFormateado(item.total_centro_poblado) : NumeroFormateado(item.total_distritos)}
                                                                        </p>
                                                                        <p>{tipo == 'inundaciones' ? 'Centros Poblados' : 'Distritos'}</p>
                                                                    </div>
                                                                    <div>
                                                                        <p className="text-xl font-bold">{NumeroFormateado(item.total_poblacion)}</p>
                                                                        <p>Población</p>
                                                                    </div>
                                                                    <div>
                                                                        <p className="text-xl font-bold">{NumeroFormateado(item.total_vivienda)}</p>
                                                                        <p>Viviendas</p>
                                                                    </div>
                                                                    <div>
                                                                        <p className="text-xl font-bold">{NumeroFormateado(item.total_inst_educativa)}</p>
                                                                        <p>Inst. Educativas</p>
                                                                    </div>
                                                                    <div>
                                                                        <p className="text-xl font-bold">{NumeroFormateado(item.total_est_salud)}</p>
                                                                        <p>Est. Salud</p>
                                                                    </div>
                                                                </div>
                                                            ))}

                                                            {/* Iconos centrales */}
                                                            <div className="grid gap-3 justify-items-center text-cyan-600">
                                                                <TbMapPin className="text-cyan-600" size={50} />
                                                                <FaUsers className="text-cyan-600" size={50} />
                                                                <FaHome className="text-cyan-600" size={50} />
                                                                <BiSolidSchool className="text-cyan-600" size={50} />
                                                                <BsHospital className="text-cyan-600" size={50} />
                                                            </div>

                                                            {/* Datos del bloque derecho */}
                                                            {data[tipo].slice(1, 2).map((item, index) => (
                                                                <div key={`der-${index}`} className="grid gap-3 justify-items-center text-center">
                                                                    <div>
                                                                        <p className="text-xl font-bold">
                                                                            {tipo == 'inundaciones' ? NumeroFormateado(item.total_centro_poblado) : NumeroFormateado(item.total_distritos)}
                                                                        </p>
                                                                        <p>{tipo == 'inundaciones' ? 'Centros Poblados' : 'Distritos'}</p>
                                                                    </div>
                                                                    <div>
                                                                        <p className="text-xl font-bold">{NumeroFormateado(item.total_poblacion)}</p>
                                                                        <p>Población</p>
                                                                    </div>
                                                                    <div>
                                                                        <p className="text-xl font-bold">{NumeroFormateado(item.total_vivienda)}</p>
                                                                        <p>Viviendas</p>
                                                                    </div>
                                                                    <div>
                                                                        <p className="text-xl font-bold">{NumeroFormateado(item.total_inst_educativa)}</p>
                                                                        <p>Inst. Educativas</p>
                                                                    </div>
                                                                    <div>
                                                                        <p className="text-xl font-bold">{NumeroFormateado(item.total_est_salud)}</p>
                                                                        <p>Est. Salud</p>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
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

                                                            <div className="flex flex-col text-teal-600 mt-4 font-bold">
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
                                                        <TableInstrumentos instrumentos={instrumentos} tipo={tipo} />
                                                    </div>
                                                </div>

                                                <DownloadExcel path={escenario.excel} />

                                                <div className="flex items-center gap-2">
                                                    <span className="text-xs flex-shrink-0">Fuente: CENEPRED (2025)</span>
                                                    <a
                                                        href={escenario.url_base}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        title={escenario.url_base}
                                                        className="block bg-teal-600 p-2 text-white rounded-md overflow-hidden whitespace-nowrap text-ellipsis"
                                                    >
                                                        Ver Informe Escenario de Riesgo
                                                    </a>
                                                </div>
                                            </div>

                                            <div className='flex items-center  justify-center'>
                                                {escenario.mapas && escenario.mapas[index] && (
                                                    <ImageZoom src={escenario.mapas[index] ?
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

export default LluviasAvisoMeteorologicoEstatico2
