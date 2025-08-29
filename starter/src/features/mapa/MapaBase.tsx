import { LayerGroup, LayersControl, TileLayer } from 'react-leaflet'
import { Control } from 'leaflet'

const MapaBase = () => {
    return (
        <>
            <LayersControl position="bottomleft" as={Control.Layers}>
                <LayersControl.BaseLayer checked name="Sin Fondo Map">
                    <TileLayer attribution="" url="#" />
                </LayersControl.BaseLayer>

                <LayersControl.BaseLayer name="Open Street Map">
                    <TileLayer
                        attribution="&copy; <a href=\"
                        https:url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" //www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors"
                    />
                </LayersControl.BaseLayer>

                <LayersControl.BaseLayer name="Carto Map">
                    <TileLayer
                        attribution="Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL."
                        url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
                    />
                </LayersControl.BaseLayer>

                <LayersControl.BaseLayer name="Google Map">
                    <TileLayer
                        attribution="Google Maps"
                        url="https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}"
                    />
                </LayersControl.BaseLayer>

                <LayersControl.BaseLayer name="Google Map Satellite">
                    <LayerGroup>
                        <TileLayer
                            attribution="Google Maps Satellite"
                            url="https://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}"
                        />
                        <TileLayer url="https://www.google.cn/maps/vt?lyrs=y@189&gl=cn&x={x}&y={y}&z={z}" />
                    </LayerGroup>
                </LayersControl.BaseLayer>
            </LayersControl>
        </>
    )
}

export default MapaBase
