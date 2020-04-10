import React from "react";
import styled from "styled-components";
import Event from "../../../../state/events/Event";
import media from "../../../../utils/MediaQueries";
export interface EventItemProps {
  event: Event;
}

const EventItem: React.SFC<EventItemProps> = ({event}) => {
  return (
    <EventItemContainer>
      <h2>Title</h2>
      <p>data </p>
      <p>godzina</p>
      <p>lokalizacja</p>
      <p>lista fb</p>
      <div>nowe</div>
    </EventItemContainer>
  );
};

export default EventItem;

const EventItemContainer = styled.div`
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
