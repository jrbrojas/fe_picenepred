import { useEffect, useRef } from 'react'

const DIFATModule = () => {
    // useEffect(() => {
    //     // Redireccionar directamente al tablero RENAT
    //     window.open('https://renat.cenepred.gob.pe/tablero/inicio', '_blank')
    // }, [])

    const iframeRef = useRef<HTMLIFrameElement>(null)

    useEffect(() => {
        const iframe = iframeRef.current
        if (!iframe) return

        iframe.onload = () => {
            try {
                const iframeDoc =
                    iframe.contentDocument || iframe.contentWindow?.document
                if (!iframeDoc) return

                // Busca y hace click en el botón
                const button = iframeDoc.querySelector(
                    'button.bg-cenepred-300',
                ) as HTMLButtonElement
                button?.click()
            } catch (error) {
                console.warn('No se pudo acceder al iframe por CORS:', error)
            }
        }
    }, [])

    return (
        <div className="p-8 text-center">
            <iframe
                ref={iframeRef}
                src="https://renat.cenepred.gob.pe/tablero/inicio"
                title="RENAT Tablero"
                className="w-full h-screen border-0"
            />
        </div>
    )
}

export default DIFATModule
