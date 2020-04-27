import React from 'react';
import { TiLocation } from 'react-icons/ti';
import styled from 'styled-components';
import EventType from '../../state/events/EventType';
import getDate from '../../utils/getDate';

export interface EventContentProps {
  event: EventType;
}
const EventContent: React.SFC<EventContentProps> = ({ event }) => {
  const [minutesStart, hoursStart, dayStart, dayNameStart, monthStart] = getDate(event.date);

  return (
    <>
      {Number(new Date(event.createdAt)) > Date.now() - 1000 * 60 * 60 * 24 * 10 ? (
        <NewBadge>nowe</NewBadge>
      ) : null}
      <Header>{event.name}</Header>
      <Location>
        {event.place}
        <TiLocation />
      </Location>
      <DateWrapper>
        <p>{`${dayStart}.${monthStart} ${dayNameStart}`}</p>
        <p>{`${hoursStart}:${minutesStart}`}</p>
      </DateWrapper>
      {event.fbList ? <FbBadge>lista FB</FbBadge> : null}
    </>
  );
};

export default EventContent;

const DateWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  color: ${(props) => props.theme.colors.textPrimary};
  margin-bottom: 5px;
`;
const Header = styled.h2`
  font-size: 30px;
`;
const Location = styled.p`
  font-size: 16px;
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.colors.textPrimary};
`;
const NewBadge = styled.div`
  color: ${(props) => props.theme.colors.textBadge};
  background-color: ${(props) => props.theme.colors.layout};
  padding: 2px;
  position: absolute;
  top: 0;
  right: 0;
`;
const FbBadge = styled.div`
  color: ${(props) => props.theme.colors.textBadge};
  background-color: ${(props) => props.theme.colors.layout};
  padding: 2px;
  position: absolute;
  bottom: 0;
  right: 0;
`;
