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
      <Wraper>
        <DateWrapper>
          <span>{`${dayStart}.${monthStart} ${dayNameStart} ${hoursStart}`}</span>
          <Sup>{minutesStart}</Sup>
        </DateWrapper>
      </Wraper>
      <Header>{event.name}</Header>
      <Location>
        {event.place}
        <TiLocation />
      </Location>
    </>
  );
};

export default EventContent;

const Header = styled.h2`
  font-size: 30px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-transform: capitalize;
`;
const Location = styled.p`
  font-size: 16px;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.textPrimary};
`;
const Wraper = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  right: 0;
  align-items: center;
`;

const DateWrapper = styled.div`
  display: flex;
  padding: 2px;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 5px;
`;

const Sup = styled.span`
  font-size: 12px;
`;
