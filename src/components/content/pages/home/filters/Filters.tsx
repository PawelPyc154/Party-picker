import React, { useState, useRef } from 'react';
import styled from 'styled-components';

import Scroll from 'react-scroll';

import FilterOptions from './filterOptions/FilterOptions';
import FiltersHeader from './filtersHeader/FiltersHeader';

export interface FiltersProps {}

const Filters: React.SFC<FiltersProps> = () => {
  const [openFilterOptions, setOpenFilterOptions] = useState(true);

  // Animation scroll and open filter
  const container = useRef<HTMLDivElement>(null);
  const handleOpenFilterOptions = () => {
    if (!openFilterOptions) {
      Scroll.animateScroll.scrollTo(container.current ? container.current.offsetTop - 5 : 0);
    }
    setOpenFilterOptions((prevState) => !prevState);
  };

  return (
    <FiltersContainer ref={container}>
      <FiltersHeader
        openFilterOptions={openFilterOptions}
        handleOpenFilterOptions={handleOpenFilterOptions}
      />
      <FilterOptions openFilterOptions={openFilterOptions} />
    </FiltersContainer>
  );
};

export default Filters;

const FiltersContainer = styled.div`
  width: 100%;
  height: 50px;
  background-color: #202020;
  display: flex;
  align-items: center;
  border: 1px solid #313131;
  margin-top: 10px;
  position: relative;
`;