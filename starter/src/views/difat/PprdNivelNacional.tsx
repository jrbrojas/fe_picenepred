import { useState } from 'react'

export default function PprdNivelNacional() {
    const [url] = useState<string>(import.meta.env.VITE_RENAT_URL + "/tablero/pprrd/pi")
    return (
        <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
            <iframe
                title="Power BI Report"
                src={url}
                className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
                loading="lazy"
                allowFullScreen
            />
        </div>
    )
}
