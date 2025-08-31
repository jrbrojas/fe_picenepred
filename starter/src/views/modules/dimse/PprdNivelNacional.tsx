import React from 'react'

export default function PprdNivelNacional() {
    return (
        <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
            <iframe
                title="Power BI Report"
                src="https://renat.cenepred.gob.pe/tablero/pprrd"
                className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
                loading="lazy"
                allowFullScreen
            />
        </div>
    )
}
