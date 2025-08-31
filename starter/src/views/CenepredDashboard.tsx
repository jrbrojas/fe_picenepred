const CenepredDashboard = () => {
    return (
        <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
            <iframe
                allowFullScreen
                title="Power BI Report"
                src="https://app.powerbi.com/view?r=eyJrIjoiMjE1N2JiYmMtYjNjNS00ZjBlLWFjN2ItODdiYmU3NTBkNWIzIiwidCI6IjM2MDJjOGY2LTQ3NzgtNGQwYi04OTczLTY5MTczYjE3N2U4YiIsImMiOjR9"
                className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
                loading="lazy"
            />
        </div>
    )
}

export default CenepredDashboard
