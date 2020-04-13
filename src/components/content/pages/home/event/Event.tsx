import React from 'react';
import styled from 'styled-components';
import EventType from '../../../../../state/events/EventType';
import media from '../../../../../utils/MediaQueries';
import getDate from '../../../../../utils/getDate';

export interface EventProps {
  event: EventType;
}

const Event: React.SFC<EventProps> = ({ event }) => (
  <EventContainer>
    <h2>{event.name}</h2>
    <p>{getDate(event.time.start)}</p>
    <p>{getDate(event.time.end)}</p>
    <p>lokalizacja</p>
    <p>lista fb</p>
    <div>nowe</div>
  </EventContainer>
);

export default Event;

const EventContainer = styled.div`
  height: 120px;
  border-bottom: 1px solid #3498db;
  border-top: 1px solid #3498db;
  border: 1px solid #3498db;
  color: #3498db;
  margin: 15px 0;

  ${media.tablet} {
    margin: 15px 5px 15px 0;
  }
`;
