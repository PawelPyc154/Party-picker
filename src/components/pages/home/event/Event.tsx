import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { AppState } from '../../../../state/allReducers';
import EventType from '../../../../state/events/EventType';
import media from '../../../../utils/MediaQueries';
import EventContent from '../../../universalComponents/EventContent';
import DeleteButton from './deleteButton/DeleteButton';

export interface EventProps {
  event: EventType;
}
const Event: React.FC<EventProps> = ({ event }) => {
  const { user } = useSelector((state: AppState) => state.AuthReducer);

  return (
    <EventContainer>
      {user?._id === event.user._id ? <DeleteButton eventId={event._id} /> : null}
      <EventContent event={event} />
    </EventContainer>
  );
};

export default Event;

const EventContainer = styled.section`
  height: 200px;
  background-color: ${(props) => props.theme.colors.backgroundSecondary};
  border: 1px solid ${(props) => props.theme.colors.layout};
  color: ${(props) => props.theme.colors.textSecondary};
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
