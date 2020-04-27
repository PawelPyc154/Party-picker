import React, { useContext } from 'react';
import styled from 'styled-components';
import { FilterContext } from '../../../../../../context/GetAndFilterEvents';

export interface SearchByNameProps {}

const SearchByName: React.FC<SearchByNameProps> = () => {
  const { filters, handleChangeFilters } = useContext(FilterContext);

  return (
    <SearchInput
      placeholder="Nazwa"
      value={filters.name}
      onChange={(e) => handleChangeFilters(e.target.value, 'name')}
      type="text"
    />
  );
};

export default SearchByName;

const SearchInput = styled.input`
  background: ${(props) => props.theme.colors.backgroundSecondary};
  color: ${(props) => props.theme.colors.textSecondary};
  border: 1px solid ${(props) => props.theme.colors.layout};
  height: 35px;
  font-size: 20px;
  width: 100%;
  padding: 5px;
  &:hover,
  &:focus {
    border: 1px solid ${(props) => props.theme.colors.hover};
  }
`;
