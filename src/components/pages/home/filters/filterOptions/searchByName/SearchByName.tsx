import React, { useContext } from 'react';
import { FilterContext } from '../../../../../context/GetAndFilterEvents';
import Input from '../../../../../universal/Input';

export interface SearchByNameProps {}

const SearchByName: React.FC<SearchByNameProps> = () => {
  const { filters, handleChangeFilters } = useContext(FilterContext);

  return (
    <Input
      placeholder="Nazwa"
      value={filters.name}
      onChange={(e) => handleChangeFilters(e.target.value, 'name')}
      type="text"
      margin="0"
    />
  );
};

export default SearchByName;
