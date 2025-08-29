import React, { useEffect, useState } from 'react'
import { MapContainer, GeoJSON, useMapEvents, useMap } from 'react-leaflet'

import L from 'leaflet'; 

const LayerGeoJson = ({todosDptos, ubigeoDpto, onTodosChange}) => {
    const [geoJsonKey, addToGeoJsonKey] = useState(1);
    const [mapa, setMapa] = useState();
    const map = useMap();
    
    const style = {
        fillColor: 'null',
        color: 'gray',
        weight: 1,
        //dashArray: '10'
    };

    useEffect(() => {
      if (ubigeoDpto==='0') {
          setMapa(todosDptos)
          let geojsonLayer = L.geoJSON(todosDptos);
          let bounds = geojsonLayer.getBounds();
          map.fitBounds(bounds)
          //map.flyToBounds(bounds)
      }
      if (ubigeoDpto!=='0') {
          let dptoSeleccionado = todosDptos.features.filter((e) => {
              return e.properties.CCDD === ubigeoDpto; 
          });
          setMapa(dptoSeleccionado)
          let geojsonLayer = L.geoJSON(dptoSeleccionado);
          let bounds = geojsonLayer.getBounds();
          map.fitBounds(bounds)
      }
      addToGeoJsonKey(geoJsonKey + 1)
    }, [todosDptos, ubigeoDpto]);
  
    const onEachFeature = (feature, layer) => {      
        layer.on({
            click: (e) => {
                map.flyToBounds(e.target._bounds)
                let dptoSeleccionado = todosDptos.features.filter((ev) => {
                    return ev.properties.CCDD === e.target.feature.properties.CCDD;                     
                });
                setMapa(dptoSeleccionado[0])
                addToGeoJsonKey(geoJsonKey + 1);
                
                const newValue = e.target.feature.properties.CCDD;
                onTodosChange(newValue);
                //console.log("Dentro del componente LayerGeoJson ", newValue)
            },
            mouseover: (e) => {
                layer.bindTooltip(feature.properties.NOMBDEP,{permanent:true,direction:'center', className: 'tooltip rounded shadow-lg p-1 bg-yellow-100'});   
                layer.setStyle({
                  fillColor: 'yellow',
                  color: 'gray',
                  weight: 2,
                  //dashArray: '10'
                });
            },
              mouseout: (e) => {
                layer.bindTooltip(null); 
                layer.setStyle({
                  fillColor: 'null',
                  color: 'gray',
                  weight: 1,
                  //dashArray: '10'
                });
            },              
        });
    };
    
    return (
      <>
          { todosDptos && 
            <GeoJSON
              key={geoJsonKey}
              data={mapa}
              style={style}
              onEachFeature={onEachFeature}
            />
          }
      </>
    )
}

export default LayerGeoJson