import React from "react";
import styled from "styled-components";
import Event from "../../../../state/events/Event";
export interface EventItemProps {
  event: Event;
}

const EventItem: React.SFC<EventItemProps> = ({event}) => {
  return (
    <EventContainer>
      <h2>Title</h2>
      <p>data </p>
      <p>godzina</p>
      <p>lokalizacja</p>
      <p>lista fb</p>
      <div>nowe</div>
    </EventContainer>
  );
};

export default EventItem;

const EventContainer = styled.div`
  height: 150px;
  border-bottom: 1px solid #3498db;
  border-top: 1px solid #3498db;
  border: 1px solid #3498db;
  margin: 15px 10px 15px 5px;
  color: #3498db;
`;
