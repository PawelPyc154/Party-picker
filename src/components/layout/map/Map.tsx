import { motion } from 'framer-motion';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { TiLocation } from 'react-icons/ti';
import ReactMapGL, { FullscreenControl, Marker } from 'react-map-gl';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { FilterContext } from '../../../context/GetAndFilterEvents';
import { AppState } from '../../../state/allReducers';
import { setCoordinates } from '../../../state/positionAddEvent/action';
import media from '../../../utils/MediaQueries';
import EventContent from '../../universal/EventContent';

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
  }, []);

  const { eventsFiltered } = useContext(FilterContext);

  // set position add event
  const { longitude, latitude } = useSelector((state: AppState) => state.PositionAddEventReducer);
  const dispatch = useDispatch();
  const setPositionAddEvent = ([long, lat]: number[]) => {
    if (location.pathname !== '/add-event' && location.pathname.slice(0, 13) !== '/update-event') return;
    dispatch(setCoordinates(long, lat));
  };

  const isEventUpdated = (eventId: string) => location.pathname.slice(14, 14 + 24) === eventId;

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
        {eventsFiltered.map((item) => (
          <MarkerStyled
            key={item._id}
            latitude={item.coordinates.latitude}
            longitude={item.coordinates.longitude}
            offsetLeft={-25}
            offsetTop={-50}
            className={isEventUpdated(item._id) ? 'hidden' : ''}
          >
            <MarkerLinkWrapper
              animate={
                location.pathname.slice(0, 7) === '/events' && location.pathname.slice(8, 32) === item._id
                  ? 'animate'
                  : 'noAnimate'
              }
              variants={{
                animate: {
                  scale: [1, 1.5, 1.5, 1, 1],
                  transition: { duration: 1, loop: Infinity, ease: 'easeInOut', times: [0, 0.2, 0.5, 0.8, 1] },
                },
                noAnimate: {
                  scale: 1,
                  transition: { duration: 1 },
                },
              }}
            >
              <Link to={`/events/${item._id}`}>
                <TiLocationStyled />
              </Link>
            </MarkerLinkWrapper>

            <MarkerInfo className="markerInfo">
              <EventContent event={item} />
            </MarkerInfo>
          </MarkerStyled>
        ))}

        {(location.pathname === '/add-event' || location.pathname.slice(0, 13) === '/update-event') &&
        latitude &&
        longitude ? (
          <Marker
            draggable
            latitude={latitude}
            longitude={longitude}
            offsetLeft={-25}
            offsetTop={-50}
            onDragEnd={(e) => setPositionAddEvent(e.lngLat)}
          >
            <TiLocationStyled className="addEvent" />
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
  display: none;
  ${media.tablet} {
    display: block;
  }
`;
const MarkerStyled = styled(Marker)`
  z-index: 0;
  &&.hidden {
    display: none;
  }
  &:hover {
    z-index: 20;
  }
`;
const MarkerLinkWrapper = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover ~ .markerInfo {
    opacity: 1;
  }
`;

const TiLocationStyled = styled(TiLocation)`
  font-size: 50px;
  color: ${(props) => props.theme.colors.map.marker};
  &.addEvent {
    color: ${(props) => props.theme.colors.map.markerAddEvent};
  }
`;

const MarkerInfo = styled.div`
  width: 200px;
  height: 150px;
  position: absolute;
  top: -160px;
  left: -80px;
  background-color: ${(props) => props.theme.colors.backgroundSecondary};
  pointer-events: none;
  opacity: 0;
  z-index: 100;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  overflow: hidden;
`;
