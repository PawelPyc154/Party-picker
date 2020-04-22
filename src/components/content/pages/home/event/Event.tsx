import React from 'react';
import styled from 'styled-components';

import EventType from '../../../../../state/events/EventType';
import media from '../../../../../utils/MediaQueries';
import EventContent from '../../../../universalComponents/EventContent';

export interface EventProps {
  event: EventType;
}
const Event: React.SFC<EventProps> = ({ event }) => (
  <EventContainer>
    <EventContent event={event} />
  </EventContainer>
);

export default Event;

const EventContainer = styled.section`
  height: 200px;

  background-color: #202020;
  border: 1px solid #3498db;
  color: #3498db;
  margin: 15px 0;
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: space-evenly;
  align-items: center;
  overflow: hidden;
  ${media.tablet} {
    margin: 15px 5px 15px 0;
    height: 150px;
  }
`;