const LluviasAvisoMeteorologicoDinamico = () => {
    return (
        <div className="p-4">
            <div className="bg-white rounded-lg shadow-md p-4">
                <div className="relative w-full" style={{ height: '600px' }}>
                    <iframe title="Formulario Lluvias Aviso Meteorologico" 
                        width="100%" 
                        height="100%" 
                        src="https://app.powerbi.com/view?r=eyJrIjoiNjMyNGNiZTktOGNkYS00NGNiLWE4MDMtODU2NjAyOTEwMjBlIiwidCI6IjM2MDJjOGY2LTQ3NzgtNGQwYi04OTczLTY5MTczYjE3N2U4YiIsImMiOjR9&pageName=f1fdb54c705e20b43af4" allowFullScreen={true}></iframe>
                </div>
            </div>
        </div>
    )
}

export default LluviasAvisoMeteorologicoDinamico
