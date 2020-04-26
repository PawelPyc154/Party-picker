import Tooltip from '@material-ui/core/Tooltip';
import React, { useContext } from 'react';
import { IoIosAdd, IoMdOptions } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FilterContext } from '../../../../../context/GetAndFilterEvents';
import { AppState } from '../../../../../state/allReducers';

export interface FiltersHeaderProps {
  openFilterOptions: boolean;
  handleOpenFilterOptions: () => void;
}

const FiltersHeader: React.FC<FiltersHeaderProps> = ({
  openFilterOptions,
  handleOpenFilterOptions,
}) => {
  const { user } = useSelector((state: AppState) => state.AuthReducer);
  const { eventsFiltered, filters, handleChangeFilters, handleChangeDate } = useContext(
    FilterContext,
  );

  return (
    <>
      <Wraper>
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
      </Wraper>
      <Wraper>
        {user ? (
          <Tooltip title="Add event" aria-label="add event">
            <LinkUser to="/add-event">
              <IoIosAddStyled />
            </LinkUser>
          </Tooltip>
        ) : null}
        {openFilterOptions ? (
          <Count>
            Count:
            {eventsFiltered.length}
          </Count>
        ) : null}

        <Button
          onClick={() => handleOpenFilterOptions()}
          style={openFilterOptions ? { border: '1px solid white', color: 'white' } : {}}
        >
          <IoMdOptionsStyled style={openFilterOptions ? { color: 'white' } : {}} />
          Filtry
        </Button>
      </Wraper>
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

const Button = styled.button`
  justify-self: flex-end;
  background-color: transparent;
  border: 1px solid #3498db;
  border-radius: 0;
  height: 35px;
  padding: 5px;
  color: #3498db;
  margin: 0 5px 0 5px;
  display: flex;
  align-items: center;
  cursor: pointer;
  &:hover {
    border: 1px solid white;
    color: white;
  }
`;
const LinkUser = styled(Link)`
  border: none;
  color: #3498db;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  &:hover {
    color: white;
  }
`;

const IoIosAddStyled = styled(IoIosAdd)`
  font-size: 30px;
`;
const Wraper = styled.div`
  display: flex;
  align-items: center;
`;
