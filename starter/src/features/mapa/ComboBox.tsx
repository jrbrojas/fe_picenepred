const ComboBox = ({ dataGeoJSON, onTodosChange, ubigeoDpto }) => {
    const handleDepartamentoChange = (event) => {
        const newValue = event.target.value
        onTodosChange(newValue)
        console.log('Dentro del Componente ComboBox ', newValue)
    }

    return (
        <>
            <select
                className="w-full select select-ghost"
                value={ubigeoDpto}
                onChange={handleDepartamentoChange}
            >
                <option value="0">Todos los departamentos</option>
                {dataGeoJSON.features.map((data, i) => (
                    <option key={i} value={data.properties.CCDD}>
                        {data.properties.NOMBDEP}
                    </option>
                ))}
            </select>
        </>
    )
}

export default ComboBox
