const LluviasAvisoMeteorologicoDinamico = () => {
    return (
        <div className="bg-white rounded-lg shadow-md p-4">
            <div className="w-full h-[80vh]" >
                <iframe title="Formulario Lluvias Aviso Meteorologico"
                        className="w-full h-full border-0"
                    src="https://app.powerbi.com/view?r=eyJrIjoiNjMyNGNiZTktOGNkYS00NGNiLWE4MDMtODU2NjAyOTEwMjBlIiwidCI6IjM2MDJjOGY2LTQ3NzgtNGQwYi04OTczLTY5MTczYjE3N2U4YiIsImMiOjR9&pageName=f1fdb54c705e20b43af4" allowFullScreen={true}></iframe>
            </div>
        </div>
    )
}

export default LluviasAvisoMeteorologicoDinamico
