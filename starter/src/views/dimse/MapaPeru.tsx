import { MapContainer, TileLayer, GeoJSON, useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import L, { LatLngBoundsExpression } from "leaflet";

interface Props {
    query: string;
}

function getLugar(data: any[]) {
    if (data.length > 0) {
        const itemPol = data.find(i => i.geojson.type == 'Polygon');
        return itemPol ?? data[0];
    }
    return null;
}

// 🔹 Subcomponente que ajusta el zoom al polígono
function FitBounds({ bounds }: { bounds: LatLngBoundsExpression | null }) {
    const map = useMap();

    useEffect(() => {
        if (bounds) {
            map.fitBounds(bounds, { padding: [30, 30] }); // zoom con padding
        }
    }, [bounds, map]);

    return null;
}

export default function MapaPeru({ query }: Props) {
    const [geojson, setGeojson] = useState<any | null>(null);
    const [bounds, setBounds] = useState<LatLngBoundsExpression | null>(null);
    const [loading, setLoading] = useState(false); // ✅ loading state

    function encontrarLugar(data: any, q: string) {
        if (data.length > 0) {
            const lugar = getLugar(data);
            setGeojson(lugar.geojson);

            if (lugar.boundingbox) {
                const bb = lugar.boundingbox.map(Number);
                setBounds([
                    [bb[0], bb[2]],
                    [bb[1], bb[3]],
                ] as LatLngBoundsExpression);
            }
            return;
        }
        const palabras = q.split(', ')
        if (palabras.length > 4) {
            fetchBuscarLugar(palabras.slice(-4).join(', '))
            return;
        }
        setGeojson(null);
        setBounds(null);
    }

    function fetchBuscarLugar(q: string) {
        setLoading(true); // empieza a cargar

        const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
            q
        )}&polygon_geojson=1&format=jsonv2`;

        fetch(url)
            .then((res) => res.json())
            .then((data) => encontrarLugar(data, q))
            .finally(() => setLoading(false)); // termina la carga
    }

    useEffect(() => {
        if (!query) return;
        fetchBuscarLugar(query);
    }, [query]);

    return (
        <div style={{ height: "100%", width: "100%", position: "relative" }}>
            {/* 🔹 Loader encima del mapa */}
            {loading && (
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "rgba(255,255,255,0.7)",
                        zIndex: 1000,
                        fontWeight: "bold",
                        fontSize: "18px",
                    }}
                >
                    Cargando...
                </div>
            )}

            <MapContainer
                center={[-9.19, -75.0152]}
                minZoom={5}
                style={{ height: "100%", width: "100%" }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                />

                {/* 🔹 Ajusta automáticamente el zoom */}
                <FitBounds bounds={bounds} />

                {geojson && (
                    <GeoJSON
                        key={JSON.stringify(geojson)}
                        interactive={false}
                        data={geojson}
                        style={{
                            color: "#01839b",
                            weight: 3,
                            fillOpacity: 0.2,
                        }}
                    />
                )}
            </MapContainer>
        </div>
    );
}
