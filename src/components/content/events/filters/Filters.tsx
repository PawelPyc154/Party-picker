import React from "react";
import styled from "styled-components";

export interface FiltersProps {}

const Filters: React.SFC<FiltersProps> = () => {
  return <FiltersContainer>filters and sort </FiltersContainer>;
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
`;
