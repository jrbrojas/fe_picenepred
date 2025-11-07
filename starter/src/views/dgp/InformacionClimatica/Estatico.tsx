import { Button, Card, Skeleton, Tabs } from "@/components/ui";
import AdaptiveCard from '@/components/shared/AdaptiveCard'
import Container from '@/components/shared/Container'
import usePlantilla from "../hooks/usePlantilla";
import NumeroFormateado from "@/utils/numerFormat";
import TableInstrumentos from "../TableInstrumentos";
import ImageZoom from "../ImageZoom";


const nivelColorClasses: { [key: string]: string } = {
    'MUY ALTO': 'text-red-500 bg-red-500',
    'ALTO': 'text-orange-400 bg-orange-400',
    'MEDIO': 'text-yellow-500 bg-yellow-500',
    'BAJO': 'text-green-400 bg.green-400',
    'MUY BAJO': 'text-green-700 bg-green-700',
    '': 'text-gray-500 bg-gray-500',
}

const LluviasAvisoMeteorologicoEstatico = () => {
    const { escenario, data, instrumentos, isLoading } = usePlantilla('3');
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
    )

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
                    <div className='p-2'>
                        <div className='flex justify-between gap-4 items-center mb-3'>

                            <div className="text-md p-2 font-semibold text-white bg-teal-600 rounded-full">
                                <p>PLAN MULTISECTORIAL</p>
                            </div>
                            <div className='flex-1 flex flex-col items-center text-center mb-5'>
                                <h4 className="font-bold text-teal-600">
                                    ESCENARIO DE RIESGO POR INUNDACIONES Y MOVIMIENTOS EN MASA
                                </h4>
                                <h4 className='font-bold text-green-600/70'>{escenario.nombre}</h4>
                            </div>

                        </div>


                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 items-stretch'>

                            <div className='flex flex-col gap-4 items-stretch justify-start'>
                                <div className='grid grid-cols-2 items-stretch border rounded-xl border-teal-600'>
                                    <div className='w-full h-full p-3 flex justify-center items-center aspect-[3/4]'>
                                        {escenario.mapas && escenario.mapas[0] && (
                                            <ImageZoom src={escenario.mapas[0] ? escenario.mapas[0].ruta : null} />
                                        )}
                                    </div>
                                    <div className='flex flex-col text-center justify-start items-center mt-3'>
                                        <span className='font-bold text-teal-600 '>ESCENARIO DE RIESGO POR</span>
                                        <span className='font-bold text-green-600/70'>INUNDACIONES</span>
                                        <div className="w-full mt-3">
                                            <div className="overflow-x-auto w-full p-2">
                                                <table className="sm:min-w-full min-w-[560px] table-fixed border-separate border-spacing-0 w-full">
                                                    <thead>
                                                        <tr>
                                                            <th className="bg-gray-400 text-white text-center">Riesgo</th>
                                                            {data['inundaciones'].slice(0, 2).map((item, index) => (
                                                                <th key={index} className={`${nivelColorClasses[item.nivel.toUpperCase()]} text-white text-center`}>
                                                                    {item.nivel}
                                                                </th>
                                                            ))}
                                                        </tr>
                                                    </thead>

                                                    <tbody>
                                                        <tr className="odd:bg-gray-50">
                                                            <td className="text-start p-2 text-xs">Distritos: </td>
                                                            {data['inundaciones'].slice(0, 2).map((item, index) => (
                                                                <td key={index} className="text-start p-2 text-xs">{NumeroFormateado(item.total_distritos)}</td>
                                                            ))}
                                                        </tr>
                                                        <tr className="odd:bg-gray-50">
                                                            <td className="text-start p-2 text-xs">Población: </td>
                                                            {data['inundaciones'].slice(0, 2).map((item, index) => (
                                                                <td key={index} className="text-start p-2 text-xs">{NumeroFormateado(item.total_poblacion)}</td>
                                                            ))}
                                                        </tr>
                                                        <tr className="odd:bg-gray-50">
                                                            <td className="text-start p-2 text-xs">Viviendas: </td>
                                                            {data['inundaciones'].slice(0, 2).map((item, index) => (
                                                                <td key={index} className="text-start p-2 text-xs">{NumeroFormateado(item.total_vivienda)}</td>
                                                            ))}
                                                        </tr>
                                                        <tr className="odd:bg-gray-50">
                                                            <td className="text-start p-2 text-xs">E. Salud: </td>
                                                            {data['inundaciones'].slice(0, 2).map((item, index) => (
                                                                <td key={index} className="text-start p-2 text-xs">{NumeroFormateado(item.total_est_salud)}</td>
                                                            ))}
                                                        </tr>
                                                        <tr className="odd:bg-gray-50">
                                                            <td className="text-start p-2 text-xs">I. Educa.: </td>
                                                            {data['inundaciones'].slice(0, 2).map((item, index) => (
                                                                <td key={index} className="text-start p-2 text-xs">{NumeroFormateado(item.total_inst_educativa)}</td>
                                                            ))}
                                                        </tr>
                                                        <tr className="odd:bg-gray-50">
                                                            <td className="text-start p-2 text-xs">S. Agrícola: </td>
                                                            {data['inundaciones'].slice(0, 2).map((item, index) => (
                                                                <td key={index} className="text-start p-2 text-xs">{NumeroFormateado(item.total_superficie_agricola)}</td>
                                                            ))}
                                                        </tr>
                                                        <tr className="odd:bg-gray-50">
                                                            <td className="text-start p-2 text-xs">Vias (Km): </td>
                                                            {data['inundaciones'].slice(0, 2).map((item, index) => (
                                                                <td key={index} className="text-start p-2 text-xs">{NumeroFormateado(item.total_vias)}</td>
                                                            ))}
                                                        </tr>

                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full overflow-x-auto">
                                    <div className="min-w-[720px] sm:min-w-0">
                                        <TableInstrumentos instrumentos={instrumentos} tipo={'inundaciones'} />
                                    </div>
                                    <div className='flex items-center gap-3 mt-3'>
                                        <span className="text-xs flex-shrink-0">Fuente: CENEPRED (2025)</span>
                                        <a
                                            href={escenario.url_base}
                                            target="_blank"
                                            rel="noreferrer"
                                            title={escenario.url_base}
                                            className="block bg-teal-600 p-2 text-white rounded-md overflow-hidden whitespace-nowrap text-ellipsis"
                                        >
                                            Ver Informe Escnario de Riesgo
                                        </a>
                                    </div>

                                </div>

                            </div>

                            <div className='flex flex-col gap-4 items-stretch justify-start'>
                                <div className='grid grid-cols-2 items-stretch border rounded-xl border-teal-600'>
                                    <div className='w-full h-full p-4 flex justify-center items-center aspect-[3/4]'>
                                        {escenario.mapas && escenario.mapas[1] && (
                                            <ImageZoom src={escenario.mapas[1] ? escenario.mapas[1].ruta : null} />
                                        )}
                                    </div>
                                    <div className='flex flex-col text-center justify-start items-center mt-3'>
                                        <span className='font-bold text-teal-600 '>ESCENARIO DE RIESGO POR</span>
                                        <span className='font-bold text-green-600/70'>MOVIMIENTO EN MASA</span>
                                        <div className="w-full mt-3">
                                            <div className="overflow-x-auto w-full p-2">
                                                <table className="sm:min-w-full min-w-[560px] table-fixed border-separate border-spacing-0 w-full">
                                                    <thead>
                                                        <tr>
                                                            <th className="bg-gray-400 text-white text-center">Riesgo</th>
                                                            {data['movimiento_masa'].slice(0, 2).map((item, index) => (
                                                                <th key={index} className={`${nivelColorClasses[item.nivel.toUpperCase()]} text-white text-center`}>
                                                                    {item.nivel}
                                                                </th>
                                                            ))}
                                                        </tr>
                                                    </thead>

                                                    <tbody>
                                                        <tr className="odd:bg-gray-50">
                                                            <td className="text-start p-2 text-xs">Distritos: </td>
                                                            {data['movimiento_masa'].slice(0, 2).map((item, index) => (
                                                                <td key={index} className="text-start p-2 text-xs">{NumeroFormateado(item.total_distritos)}</td>
                                                            ))}
                                                        </tr>
                                                        <tr className="odd:bg-gray-50">
                                                            <td className="text-start p-2 text-xs">Población: </td>
                                                            {data['movimiento_masa'].slice(0, 2).map((item, index) => (
                                                                <td key={index} className="text-start p-2 text-xs">{NumeroFormateado(item.total_poblacion)}</td>
                                                            ))}
                                                        </tr>
                                                        <tr className="odd:bg-gray-50">
                                                            <td className="text-start p-2 text-xs">Viviendas: </td>
                                                            {data['movimiento_masa'].slice(0, 2).map((item, index) => (
                                                                <td key={index} className="text-start p-2 text-xs">{NumeroFormateado(item.total_vivienda)}</td>
                                                            ))}
                                                        </tr>
                                                        <tr className="odd:bg-gray-50">
                                                            <td className="text-start p-2 text-xs">E. Salud: </td>
                                                            {data['movimiento_masa'].slice(0, 2).map((item, index) => (
                                                                <td key={index} className="text-start p-2 text-xs">{NumeroFormateado(item.total_est_salud)}</td>
                                                            ))}
                                                        </tr>
                                                        <tr className="odd:bg-gray-50">
                                                            <td className="text-start p-2 text-xs">I. Educa.: </td>
                                                            {data['movimiento_masa'].slice(0, 2).map((item, index) => (
                                                                <td key={index} className="text-start p-2 text-xs">{NumeroFormateado(item.total_inst_educativa)}</td>
                                                            ))}
                                                        </tr>
                                                        <tr className="odd:bg-gray-50">
                                                            <td className="text-start p-2 text-xs">S. Agrícola: </td>
                                                            {data['movimiento_masa'].slice(0, 2).map((item, index) => (
                                                                <td key={index} className="text-start p-2 text-xs">{NumeroFormateado(item.total_superficie_agricola)}</td>
                                                            ))}
                                                        </tr>
                                                        <tr className="odd:bg-gray-50">
                                                            <td className="text-start p-2 text-xs">Vias (Km): </td>
                                                            {data['movimiento_masa'].slice(0, 2).map((item, index) => (
                                                                <td key={index} className="text-start p-2 text-xs">{NumeroFormateado(item.total_vias)}</td>
                                                            ))}
                                                        </tr>

                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full overflow-x-auto">
                                    <div className="min-w-[720px] sm:min-w-0">
                                        <TableInstrumentos instrumentos={instrumentos} tipo={'movimiento_masa'} />
                                    </div>
                                </div>

                            </div>

                        </div>

                    </div>
                )}
            </AdaptiveCard>
        </Container>

    )
}

export default LluviasAvisoMeteorologicoEstatico
