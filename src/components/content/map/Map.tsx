import React, {useState} from "react";
import styled from "styled-components";
import ReactMapGL from "react-map-gl";
export interface MapProps {}
interface Viewport {
  longitude: number;
  latitude: number;
  width: string | number;
  height: string | number;
  zoom: number;
}
const Map: React.SFC<MapProps> = () => {
  const [viewport, setViewport] = useState<Viewport>({
    longitude: 19,
    latitude: 52,
    width: "100%",
    height: "100%",
    zoom: 6,
  });

  return (
    <MapContainer>
      <ReactMapGL
        mapStyle="mapbox://styles/pabloplatyna/ck8kll2tu0cpm1io3t5p29ypq"
        {...viewport}
        onViewportChange={setViewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onClick={(e) => console.log(e.lngLat)}
      />
    </MapContainer>
  );
};

export default Map;

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px;
`;
