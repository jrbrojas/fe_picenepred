import { useEffect, useState } from 'react'
import { MapContainer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

// import geoperu from '../../assets/data/dptos.json'
import geoperu from '../../assets/data/capital_dptos.json'
import MapaBase from './MapaBase'
import HomeButton from './HomeButton'
import LayerGeoJson from './LayerGeoJson'
import ComboBox from './ComboBox'

const MapaCustom = ({ ubigeo, resetUbigeo }) => {
    const [ubigodepartamento, setUbigeodepartamento] = useState('0')

    const mapOptions = {
        center: [-9.189967, -75.015152],
        zoom: 5,
        maxZoom: 18,
        minZoom: 5,
        attributionControl: false,
        scrollWheelZoom: false,
    }
    const handleTodosChange = (newValue) => {
        setUbigeodepartamento(newValue)
        //console.log("Dentro del compónente Mapa newValue ", newValue)
        resetUbigeo(newValue)
    }

    useEffect(() => {
        console.log('Prop ubigeo:', ubigeo)
        console.log(
            'Estado ubigodepartamento antes de actualizar:',
            ubigodepartamento,
        )
        setUbigeodepartamento(ubigeo)
        console.log('Estado ubigodepartamento después de actualizar:', ubigeo)
    }, [ubigeo])
    // //console.log("Dentro del compónente Mapa ubigodepartamento ", ubigodepartamento)

    return (
        <>
            <MapContainer {...mapOptions}>
                <MapaBase />
                <LayerGeoJson
                    todosDptos={geoperu}
                    ubigeoDpto={ubigodepartamento}
                    position={mapOptions.center}
                    onTodosChange={handleTodosChange}
                />
                <HomeButton
                    homeLocation={mapOptions}
                    onTodosChange={handleTodosChange}
                />
            </MapContainer>
        </>
    )
}

export default MapaCustom
