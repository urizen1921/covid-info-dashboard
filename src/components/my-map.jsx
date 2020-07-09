import React from 'react';
import { Map as LeafLetMap, Circle, Popup, TileLayer } from 'react-leaflet';


const TILE_URL =
    'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}';
    
const CONFIG = {
  center: [35, -30],
  maxBounds: [
      [-90, -180],
      [90, 180]
  ],
  zoom: 3
};

function MyMap({ list, activeView }) {


  return (
    <LeafLetMap className="h-100 w-100" {...CONFIG}>
      <TileLayer
        url={TILE_URL}
      />
      {list.map(({country, lat, long, data}) => (
      <Circle
        key={country}
        center={[lat, long]}
        color={activeView.colorHex}
        radius={data}
      >
        <Popup>
          {country} <br/> {data}
        </Popup>
      </Circle>

      ))}
    </LeafLetMap>
  );
}

export default MyMap;