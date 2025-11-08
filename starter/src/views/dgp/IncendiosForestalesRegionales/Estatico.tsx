import { Button, Card, Notification, Skeleton, Tabs, toast } from "@/components/ui";
import AdaptiveCard from '@/components/shared/AdaptiveCard'
import Container from '@/components/shared/Container'
import usePlantilla from "../hooks/usePlantilla";
import { TbMapPin } from "react-icons/tb";
import { FaHome, FaUsers } from "react-icons/fa";
import { BiDownload, BiSolidSchool } from "react-icons/bi";
import { BsHospital, BsTreeFill } from "react-icons/bs";
import NumeroFormateado from "@/utils/numerFormat";
import TableInstrumentos from "../TableInstrumentos";
import ImageZoom from "../ImageZoom";
import { useState } from "react";
import { apiPrintEscenario } from "@/services/ModeloDgpService";

const nivelColorClasses: { [key: string]: string } = {
    'MUY ALTO': 'text-red-500 bg-red-500',
    'ALTO': 'text-orange-400 bg-orange-400',
    'MEDIO': 'text-yellow-500 bg-yellow-500',
    'BAJO': 'text-green-400 bg.green-400',
    'MUY BAJO': 'text-green-700 bg-green-700',
    '': 'text-gray-500 bg-gray-500',
}

const IncendiosForestalesRegionalesEstatico = () => {
    const { escenario, data, instrumentos, isLoading } = usePlantilla('8');
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

    const formatDepartamentArray = (pgArray: string) => {
        if (!pgArray) return "";

        // quitar llaves { }
        let clean = pgArray.replace(/[{}]/g, "");

        // separar por comas
        return clean.split(",").filter((v) => v && v !== "NULL");

    };

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

                                <div className="w-full flex justify-start">
                                    <div className="flex flex-col gap-4 w-full">
                                        {escenario.mapas && escenario.mapas[0] && (
                                            <ImageZoom
                                                src={
                                                    escenario.mapas.filter((m) => m.tipo === 'mapa_izquierdo')[0] ?
                                                        escenario.mapas.filter((m) => m.tipo === 'mapa_izquierdo')[0].ruta : null
                                                }
                                            />
                                        )}
                                    </div>
                                </div>

                                <div className='col-span-2'>
                                    <div className='flex flex-col gap-2'>
                                        <div className='flex-1 flex flex-col items-center text-center'>
                                            <h3 className="text-sm text-center font-semibold text-teal-600">
                                                {escenario.nombre}
                                            </h3>
                                            {data['inundaciones'].slice(0, 1).map((item, index) => (
                                                <h3 key={index} className='text-sm text-center font-bold text-green-600/70'>
                                                    DEPARTAMENTO DE {formatDepartamentArray(item.departamentos ?? null)}
                                                </h3>
                                            ))}
                                        </div>

                                        <div className='w-full flex flex-col items-center justify-center'>
                                            {escenario.mapas && escenario.mapas[0] && (
                                                <ImageZoom src={escenario.mapas.filter(m => m.tipo === 'mapa_centro')[0] ?
                                                    escenario.mapas.filter(m => m.tipo === 'mapa_centro')[0].ruta : null} />
                                            )}
                                        </div>
                                        <div className="w-full overflow-x-auto">
                                            <div className="min-w-[720px] sm:min-w-0">
                                                <TableInstrumentos instrumentos={instrumentos} tipo={'inundaciones'} />
                                            </div>
                                            <div className='w-full flex items-center gap-2 mt-3'>
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
                                </div>

                                {data['inundaciones'].slice(0, 1).map((item, index) => (
                                    <div key={index} className="flex flex-col gap-3 justify-start items-center">

                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-teal-600 rounded-lg w-full text-center">
                                                <h4 className='text-sm font-medium text-white mr-4 ml-4'>INCENDIO FORESTALES</h4>
                                            </div>
                                            <Button size="xs" variant="solid" onClick={() => exportPDF()} loading={loadingPrint}
                                                className="bg-orange-500 hover:bg-orange-600 h-full" icon={<BiDownload />}>
                                                Descargar PPT
                                            </Button>
                                        </div>

                                        {/* Nivel de riesgo */}
                                        <div className={`${nivelColorClasses[item.nivel.toUpperCase()]} text-white text-center font-semibold p-2 w-full rounded`}>
                                            {item.nivel}
                                        </div>

                                        <div className="bg-gray-200/50 rounded-4xl p-5 space-y-5">
                                            {/* Centros poblados */}
                                            <div className="flex items-center gap-8">
                                                <TbMapPin className="text-cyan-600" size={50} />
                                                <div className='flex-1 flex flex-col gap-1 font-semibold text-center text-teal-600'>
                                                    <p className="text-xl font-bold">{NumeroFormateado(item.total_centro_poblado)}</p>
                                                    <p className="text-md">Centros poblados</p>
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
                                            {/* Inst. Educativas */}
                                            <div className="flex items-center gap-8">
                                                <BiSolidSchool className="text-cyan-600" size={50} />
                                                <div className='flex-1 flex flex-col gap-1 font-semibold text-center text-teal-600'>
                                                    <p className="text-xl font-bold">{NumeroFormateado(item.total_inst_educativa)}</p>
                                                    <p className="text-md">Inst. Educativas</p>
                                                </div>
                                            </div>
                                            {/* Est. Salud */}
                                            <div className="flex items-center gap-8">
                                                <BsHospital className="text-cyan-600" size={50} />
                                                <div className='flex-1 flex flex-col gap-1 font-semibold text-center text-teal-600'>
                                                    <p className="text-xl font-bold">{NumeroFormateado(item.total_est_salud)}</p>
                                                    <p className="text-md">Est. de Salud</p>
                                                </div>
                                            </div>
                                            {/* Superficie agricola */}
                                            <div className="flex items-center gap-8">
                                                <BsTreeFill className="text-cyan-600" size={50} />
                                                <div className='flex-1 flex flex-col gap-1 font-semibold text-center text-teal-600'>
                                                    <p className="text-xl font-bold">{NumeroFormateado(item.total_superficie_agricola)}</p>
                                                    <p className="text-md">Sup. Agricola (Ha)</p>
                                                </div>
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

export default IncendiosForestalesRegionalesEstatico
