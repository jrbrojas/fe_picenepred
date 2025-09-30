import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { useEffect, useState } from "react";
import L, { LatLngBoundsExpression } from "leaflet";

interface Props {
  query: string;
}

export default function MapaPeru({ query }: Props) {
  const [geojson, setGeojson] = useState<any | null>(null);
  const [bounds, setBounds] = useState<LatLngBoundsExpression | null>(null);

  useEffect(() => {
    if (!query) return;

    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
      query
    )}&polygon_geojson=1&format=jsonv2`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0 && data[0].geojson) {
          setGeojson(data[0].geojson);

          if (data[0].boundingbox) {
            const bb = data[0].boundingbox.map(Number);
            setBounds([
              [bb[0], bb[2]],
              [bb[1], bb[3]],
            ] as LatLngBoundsExpression);
          }
        }
      });
  }, [query]);

  return (
    <MapContainer
      center={[-9.19, -75.0152]} // centro de Perú
      zoom={5}
      style={{ height: "100%", width: "100%" }}
      bounds={bounds || undefined}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OSM</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {geojson && (
        <GeoJSON
          key={JSON.stringify(geojson)}
          data={geojson}
          style={{ 
            color: "#01839b", weight: 3, fillOpacity: 0.2 
          }}
        />
      )}
    </MapContainer>
  );
}
