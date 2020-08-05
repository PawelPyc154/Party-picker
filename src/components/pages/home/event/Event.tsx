import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { AppState } from '../../../../state/allReducers';
import EventType from '../../../../state/events/EventType';
import DeleteEventButton from '../../../universal/DeleteEventButton';
import EventContent from '../../../universal/EventContent';
import UpdateEventLink from '../../../universal/UpdateEventLink';
import ViewEvent from './viewEvent/ViewEvent';

export interface EventProps {
  event: EventType;
}

const Event: React.FC<EventProps> = ({ event }) => {
  const { user } = useSelector((state: AppState) => state.AuthReducer);
  return (
    <EventContainer>
      <ViewEvent eventId={event._id} />
      {user?._id === event.user._id ? <UpdateEventLink eventId={event._id} /> : null}
      {user?._id === event.user._id ? <DeleteEventButton eventId={event._id} /> : null}
      <EventContent event={event} />
    </EventContainer>
  );
};

export default Event;

const EventContainer = styled.section`
  border: 1px solid ${(props) => props.theme.colors.layout};
  background-color: ${(props) => props.theme.colors.backgroundSecondary};
  color: ${(props) => props.theme.colors.textSecondary};
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  height: 200px;
  margin: 15px 0;
  ${({ theme }) => theme.mq.md} {
    height: 150px;
    margin: 15px 5px 15px 0;
  }
`;
