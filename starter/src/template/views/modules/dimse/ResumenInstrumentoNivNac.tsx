import MapaCustom from '../../../../features/mapa/MapaCustom'
import BarchartEntidades from '../../../../template/components/buenasPracticas/components/BarchartEntidades'
import Ganadores from '../../../../template/components/buenasPracticas/components/Ganadores'
import TablaDepartamentos from '../../../../template/components/buenasPracticas/components/TablaDepartamentos'
import DashboardStats from '../../../components/buenasPracticas/components/DashboardStats'
import { useState } from 'react'
import { HiUserGroup, HiDocument, HiAcademicCap } from 'react-icons/hi'
// import DashboardStats from '@/template/components/buenasPracticas/DashboardStats'

export default function ResumenInstrumentoNivNac() {
    const [departamento, setDepartamento] = useState([])
    const [ubigodepartamento, setUbigeodepartamento] = useState('0')
    const [depSeleccionado, setDepseleccionado] = useState('')

    const handleDepartamentoChange = (event) => {
        setUbigeodepartamento(event.target.value)
        //console.log('Dentro del componente Dash : ', event.target.value); // Do something with the selected value
    }
    const handleUbigeoReset = (newValue) => {
        setUbigeodepartamento(newValue)
        //console.log('Dentro del componente Dash handleUbigeoReset : ', newValue); // Do something with the selected value
    }

    const resultados = [
        {
            id: 1,
            entidad: 'Municipalidad de Arequipa',
            categoria: 'Gobierno Local',
            documentos: 10,
            estado: 'Completado',
            fecha: '03/04/2025',
        },
        {
            id: 2,
            entidad: 'Gobierno Regional de Piura',
            categoria: 'Gobierno Regional ',
            documentos: 12,
            estado: 'Pendiente',
            fecha: '03/01/2025',
        },
        {
            id: 2,
            entidad: 'Gobierno Regional Cajamarca',
            categoria: 'Gobierno Regional ',
            documentos: 15,
            estado: 'Pendiente',
            fecha: '03/02/2025',
        },
        {
            id: 2,
            entidad: 'Gobierno Regional de Amazonas',
            categoria: 'Gobierno Regional ',
            documentos: 18,
            estado: 'Pendiente',
            fecha: '05/02/2025',
        },
        {
            id: 2,
            entidad: 'Municipalidad de Chorrillos',
            categoria: 'Gobierno Local ',
            documentos: 12,
            estado: 'Pendiente',
            fecha: '05/10/2025',
        },
        {
            id: 2,
            entidad: 'Gobierno Regional de Ica',
            categoria: 'Gobierno Regional ',
            documentos: 4,
            estado: 'Pendiente',
            fecha: '03/01/2025',
        },
        {
            id: 2,
            entidad: 'Gobierno Regional de Piura',
            categoria: 'Gobierno Regional ',
            documentos: 12,
            estado: 'Pendiente',
            fecha: '03/01/2025',
        },
        {
            id: 2,
            entidad: 'Gobierno Regional de Piura',
            categoria: 'Gobierno Regional ',
            documentos: 12,
            estado: 'Pendiente',
            fecha: '03/01/2025',
        },
    ]

    const nextAsistencias = [
        {
            title: 'PPRRD',
            value: '1251',
            icon: <HiUserGroup className="w-8 h-8" />,
            description: '15% ↗︎ que 2024',
            //description: "↗︎ En proceso",
        },
        {
            title: 'EVAR',
            value: '234',
            icon: <HiDocument className="w-8 h-8" />,
            description: '+8.7% ↗︎ que 2024',
        },
        {
            title: 'PAA',
            value: '592',
            icon: <HiDocument className="w-8 h-8" />,
            description: '+12.4% ↗︎ que 2024',
        },
        {
            title: 'PDC',
            value: '1,567',
            icon: <HiAcademicCap className="w-8 h-8" />,
            description: '+5.9% ↗︎ que 2024',
        },
        {
            title: 'RECURSOS ASIGNADOS PP0068',
            value: '92',
            icon: <HiAcademicCap className="w-8 h-8" />,
            description: '+12.4% ↗︎ que 2024',
        },
        {
            title: 'CONCLUYO ENAGERD',
            value: '67',
            icon: <HiAcademicCap className="w-8 h-8" />,
            description: '+5.9% ↗︎ que 2024',
        },
        {
            title: 'INSTANCIAS GRD IMPLEMANTADAS',
            value: '246',
            icon: <HiUserGroup className="w-8 h-8" />,
            description: '15% ↗︎ que 2024',
            //description: "↗︎ En proceso",
        },
        {
            title: 'DOCUMENTOS QUE IMPLEMENTAN GP Y GC',
            value: '134',
            icon: <HiDocument className="w-8 h-8" />,
            description: '+8.7% ↗︎ que 2024',
        },
        {
            title: 'INSTRUMENTOS TECNICOS GRD',
            value: '92',
            icon: <HiAcademicCap className="w-8 h-8" />,
            description: '+12.4% ↗︎ que 2024',
        },
        {
            title: 'GRUPOS DE TRABAJO GRD',
            value: '57',
            icon: <HiAcademicCap className="w-8 h-8" />,
            description: '+5.9% ↗︎ que 2024',
        },
        {
            title: 'NORMAS QUE IMPLEMENTAN GP Y GC',
            value: '82',
            icon: <HiDocument className="w-8 h-8" />,
            description: '+12.4% ↗︎ que 2024',
        },
        {
            title: 'CERTIFICADOS EN GRD',
            value: '45',
            icon: <HiAcademicCap className="w-8 h-8" />,
            description: '+5.9% ↗︎ que 2024',
        },
    ]

    return (
        <>
            <div className="grid m-4 font-sans">
                <div className="m-4">
                    {/* <div className="p-8 pl-0 border-b-2 border-gray-200">
          <h1 className="text-4xl font-bold"> Dashboard </h1>
        </div> */}
                    <p className="text-3xl font-bold dark:text-whit">
                        BUENAS PRÁCTICAS (TODOS ESTOS DATOS SON DE PRUEBA)
                    </p>
                    <div className="grid grid-cols-1 gap-6 pt-8 mt-2 lg:grid-cols-2 md:grid-cols-2">
                        <select
                            className="w-full select select-ghost"
                            value={ubigodepartamento}
                            onChange={handleDepartamentoChange}
                        >
                            <option value="0">TODOS LOS DEPARTAMENTOS</option>
                            {departamento.map((data: any) => (
                                <option
                                    key={data.departamentos_id + 1}
                                    value={data.departamentos_id}
                                >
                                    {'DEPARTAMENTO DE ' + data.dpto}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-col lg:flex-row">
                        {/** ---------------------- Different stats content 1 ------------------------- */}
                        <div className="grid w-full gap-3 pt-2 lg:grid-cols-6">
                            {nextAsistencias.map((d, k) => {
                                return (
                                    <DashboardStats
                                        key={k}
                                        {...d}
                                        colorIndex={k}
                                    />
                                )
                            })}
                        </div>
                    </div>

                    <div className="grid w-full gap-3 pt-2 lg:grid-cols-2 mt-8">
                        <div className="border-2 shadow-md stats bg-base-200/100">
                            <div className="p-6 bg-base-200/50 rounded-xl">
                                <h1 className="mb-4 text-lg font-bold">
                                    DISTRIBUCIÓN POR REGIÓN
                                </h1>
                                <MapaCustom
                                    ubigeo={ubigodepartamento}
                                    resetUbigeo={handleUbigeoReset}
                                />
                            </div>
                        </div>
                        <div className="border-2 shadow-md stats bg-base-200/100">
                            <div className="p-6 bg-base-200/50 rounded-xl">
                                <h1 className="mb-4 text-lg font-bold">
                                    PARTICIPACIÓN POR CATEGORÍA{' '}
                                    {depSeleccionado}
                                </h1>
                                <BarchartEntidades />
                            </div>
                        </div>
                    </div>

                    <div className="grid w-full gap-3 pt-2 mt-8 mb-8 border-2 shadow-md rounded-xl">
                        <div>
                            <h1 className="text-xl font-bold pl-5">
                                GANADORES DEL CONCURSO
                            </h1>
                        </div>
                        <Ganadores />
                    </div>
                    <div className="grid w-full gap-3 pt-2 lg:grid-cols-1 mt-8 border-2 shadow-md rounded-xl">
                        <div className="w-full text-center">
                            <TablaDepartamentos resultados={resultados} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
