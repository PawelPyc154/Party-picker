import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { AppState } from '../../../state/allReducers';
import DeleteEventButton from '../../shared/DeleteEventButton';
import EventContent from '../../shared/EventContent';
import UpdateEventLink from '../../shared/UpdateEventLink';
import BackLink from './backLink/BackLink';

export interface EventViewProps {}

const EventView: React.FC<EventViewProps> = () => {
  const { eventId } = useParams();
  const events = useSelector((state: AppState) => state.EventsReducer);
  const event = events.find((item) => item._id === eventId);
  const { user } = useSelector((state: AppState) => state.AuthReducer);

  return (
    <EventViewContainer>
      {event ? (
        <ContentWraper>
          <BackLink />
          {user?._id === event?.user._id ? <UpdateEventLink eventId={event?._id} /> : null}
          {user?._id === event?.user._id ? <DeleteEventButton eventId={event?._id} /> : null}

          <Header>
            <EventContent event={event} />
          </Header>
          <Describe>{event?.describe || 'To wydarzenie nie posiada opisu.'}</Describe>
          {event.image ? <Image src={event.image} alt="" /> : null}
        </ContentWraper>
      ) : null}
    </EventViewContainer>
  );
};

export default EventView;

const EventViewContainer = styled.main`
  margin-top: 10px;
  background-color: ${(props) => props.theme.colors.backgroundSecondary};
  padding: 5px;
  height: 100%;
  ${({ theme }) => theme.mq.md} {
    padding-bottom: 15px;
    min-height: 100%;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      width: 3px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: ${(props) => props.theme.colors.scrollbarThumb};
      outline: 1px solid ${(props) => props.theme.colors.scrollbarThumb};
    }
  }
`;

const ContentWraper = styled.section`
  background-color: ${(props) => props.theme.colors.backgroundSecondary};
  padding: 5px;
  border: 1px solid ${(props) => props.theme.colors.layout};
  position: relative;
  ${({ theme }) => theme.mq.md} {
    min-height: 100%;
  }
`;

const Header = styled.header`
  background-color: ${(props) => props.theme.colors.backgroundSecondary};
  color: ${(props) => props.theme.colors.textSecondary};
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  height: 200px;
  ${({ theme }) => theme.mq.md} {
    height: 150px;
  }
`;

const Describe = styled.article`
  background-color: ${(props) => props.theme.colors.backgroundSecondary};
  color: ${(props) => props.theme.colors.textPrimary};
  text-align: center;
  overflow-wrap: anywhere;
  margin: 0px 5px 25px;
  ${({ theme }) => theme.mq.md} {
    padding: 0 5px;
  }
`;

const Image = styled.img`
  background-color: ${(props) => props.theme.colors.backgroundPrimary};
  width: 100%;
  cursor: pointer;
  height: 100%;
`;
