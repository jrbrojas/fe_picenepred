import { Button, Card, Notification, Skeleton, Tabs, toast } from "@/components/ui";
import AdaptiveCard from '@/components/shared/AdaptiveCard'
import Container from '@/components/shared/Container'
import usePlantilla from "../hooks/usePlantilla";
import { TbMapPin } from "react-icons/tb";
import { FaHome, FaUsers } from "react-icons/fa";
import NumeroFormateado from "@/utils/numerFormat";
import TableInstrumentos from "../TableInstrumentos";
import ImageZoom from "../ImageZoom";
import { BiDownload } from "react-icons/bi";
import { apiPrintEscenario } from "@/services/ModeloDgpService";
import { useState } from "react";
import DownloadExcel from "../DownloadExcel";

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

                                <div className='flex flex-col gap-4'>
                                    <div className='flex justify-center items-center overflow-hidden rounded-lg'>
                                        <ImageZoom src={escenario.mapas.find(m => m.tipo === 'imagen_izquierdo_bt')?.ruta ?? null}/>
                                    </div>
                                </div>

                                <div className='col-span-2 flex-col items-center justify-center'>
                                    <div className='flex-1 flex-col items-center text-center mb-2'>
                                        <h6 className="text-center font-semibold text-teal-600">{escenario.nombre}</h6>
                                        <h6 className="text-center font-semibold text-green-600/60">{escenario.subtitulo}</h6>
                                    </div>

                                    <div className='w-full mb-4'>
                                        <ImageZoom src={escenario.mapas.find(m => m.tipo === 'imagen_centro_bt')?.ruta ?? null}/>
                                    </div>

                                    <div className="w-full overflow-x-auto">
                                        <div className="min-w-[720px] sm:min-w-0">
                                            <TableInstrumentos instrumentos={instrumentos} tipo={'inundaciones'} />
                                        </div>
                                    </div>
                                </div>

                                <div className='flex flex-col gap-3 items-center'>
                                    {data['inundaciones'].slice(0, 1).map((item, index) => (
                                        <div key={index} className="flex flex-col gap-3 justify-start items-center w-full">

                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-teal-600 rounded-lg">
                                                    <h4 className='text-sm font-medium text-white mr-4 ml-4'>HELADAS</h4>
                                                </div>
                                                <Button size="xs" variant="solid" onClick={() => exportPDF()} loading={loadingPrint}
                                                    className="bg-orange-500 hover:bg-orange-600" icon={<BiDownload />}>
                                                    Descargar PPT
                                                </Button>
                                            </div>


                                            <div className="bg-gray-200/50 rounded-4xl p-5 grid grid-cols-2 items-center w-full">
                                                <div className='flex flex-col gap-5 items-center'>
                                                    <TbMapPin className="text-cyan-600 text-end" size={50} />
                                                    <FaUsers className="text-cyan-600 text-end" size={50} />
                                                    <FaHome className="text-cyan-600 text-end" size={50} />
                                                </div>
                                                <div className='flex flex-col gap-5 items-center'>
                                                    {/* Distritos */}
                                                    <div className='flex-1 flex flex-col gap-1 font-semibold text-center text-teal-600'>
                                                        <p className="text-xl font-bold">{NumeroFormateado(item.total_distritos)}</p>
                                                        <p className="text-md">Distritos</p>
                                                    </div>
                                                    {/* Población */}
                                                    <div className='flex-1 flex flex-col gap-1 font-semibold text-center text-teal-600'>
                                                        <p className="text-xl font-bold">{NumeroFormateado(item.total_poblacion)}</p>
                                                        <p className="text-md">Población</p>
                                                    </div>
                                                    {/* Viviendas */}
                                                    <div className='flex-1 flex flex-col gap-1 font-semibold text-center text-teal-600'>
                                                        <p className="text-xl font-bold">{NumeroFormateado(item.total_vivienda)}</p>
                                                        <p className="text-md">Viviendas</p>
                                                    </div>

                                                </div>
                                            </div>

                                            <div className="flex flex-col p-2 w-full">
                                                {/* Nivel de riesgo */}
                                                <div className={`${nivelColorClasses[item.nivel.toUpperCase()]} text-white text-center font-semibold py-1 rounded `}>
                                                    {item.nivel}
                                                </div>
                                                <div className="mt-5 text-xs text-teal-600 font-semibold">
                                                    Departamentos con población expuesta:
                                                    {item.departamentos_poblacion && item.departamentos_poblacion?.map((depa, index) => (
                                                        <p key={index} className='flex justify-between items-center'>
                                                            <span className="font-bold">{depa.departamento}</span> {NumeroFormateado(depa.total_poblacion)}
                                                        </p>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    <DownloadExcel path={escenario.excel_adjunto} />

                                    <div className='w-full flex items-center gap-2'>
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
                    )}
            </AdaptiveCard>
        </Container>

    )
}

export default BajasTempInformacionClimaticaEstatico
