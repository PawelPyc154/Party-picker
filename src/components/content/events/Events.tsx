import React, {useContext} from "react";
import Filters from "./filters/Filters";
import EventItem from "./eventItem/EventItem";
import styled from "styled-components";

import media from "../../../utils/MediaQueries";
import {FilterContext} from "../../context/GetAndFilterEvents";

export interface EventsProps {}

const Events: React.SFC<EventsProps> = () => {
  // const events = useSelector((state: AppState) => state.EventsReducer);
  const {eventsFiltered} = useContext(FilterContext);

  return (
    <EventsContainer>
      <Filters />
      <EventsList>
        {eventsFiltered.map((event) => (
          <EventItem key={event._id} event={event} />
        ))}
      </EventsList>
    </EventsContainer>
  );
};

export default Events;

const EventsContainer = styled.div`
  ${media.tablet} {
    order: -1;
  }
`;
const EventsList = styled.div`
  padding-bottom: 10px;
  min-height: calc(100vh - 55px);
  ${media.tablet} {
    min-height: initial;
  }
  ${media.tablet} {
    margin: 0 5px;
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
  }
`;
