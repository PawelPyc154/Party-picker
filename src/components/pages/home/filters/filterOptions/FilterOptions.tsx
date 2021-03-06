import { motion } from 'framer-motion';
import React from 'react';
import styled from 'styled-components';
import SearchByDate from './searchByDate/SearchByDate';
import SearchByName from './searchByName/SearchByName';
import SearchByProvince from './searchByProvince/SearchByProvince';

export interface FilterOptionsProps {
  openFilterOptions: boolean;
}

const FilterOptions: React.FC<FilterOptionsProps> = ({ openFilterOptions }) => {
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
  background-color: ${({ theme }) => theme.colors.backgroundSecondary};
  width: calc(100% + 4px);
  top: 49px;
  left: -2px;
  transform: translateX(calc(-100% - 10px));
  padding: 10px 5px;
  border: 1px solid ${({ theme }) => theme.colors.borderPrimary};
  border-top: none;
  z-index: ${({ theme }) => theme.zIndex.level6};
  ${({ theme }) => theme.mq.md} {
    height: calc(100vh - 110px);
  }
`;
