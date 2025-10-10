const LluviasAvisoMeteorologicoDinamico = () => {
    return (
        <div className="bg-white rounded-lg shadow-md p-4">
            <div className="w-full h-[80vh]" >
                <iframe title="Bajas Temp Aviso Meteorologico" width="100%" height="100%" src="https://app.powerbi.com/view?r=eyJrIjoiYzFmNGNiZDktYjhmYy00ZDAyLWExMGQtODMzYzkwNzNlNDQ2IiwidCI6IjM2MDJjOGY2LTQ3NzgtNGQwYi04OTczLTY5MTczYjE3N2U4YiIsImMiOjR9" allowFullScreen={true}></iframe>
            </div>
        </div>
    )
}

export default LluviasAvisoMeteorologicoDinamico
