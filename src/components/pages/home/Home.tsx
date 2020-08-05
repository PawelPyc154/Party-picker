import React, { useContext } from 'react';
import styled from 'styled-components';
import { FilterContext } from '../../context/GetAndFilterEvents';
import Loading from '../../universal/Loading';
import Event from './event/Event';
import Filters from './filters/Filters';

export interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
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
          eventsFiltered.map((item) => <Event key={item._id} event={item} />)
        ) : (
          <Loading marginMobile="40px 0" />
        )}
      </Events>
    </HomeContainer>
  );
};

export default Home;

const HomeContainer = styled.main``;

const Events = styled.div`
  padding-bottom: 10px;
  min-height: calc(100vh - 55px);
  ${({ theme }) => theme.mq.md} {
    margin: 0 5px;
    overflow-y: scroll;
    height: calc(100% - 70px);
    min-height: initial;
    &::-webkit-scrollbar {
      width: 3px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: ${(props) => props.theme.colors.scrollbarThumb};
      outline: 1px solid ${(props) => props.theme.colors.scrollbarThumb};
    }
  }
`;
