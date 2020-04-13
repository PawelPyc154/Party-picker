import React, { useContext } from 'react';
import styled from 'styled-components';
import { IoMdOptions } from 'react-icons/io';
import { FilterContext } from '../../../../getAndFilterEvent/GetAndFilterEvents';
import { Button } from '../../../../../../styledComponents';

export interface FiltersHeaderProps {
  openFilterOptions: boolean;
  handleOpenFilterOptions: () => void;
}

const FiltersHeader: React.SFC<FiltersHeaderProps> = ({
  openFilterOptions,
  handleOpenFilterOptions,
}) => {
  const { eventsFiltered, filters, handleChangeFilters, handleChangeDate } = useContext(
    FilterContext,
  );

  return (
    <>
      {filters.name ? (
        <Badge onClick={() => handleChangeFilters(filters.name, 'name')}>
          {filters.name}
          ...
        </Badge>
      ) : null}

      {filters.province ? (
        <Badge onClick={() => handleChangeFilters(filters.province, 'province')}>
          {filters.province}
        </Badge>
      ) : null}

      {filters.timeFromTo[0] !== 7 * 24 * 2 || filters.timeFromTo[1] !== 38 * 24 * 2 ? (
        <Badge onClick={() => handleChangeDate({}, [7 * 24 * 2, 38 * 24 * 2])}>data filter</Badge>
      ) : null}

      {openFilterOptions ? (
        <Count style={{ marginLeft: 'auto' }}>
          Count:
          {eventsFiltered.length}
        </Count>
      ) : null}

      <Button
        onClick={() => handleOpenFilterOptions()}
        style={
          openFilterOptions
            ? { border: '1px solid white', color: 'white', margin: '0 5px 0 5px' }
            : { margin: '0 5px 0 auto' }
        }
      >
        <IoMdOptionsStyled style={openFilterOptions ? { color: 'white' } : {}} />
        Filtry
      </Button>
    </>
  );
};

export default FiltersHeader;

const IoMdOptionsStyled = styled(IoMdOptions)`
  font-size: 20px;
  margin-right: 7px;
`;

const Badge = styled.button`
  background-color: transparent;
  border: 1px solid #3498db;
  border-radius: 0;
  height: 35px;
  padding: 5px;
  color: #3498db;
  margin: 0 5px;
  display: flex;
  align-items: center;
  letter-spacing: 1px;
  cursor: pointer;
  &:hover {
    border: 1px solid #e74c3c;
    color: #e74c3c;
  }
`;
const Count = styled.div`
  height: 35px;
  padding: 5px;
  color: white;
  margin: 0 5px;
  display: flex;
  align-items: center;
  letter-spacing: 1px;
`;
