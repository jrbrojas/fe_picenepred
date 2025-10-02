import { useEffect, useRef, useState } from 'react'

const DIFATModule = () => {
    const [url] = useState<string>(import.meta.env.VITE_RENAT_URL + "/tablero/inicio/pi")

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
                src={url}
                title="RENAT Tablero"
                className="w-full h-screen border-0"
            />
        </div>
    )
}

export default DIFATModule
