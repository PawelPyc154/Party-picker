import React, {useContext} from "react";
import {FilterContext} from "../../../../../context/GetAndFilterEvents";
import styled from "styled-components";

export interface SearchByNameProps {}

const SearchByName: React.SFC<SearchByNameProps> = () => {
  const {filters, handleChangeFilters} = useContext(FilterContext);

  return (
    <SearchInput
      placeholder="Nazwa"
      value={filters.name}
      onChange={(e) => handleChangeFilters(e.target.value, "name")}
      type="text"
    />
  );
};

export default SearchByName;

const SearchInput = styled.input`
  background-color: #181818;
  color: #3498db;
  border: 1px solid #3498db;

  height: 35px;
  font-size: 20px;
  width: 100%;
  padding: 5px;
`;
