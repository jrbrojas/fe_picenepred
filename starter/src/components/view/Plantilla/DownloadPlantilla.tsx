import { useState } from 'react'
import Button from '@/components/ui/Button'
import { BiDownload } from 'react-icons/bi'
import { GroupPlantilla, PlantillaGroupItem } from '@/views/plantillaFormulario/types'
import { apiCreateEscenario } from '@/services/EscenariosService'
import { apiDownloadPlantilla } from '@/services/PlantillasService'
import { Notification, toast } from '@/components/ui'

interface TablePlantillaAProps {
    escenarioId: string | number,
    data: PlantillaGroupItem[]
    loading: boolean,
    nombreArchivo: string,
}

const DownloadPlantilla = ({ escenarioId, data, loading, nombreArchivo }: TablePlantillaAProps) => {

    const [loadingDowload, setLoadingDownload] = useState(false)

    const handleDownload = async () => {

        setLoadingDownload(true);
        try {
            await apiDownloadPlantilla(escenarioId, data)
        } catch (error) {
            console.log(error);

            toast.push(
                <Notification
                    title="Error al descargar plantilla"
                    type="danger"
                >
                    Hubo un problema al intentar crear el escenario. Por favor, intenta de nuevo.
                </Notification>
            )
        } finally {
            setLoadingDownload(false);
        }
    };

    return (
        <div>
            <Button variant="solid" icon={<BiDownload className='text-xl' />} loading={loadingDowload} disabled={loading} onClick={() => handleDownload()}>
                Descargar {nombreArchivo}
            </Button>
        </div>
    )
}

export default DownloadPlantilla

