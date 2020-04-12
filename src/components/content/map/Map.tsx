import React, { useState, useEffect, useRef, useContext } from 'react';
import styled from 'styled-components';
import ReactMapGL, { Marker, FullscreenControl } from 'react-map-gl';
import { FaOdnoklassniki } from 'react-icons/fa';
import { FilterContext } from '../../context/GetAndFilterEvents';

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
    width: '100%',
    height: '100%',
    zoom: 5.7,
  });

  // Flex map
  useEffect(() => {
    const handleResize = () => setViewport((prev) => ({ ...prev, width: '100%', height: '100%' }));
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  const { eventsFiltered } = useContext(FilterContext);

  return (
    <MapContainer ref={container}>
      <ReactMapGL
        mapStyle="mapbox://styles/pabloplatyna/ck8ut7ofi1acd1irlfikzj4qd"
        {...viewport}
        onViewportChange={setViewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      >
        <FullscreenControlWrapper>
          <FullscreenControl />
        </FullscreenControlWrapper>
        {eventsFiltered.map(({ _id, coordinates }) => (
          <MarkerStyled
            key={_id}
            latitude={coordinates.latitude}
            longitude={coordinates.longitude}
            offsetLeft={-10}
            offsetTop={-10}
          >
            <MarkerContent className="markerContent">
              <FaOdnoklassnikiStyled />
            </MarkerContent>
            <MarkerInfo className="markerInfo">y</MarkerInfo>
          </MarkerStyled>
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
const MarkerStyled = styled(Marker)`
  z-index: 0;
  &:hover {
    z-index: 20;
  }
`;
const MarkerContent = styled.div`
  width: 40px;
  height: 40px;
  background-color: #f1c40f;
  border-radius: 20px;
  display: flex;
  align-items: center;
  &:hover {
    border: 3px solid white;
  }
  &:hover ~ .markerInfo {
    opacity: 1;
  }
`;

const FaOdnoklassnikiStyled = styled(FaOdnoklassniki)`
  font-size: 30px;
  color: black;
  margin-right: 7px;
  transform: translateX(5px);
`;
const MarkerInfo = styled.div`
  border: 1px solid #3498db;
  width: 200px;
  height: 150px;
  position: absolute;
  top: -160px;
  left: -80px;
  background-color: #181818;
  pointer-events: none;
  opacity: 0;
  z-index: 10000;
`;
