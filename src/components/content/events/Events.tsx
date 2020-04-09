import React from "react";
import Filters from "./filters/Filters";
import Event from "./event/Event";
import styled from "styled-components";

export interface EventsProps {}

const Events: React.SFC<EventsProps> = () => {
  const events = [{id: 1}, {id: 2}];

  return (
    <EventsContainer>
      <Filters />
      <EventsList>
        {events.map((event) => (
          <Event key={event.id} event={event} />
        ))}
      </EventsList>
    </EventsContainer>
  );
};

export default Events;

const EventsContainer = styled.div``;
const EventsList = styled.div``;
