import React, {useState} from "react";
import styled from "styled-components";
import ReactMapGL, {Marker} from "react-map-gl";
import {AppState} from "../../../state/allReducers";
import {useSelector} from "react-redux";

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

  const events = useSelector((state: AppState) => state.EventsReducer);

  return (
    <MapContainer>
      <ReactMapGL
        mapStyle="mapbox://styles/pabloplatyna/ck8kll2tu0cpm1io3t5p29ypq"
        {...viewport}
        onViewportChange={setViewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      >
        {events.map(({_id, coordinates}) => (
          <Marker
            key={_id}
            latitude={coordinates.latitude}
            longitude={coordinates.longitude}
            offsetLeft={-10}
            offsetTop={-10}
          >
            <div
              style={{width: "20px", height: "20px", backgroundColor: "red"}}
            ></div>
          </Marker>
        ))}
      </ReactMapGL>
    </MapContainer>
  );
};

export default Map;

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px;
`;
