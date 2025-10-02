const LluviasView = () => {
    return (
        <div className="p-4">
            <div className="bg-white rounded-lg shadow-md p-4">
                <div className="relative w-full" style={{ height: '600px' }}>
                    <iframe 
                        title="Formulario Lluvias Aviso Meteorologico"
                        width="100%"
                        height="100%"
                        src="https://app.powerbi.com/reportEmbed?reportId=94eaca08-69d7-4ee2-bed0-d376216cddd1&autoAuth=true&ctid=3602c8f6-4778-4d0b-8973-69173b177e8b" 
                        >
                        
                        </iframe>
                </div>
            </div>
        </div>
    )
}

export default LluviasView
