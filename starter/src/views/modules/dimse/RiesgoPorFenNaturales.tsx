export default function RiesgoPorFenNaturales() {
    return (
        <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
            <iframe
                title="Power BI Report"
                src="https://renat.cenepred.gob.pe/tablero/evar"
                className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
                loading="lazy"
                allowFullScreen
            />
        </div>
    )
}
