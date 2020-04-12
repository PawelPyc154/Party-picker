import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import media from '../../../../../utils/MediaQueries';

import SearchByName from './searchByName/SearchByName';
import SearchByProvince from './searchByProvince/SearchByProvince';
import SearchByDate from './searchByDate/SearchByDate';

export interface FilterOptionsProps {
  openFilterOptions: boolean;
}

const FilterOptions: React.SFC<FilterOptionsProps> = ({ openFilterOptions }) => {
  const variants = {
    open: {
      x: 0,
      transition: { ease: 'linear' },
    },
    close: {
      x: 'calc(-100% - 10px)',
      transition: { ease: 'linear' },
    },
  };

  return (
    <FilterOptionsWrapper animate={openFilterOptions ? 'open' : 'close'} variants={variants}>
      <SearchByName />
      <SearchByProvince />
      <SearchByDate />
    </FilterOptionsWrapper>
  );
};

export default FilterOptions;

const FilterOptionsWrapper = styled(motion.div)`
  position: absolute;
  background-color: #202020;
  height: calc(100vh - 55px);
  width: calc(100% + 4px);
  top: 49px;
  left: -2px;
  transform: translateX(calc(-100% - 10px));
  padding: 10px 5px;
  ${media.tablet} {
    height: calc(100vh - 110px);
  }
`;
