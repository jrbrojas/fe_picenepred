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
import { apiPrintEscenario } from "@/services/ModeloDgpService";
import { useState } from "react";
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
};

const LluviasAvisoTrimestralEstatico = () => {
    const { escenario, data, instrumentos, isLoading } = usePlantilla('2');
    const year = new Date().getFullYear();
    const mesInicio = new Date(escenario.fecha_inicio).toLocaleString('es-ES', { month: 'long' });
    const mesFin = new Date(escenario.fecha_fin).toLocaleString('es-ES', { month: 'long' });
    const tipoPeligro = Object.keys(data);
    const [loadingPrint, setLoadingPrint] = useState(false);

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
                            <TabContent key={tipo} value={tipo}>
                                {/* Verifica si hay datos para este tipo específico */}
                                {data[tipo] && data[tipo].length > 0 ? (
                                    <div className='p-2'>

                                        <div className='flex justify-between gap-4 items-center mb-3'>
                                            <div className='flex-1 flex flex-col items-center text-center'>
                                                <h2 className="text-center font-semibold text-teal-600">
                                                    Escenario de Riesgos por Exposición
                                                </h2>
                                                <p className='text-blue-400 text-lg'>{escenario.nombre}</p>
                                                <p className='text-teal-600 text-lg'>{escenario.titulo_base}</p>
                                            </div>
                                            <div className="p-2 text-lg font-medium text-white bg-teal-600 rounded-full">
                                                <p>AVISO TRIMESTRAL</p>
                                            </div>
                                        </div>

                                        <div className='grid grid-cols-1 lg:grid-cols-5 gap-6'>

                                            <div className='flex flex-col justify-center items-center gap-2'>
                                                <div className='w-full flex justify-center'>
                                                    <ImageZoom
                                                        src={
                                                            escenario.mapas.find(m => m.tipo === (tipo === 'inundaciones'
                                                                ? 'imagen_izquierdo_superior_inu'
                                                                : 'imagen_izquierdo_superior_mm')
                                                            )?.ruta ?? null
                                                        }
                                                    />
                                                </div>
                                                <div className='w-full flex justify-center'>
                                                    <ImageZoom
                                                        src={
                                                            escenario.mapas.find(m => m.tipo === (tipo === 'inundaciones'
                                                                ? 'imagen_izquierdo_inferior_inu'
                                                                : 'imagen_izquierdo_inferior_mm')
                                                            )?.ruta ?? null
                                                        }
                                                    />
                                                </div>
                                            </div>

                                            <div className='col-span-2 flex items-start justify-center'>
                                                <ImageZoom
                                                    src={
                                                        escenario.mapas.find(m => m.tipo === (tipo === 'inundaciones'
                                                                ? 'imagen_centro_inu'
                                                                : 'imagen_centro_mm')
                                                        )?.ruta ?? null
                                                    }
                                                />
                                            </div>

                                            <div className='col-span-2'>
                                                <h3 className='font-semibold text-teal-600 text-center'>
                                                    {mesInicio.toUpperCase()} - {mesFin.toUpperCase()} {year}
                                                </h3>
                                                <h3 className='font-semibold text-green-600/70 text-center'>
                                                    {tipo == 'inundaciones' ? 'Inundación' : 'Movimiento en masa'}
                                                </h3>

                                                {data[tipo].slice(0, 1).map((item, index) => (
                                                    <div key={index} className="grid grid-cols-2 border rounded-xl border-teal-600 shadow-md bg-white">
                                                        <div className="p-2 space-y-4">
                                                            {/* Distritos */}
                                                            <div className="flex items-center gap-3">
                                                                <TbMapPin className="text-cyan-600" size={50} />
                                                                <div className='flex-1 flex flex-col gap-1 font-semibold text-center text-teal-600'>
                                                                    <p className="text-xl font-bold">{NumeroFormateado(item.total_centro_poblado)}</p>
                                                                    <p className="text-md">{'Centros Poblados'}</p>
                                                                </div>
                                                            </div>
                                                            {/* Población */}
                                                            <div className="flex items-center gap-3">
                                                                <FaUsers className="text-cyan-600" size={50} />
                                                                <div className='flex-1 flex flex-col gap-1 font-semibold text-center text-teal-600'>
                                                                    <p className="text-xl font-bold">{NumeroFormateado(item.total_poblacion)}</p>
                                                                    <p className="text-md">Población</p>
                                                                </div>
                                                            </div>
                                                            {/* Viviendas */}
                                                            <div className="flex items-center gap-3">
                                                                <FaHome className="text-cyan-600" size={50} />
                                                                <div className='flex-1 flex flex-col gap-1 font-semibold text-center text-teal-600'>
                                                                    <p className="text-xl font-bold">{NumeroFormateado(item.total_vivienda)}</p>
                                                                    <p className="text-md">Viviendas</p>
                                                                </div>
                                                            </div>
                                                            {/* Instituciones Educativas */}
                                                            <div className="flex items-center gap-3">
                                                                <BiSolidSchool className="text-cyan-600" size={50} />
                                                                <div className='flex-1 flex flex-col gap-1 font-semibold text-center text-teal-600'>
                                                                    <p className="text-xl font-bold">{NumeroFormateado(item.total_inst_educativa)}</p>
                                                                    <p className="text-md">Inst. Educativas</p>
                                                                </div>
                                                            </div>
                                                            {/* Establecimientos de Salud */}
                                                            <div className="flex items-center gap-3">
                                                                <BsHospital className="text-cyan-600" size={50} />
                                                                <div className='flex-1 flex flex-col gap-1 font-semibold text-center text-teal-600'>
                                                                    <p className="text-xl font-bold">{NumeroFormateado(item.total_est_salud)}</p>
                                                                    <p className="text-md">Est. de Salud</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="border-l border-teal-600 p-2 flex flex-col justify-between">
                                                            {/* Nivel de riesgo */}
                                                            <div className={`${nivelColorClasses[item.nivel.toUpperCase()]} text-white text-center font-semibold py-1 rounded`}>
                                                                {item.nivel}
                                                            </div>
                                                            <p className="text-sm text-teal-600 mt-2">
                                                                Departamentos:{" "}
                                                                <span className={`${nivelColorClasses[item.nivel.toUpperCase()]} bg-white font-semibold`}>
                                                                    {item.departamentos && formatNombreArray(item.departamentos)}
                                                                </span>
                                                            </p>

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

                                                <DownloadExcel path={escenario.excel_adjunto} />

                                                <div className='flex items-center gap-2 mt-3'>
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
                                        </div>

                                        <div className="w-full md:w-150 lg:w-200 overflow-x-auto mt-5">
                                            <div className="min-w-[720px] sm:min-w-0">
                                                <TableInstrumentos instrumentos={instrumentos} tipo={tipo} />
                                            </div>
                                        </div>

                                    </div>
                                ) : (
                                    <NoDataMessage />
                                )}
                            </TabContent>
                        ))}

                    </Tabs>
                )}
            </AdaptiveCard>
        </Container>

    )
}

export default LluviasAvisoTrimestralEstatico
