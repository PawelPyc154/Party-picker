import React, { useContext } from 'react';
import styled from 'styled-components';
import Filters from './filters/Filters';
import Event from './event/Event';

import media from '../../../../utils/MediaQueries';
import { FilterContext } from '../../../context/GetAndFilterEvents';

export interface HomeProps {}

const Home: React.SFC<HomeProps> = () => {
  // const events = useSelector((state: AppState) => state.EventsReducer);
  const { eventsFiltered } = useContext(FilterContext);

  return (
    <HomeContainer>
      <Filters />
      <Events>
        {eventsFiltered.map((event) => (
          <Event key={event._id} event={event} />
        ))}
      </Events>
    </HomeContainer>
  );
};

export default Home;

const HomeContainer = styled.div`
  ${media.tablet} {
    order: -1;
  }
`;

const Events = styled.div`
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
