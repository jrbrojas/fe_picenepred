import { Card, Skeleton, Tabs } from "@/components/ui";
import AdaptiveCard from '@/components/shared/AdaptiveCard'
import Container from '@/components/shared/Container'
import usePlantilla from "../hooks/usePlantilla";
import ImageLoad from "../ImageLoad";


const nivelColorClasses: { [key: string]: string } = {
    'MUY ALTO': 'text-red-500 bg-red-500',
    'ALTO': 'text-orange-400 bg-orange-400',
    'MEDIO': 'text-yellow-500 bg-yellow-500',
    'BAJO': 'text-green-400 bg.green-400',
    'MUY BAJO': 'text-green-700 bg-green-700',
    '': 'text-gray-500 bg-gray-500',
}

const LluviasAvisoMeteorologicoEstatico = () => {
    const { escenario, data, isLoading } = usePlantilla('3');
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
                    </div>) : (
                    <>
                        <div className='flex justify-between items-center mb-3'>
                            <div className="text-lg p-2 font-semibold text-white bg-teal-600 rounded-full">
                                <p className='mr-5 ml-2'>PLAN MULTISECTORIAL</p>
                            </div>
                        </div>

                        <div className='flex-1 flex flex-col items-center text-center text-2xl mb-5'>
                            <h2 className="font-bold text-teal-600">
                                ESCENARIO DE RIESGO POR INUNDACIONES Y MOVIMIENTOS EN MASA
                            </h2>
                            <p className='font-bold text-green-600/70'>{escenario.nombre}</p>
                        </div>

                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>

                            <div className='grid grid-cols-2 border rounded-xl border-teal-600 shadow-md bg-white'>
                                <div className='w-full flex justify-center p-5'>
                                    <ImageLoad path={escenario.mapas[0].ruta} />
                                </div>
                                <div className='flex flex-col text-center justify-center items-center mr-5'>
                                    <h4 className='font-bold text-teal-600 '>ESCENARIO DE RIESGO POR</h4>
                                    <h4 className='font-bold text-green-600/70'>INUNDACIONES</h4>
                                    <table className='mt-3'>
                                        <thead>
                                            <tr>
                                                <th className="bg-gray-400 text-white px-4 py-2 text-left">Riesgo</th>
                                                {data['inundaciones'].slice(0, 2).map((item, index) => (
                                                    <th key={index} className={`${nivelColorClasses[item.nivel.toUpperCase()]} text-white px-4 py-2 text-left`}>
                                                        {item.nivel}
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>

                                        <tbody>
                                            <tr className="odd:bg-gray-50">
                                                <td className="px-4 py-2">Distritos: </td>
                                                {data['inundaciones'].slice(0, 2).map((item, index) => (
                                                    <td key={index} className="px-4 py-2">{item.total_distritos}</td>
                                                ))}
                                            </tr>
                                            <tr className="odd:bg-gray-50">
                                                <td className="px-4 py-2">Población: </td>
                                                {data['inundaciones'].slice(0, 2).map((item, index) => (
                                                    <td key={index} className="px-4 py-2">{item.total_poblacion}</td>
                                                ))}
                                            </tr>
                                            <tr className="odd:bg-gray-50">
                                                <td className="px-4 py-2">Viviendas: </td>
                                                {data['inundaciones'].slice(0, 2).map((item, index) => (
                                                    <td key={index} className="px-4 py-2">{item.total_vivienda}</td>
                                                ))}
                                            </tr>
                                            <tr className="odd:bg-gray-50">
                                                <td className="px-4 py-2">E. Salud: </td>
                                                {data['inundaciones'].slice(0, 2).map((item, index) => (
                                                    <td key={index} className="px-4 py-2">{item.total_est_salud}</td>
                                                ))}
                                            </tr>
                                            <tr className="odd:bg-gray-50">
                                                <td className="px-4 py-2">I. Educativas: </td>
                                                {data['inundaciones'].slice(0, 2).map((item, index) => (
                                                    <td key={index} className="px-4 py-2">{item.total_inst_educativa}</td>
                                                ))}
                                            </tr>
                                            <tr className="odd:bg-gray-50">
                                                <td className="px-4 py-2">S. Agricola (Ha): </td>
                                                {data['inundaciones'].slice(0, 2).map((item, index) => (
                                                    <td key={index} className="px-4 py-2">{item.total_superficie_agricola}</td>
                                                ))}
                                            </tr>
                                            <tr className="odd:bg-gray-50">
                                                <td className="px-4 py-2">vias (Km): </td>
                                                {data['inundaciones'].slice(0, 2).map((item, index) => (
                                                    <td key={index} className="px-4 py-2">{item.total_vias}</td>
                                                ))}
                                            </tr>

                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className='grid grid-cols-2 border rounded-xl border-teal-600 shadow-md bg-white'>
                                <div className='w-full flex justify-center p-5'>
                                    <ImageLoad path={escenario.mapas[1].ruta} />
                                </div>
                                <div className='flex flex-col text-center justify-center items-center p-2'>
                                    <h4 className='font-bold text-teal-600 '>ESCENARIO DE RIESGO POR</h4>
                                    <h4 className='font-bold text-green-600/70'>MOVIMIENTOS EN MASA</h4>
                                    <table className='mt-3'>
                                        <thead>
                                            <tr>
                                                <th className="bg-gray-400 text-white px-4 py-2 text-left">Riesgo</th>
                                                {data['movimiento_masa'].slice(0, 2).map((item, index) => (
                                                    <th key={index} className={`${nivelColorClasses[item.nivel.toUpperCase()]} text-white px-4 py-2 text-left`}>
                                                        {item.nivel}
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>

                                        <tbody>
                                            <tr className="odd:bg-gray-50">
                                                <td className="px-4 py-2">Distritos: </td>
                                                {data['movimiento_masa'].slice(0, 2).map((item, index) => (
                                                    <td key={index} className="px-4 py-2">{item.total_distritos}</td>
                                                ))}
                                            </tr>
                                            <tr className="odd:bg-gray-50">
                                                <td className="px-4 py-2">Población: </td>
                                                {data['movimiento_masa'].slice(0, 2).map((item, index) => (
                                                    <td key={index} className="px-4 py-2">{item.total_poblacion}</td>
                                                ))}
                                            </tr>
                                            <tr className="odd:bg-gray-50">
                                                <td className="px-4 py-2">Viviendas: </td>
                                                {data['movimiento_masa'].slice(0, 2).map((item, index) => (
                                                    <td key={index} className="px-4 py-2">{item.total_vivienda}</td>
                                                ))}
                                            </tr>
                                            <tr className="odd:bg-gray-50">
                                                <td className="px-4 py-2">E. Salud: </td>
                                                {data['movimiento_masa'].slice(0, 2).map((item, index) => (
                                                    <td key={index} className="px-4 py-2">{item.total_est_salud}</td>
                                                ))}
                                            </tr>
                                            <tr className="odd:bg-gray-50">
                                                <td className="px-4 py-2">I. Educativas: </td>
                                                {data['movimiento_masa'].slice(0, 2).map((item, index) => (
                                                    <td key={index} className="px-4 py-2">{item.total_inst_educativa}</td>
                                                ))}
                                            </tr>
                                            <tr className="odd:bg-gray-50">
                                                <td className="px-4 py-2">S. Agricola (Ha): </td>
                                                {data['movimiento_masa'].slice(0, 2).map((item, index) => (
                                                    <td key={index} className="px-4 py-2">{item.total_superficie_agricola}</td>
                                                ))}
                                            </tr>
                                            <tr className="odd:bg-gray-50">
                                                <td className="px-4 py-2">vias (Km): </td>
                                                {data['movimiento_masa'].slice(0, 2).map((item, index) => (
                                                    <td key={index} className="px-4 py-2">{item.total_vias}</td>
                                                ))}
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                    </>)}
            </AdaptiveCard>
        </Container>

    )
}

export default LluviasAvisoMeteorologicoEstatico
