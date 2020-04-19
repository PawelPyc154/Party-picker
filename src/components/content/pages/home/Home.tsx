import React, { useContext } from 'react';
import styled from 'styled-components';

import Filters from './filters/Filters';
import Event from './event/Event';

import media from '../../../../utils/MediaQueries';
import { FilterContext } from '../../getAndFilterEvent/GetAndFilterEvents';
import Loading from '../../../universalComponents/Loading';

export interface HomeProps {}

const Home: React.SFC<HomeProps> = () => {
  const { eventsFiltered, filters, initialTimeFromTo } = useContext(FilterContext);

  return (
    <HomeContainer>
      <Filters />
      <Events>
        {eventsFiltered.length ||
        filters.name !== '' ||
        filters.province !== '' ||
        filters.timeFromTo[0] !== initialTimeFromTo[0] ||
        filters.timeFromTo[1] !== initialTimeFromTo[1] ? (
          eventsFiltered.map((event) => <Event key={event._id} event={event} />)
        ) : (
          <Loading />
        )}
      </Events>
    </HomeContainer>
  );
};

export default Home;

const HomeContainer = styled.div``;

const Events = styled.div`
  padding-bottom: 10px;
  min-height: calc(100vh - 55px);

  ${media.tablet} {
    margin: 0 5px;
    overflow-y: scroll;
    height: calc(100% - 70px);
    min-height: initial;
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
