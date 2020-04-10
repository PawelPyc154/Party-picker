import React, {useState, useEffect, useRef} from "react";
import styled from "styled-components";
import ReactMapGL, {
  Marker,
  FullscreenControl,
  GeolocateControl,
} from "react-map-gl";
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
  const container = useRef<HTMLDivElement>(null);
  const [viewport, setViewport] = useState<Viewport>({
    longitude: 19,
    latitude: 52,
    width: "100%",
    height: "100%",
    zoom: 6,
  });

  // Flex map
  useEffect(() => {
    const handleResize = () =>
      setViewport((prev) => ({...prev, width: "100%", height: "100%"}));
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  const events = useSelector((state: AppState) => state.EventsReducer);

  return (
    <MapContainer ref={container}>
      <ReactMapGL
        mapStyle="mapbox://styles/pabloplatyna/ck8kll2tu0cpm1io3t5p29ypq"
        {...viewport}
        onViewportChange={setViewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      >
        <FullscreenControlWrapper>
          <FullscreenControl />
        </FullscreenControlWrapper>
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
`;
const FullscreenControlWrapper = styled.div`
  position: absolute;
  right: 10px;
  bottom: 30px;
`;
