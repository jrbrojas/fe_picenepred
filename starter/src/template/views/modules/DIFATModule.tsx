import { useEffect } from 'react'

const DIFATModule = () => {
    useEffect(() => {
        // Redireccionar directamente al tablero RENAT
        window.open('https://renat.cenepred.gob.pe/tablero/inicio', '_blank')
    }, [])

    return (
        <div className="p-8 text-center">
        </div>
    )
}

export default DIFATModule
