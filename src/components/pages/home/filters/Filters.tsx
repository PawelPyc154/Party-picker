import React, { useRef, useState } from 'react';
import Scroll from 'react-scroll';
import styled from 'styled-components';
import FilterOptions from './filterOptions/FilterOptions';
import FiltersHeader from './filtersHeader/FiltersHeader';

export interface FiltersProps {}

const Filters: React.FC<FiltersProps> = () => {
  const [openFilterOptions, setOpenFilterOptions] = useState(false);

  // Animation scroll and open filter
  const container = useRef<HTMLDivElement>(null);
  const handleOpenFilterOptions = () => {
    if (!openFilterOptions) {
      Scroll.animateScroll.scrollTo(container.current ? container.current.offsetTop - 55 : 0);
    }
    setOpenFilterOptions((prevState) => !prevState);
  };

  return (
    <FiltersContainer ref={container}>
      <FiltersHeader openFilterOptions={openFilterOptions} handleOpenFilterOptions={handleOpenFilterOptions} />
      <FilterOptions openFilterOptions={openFilterOptions} />
    </FiltersContainer>
  );
};

export default Filters;

const FiltersContainer = styled.section`
  width: 100%;
  height: 50px;
  background-color: ${({ theme }) => theme.colors.backgroundSecondary};
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid ${({ theme }) => theme.colors.borderPrimary};
  margin-top: 10px;
  position: relative;
  z-index: ${({ theme }) => theme.zIndex.level6};
`;
