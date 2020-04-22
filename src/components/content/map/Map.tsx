import React, { useState, useEffect, useRef, useContext } from 'react';
import styled from 'styled-components';
import ReactMapGL, { Marker, FullscreenControl } from 'react-map-gl';
import { FaOdnoklassniki } from 'react-icons/fa';
import { TiLocation } from 'react-icons/ti';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { FilterContext } from '../getAndFilterEvent/GetAndFilterEvents';
import media from '../../../utils/MediaQueries';
import EventContent from '../../universalComponents/EventContent';
import { setCoordinates } from '../../../state/positionAddEvent/action';

import { AppState } from '../../../state/allReducers';

export interface MapProps {}
interface Viewport {
  longitude: number;
  latitude: number;
  width: string | number;
  height: string | number;
  zoom: number;
}

const Map: React.SFC<MapProps> = () => {
  const location = useLocation();
  const container = useRef<HTMLDivElement>(null);
  const [viewport, setViewport] = useState<Viewport>({
    longitude: 19,
    latitude: 52,
    width: '100%',
    height: '100%',
    zoom: 5.7,
  });

  // resize map
  useEffect(() => {
    const handleResize = () => setViewport((prev) => ({ ...prev, width: '100%', height: '100%' }));
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  const { eventsFiltered } = useContext(FilterContext);

  // set position add event
  const { longitude, latitude } = useSelector((state: AppState) => state.PositionAddEventReducer);
  const dispatch = useDispatch();
  const setPositionAddEvent = ([long, lat]: number[]) => {
    if (location.pathname === '/add-event') {
      dispatch(setCoordinates(long, lat));
    }
  };
  return (
    <MapContainer ref={container}>
      <ReactMapGL
        mapStyle="mapbox://styles/pabloplatyna/ck8ut7ofi1acd1irlfikzj4qd"
        {...viewport}
        onViewportChange={setViewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onClick={(e) => setPositionAddEvent(e.lngLat)}
      >
        <FullscreenControlWrapper>
          <FullscreenControl />
        </FullscreenControlWrapper>
        {eventsFiltered.map((event) => (
          <MarkerStyled
            key={event._id}
            latitude={event.coordinates.latitude}
            longitude={event.coordinates.longitude}
            offsetLeft={-20}
            offsetTop={-30}
          >
            <MarkerContent className="markerContent">
              <FaOdnoklassnikiStyled />
            </MarkerContent>
            <MarkerInfo className="markerInfo">
              <EventContent event={event} />
            </MarkerInfo>
          </MarkerStyled>
        ))}

        {location.pathname === '/add-event' && latitude && longitude ? (
          <Marker
            draggable
            latitude={latitude}
            longitude={longitude}
            offsetLeft={-25}
            offsetTop={-50}
            onDragEnd={(e) => setPositionAddEvent(e.lngLat)}
          >
            <TiLocationStyled />
          </Marker>
        ) : null}
      </ReactMapGL>
    </MapContainer>
  );
};

export default Map;

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
  ${media.tablet} {
    order: 1;
  }
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
  justify-content: center;
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

  /* transform: translateX(5px); */
`;
const TiLocationStyled = styled(TiLocation)`
  font-size: 50px;
  color: #3498db;

  /* transform: translateX(5px); */
`;
const MarkerInfo = styled.div`
  /* border: 1px solid #3498db; */
  width: 200px;
  height: 150px;
  position: absolute;
  top: -160px;
  left: -80px;
  background-color: #181818;
  pointer-events: none;
  opacity: 0;
  z-index: 100;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 5px;
  overflow: hidden;
`;
