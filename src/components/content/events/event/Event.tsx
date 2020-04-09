import React from "react";
import styled from "styled-components";

export interface EventProps {
  event: {id: number};
}

const Event: React.SFC<EventProps> = ({event}) => {
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

export default Event;

const EventContainer = styled.div`
  height: 150px;
  border-bottom: 1px solid #3498db;
  border-top: 1px solid #3498db;
  border: 1px solid #3498db;
  margin: 15px 5px;
  color: #3498db;
`;
