import React from "react";
import Filters from "./filters/Filters";
import EventItem from "./eventItem/EventItem";
import styled from "styled-components";
import {useSelector} from "react-redux";
import {AppState} from "../../../state/allReducers";

export interface EventsProps {}

const Events: React.SFC<EventsProps> = () => {
  const events = useSelector((state: AppState) => state.EventsReducer);

  return (
    <EventsContainer>
      <Filters />
      <EventsList>
        {events.map((event) => (
          <EventItem key={event._id} event={event} />
        ))}
      </EventsList>
    </EventsContainer>
  );
};

export default Events;

const EventsContainer = styled.div``;
const EventsList = styled.div`
  overflow-y: scroll;
  height: calc(100% - 70px);
  &::-webkit-scrollbar {
    width: 3px;
  }
  &::-webkit-scrollbar-track {
    /* box-shadow: inset 0 0 6px gray; */
  }
  &::-webkit-scrollbar-thumb {
    background-color: gray;
    outline: 1px solid gray;
  }
`;
