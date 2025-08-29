import { useEffect, useState, useRef } from 'react'
import { GeoJSON, useMap } from 'react-leaflet'
import L, {
    GeoJSON as LeafletGeoJSON,
    Map as LeafletMap,
    Layer,
    FeatureGroup,
} from 'leaflet'

interface LayerGeoJsonProps {
    todosDptos: GeoJSON.FeatureCollection
    ubigeoDpto: string
    onTodosChange: (newValue: string) => void
}

const LayerGeoJson: React.FC<LayerGeoJsonProps> = ({
    todosDptos,
    ubigeoDpto,
    onTodosChange,
}) => {
    const [geoJsonKey, addToGeoJsonKey] = useState(1)
    const [mapa, setMapa] = useState<string | undefined>()
    const map = useMap()
    const geoJsonRef = useRef<LeafletGeoJSON | null>(null)

    useEffect(() => {
        if (ubigeoDpto === '0') {
            setMapa(undefined)
            const geojsonLayer = L.geoJSON(todosDptos)
            const bounds = geojsonLayer.getBounds()
            map.fitBounds(bounds)
        }
        addToGeoJsonKey((prevKey) => prevKey + 1)
    }, [todosDptos, ubigeoDpto, map])

    const highlightFeature = (e: L.LeafletMouseEvent) => {
        const layer = e.target as Layer
        if (geoJsonRef.current) {
            geoJsonRef.current.resetStyle()
        }
        layer.setStyle({
            fillColor: 'yellow',
            weight: 2,
            color: 'white',
            fillOpacity: 0.6,
        })
        setMapa(layer.feature?.properties?.NOMBDEP)

        const newValue = layer.feature?.properties?.CCDD
        onTodosChange(newValue)
    }

    const onEachFeature = (feature: GeoJSON.Feature, layer: Layer) => {
        layer.on({
            click: highlightFeature,
            mouseover: () => {
                layer.bindTooltip(feature.properties?.NOMBDEP || '', {
                    permanent: true,
                    direction: 'center',
                    className: 'tooltip rounded shadow-lg p-1 bg-yellow-100',
                })
            },
            mouseout: () => {
                layer.unbindTooltip()
            },
        })
    }

    const styleFeature = (
        feature: GeoJSON.Feature<GeoJSON.Geometry, GeoJSON.GeoJsonProperties>,
    ) => {
        return {
            fillColor: feature.properties?.NOMBDEP === mapa ? 'yellow' : 'grey',
            weight: 2,
            color: 'white',
            fillOpacity: 0.6,
        }
    }

    return (
        <>
            {todosDptos && (
                <GeoJSON
                    key={geoJsonKey}
                    data={todosDptos}
                    style={styleFeature}
                    onEachFeature={onEachFeature}
                />
            )}
        </>
    )
}

export default LayerGeoJson
