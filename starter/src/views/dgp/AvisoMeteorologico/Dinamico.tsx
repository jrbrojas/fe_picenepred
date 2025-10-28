const LluviasAvisoMeteorologicoDinamico = () => {
    return (
        <div>
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-4">
                <div>
                    <h4 className="mb-1">Monitoreo</h4>
                    <p>Avance de Implementación de la Política Nacional y el PLANAGERD</p>
                </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4">
                <div className="w-full h-[80vh]" >
                    <iframe title="1.lluvias_aviso_meteorologico" width="100%" height="100%" src="https://app.powerbi.com/view?r=eyJrIjoiYTdkMjVkYmItMTc1Yy00YmM1LTg0NGEtNzIzZDA5MWU0NjVlIiwidCI6IjM2MDJjOGY2LTQ3NzgtNGQwYi04OTczLTY5MTczYjE3N2U4YiIsImMiOjR9" allowFullScreen={true}></iframe>
                </div>
            </div>
        </div>
    )
}

export default LluviasAvisoMeteorologicoDinamico
