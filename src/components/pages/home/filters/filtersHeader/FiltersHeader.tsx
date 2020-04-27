import Tooltip from '@material-ui/core/Tooltip';
import React, { useContext } from 'react';
import { IoIosAdd, IoMdOptions } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FilterContext } from '../../../../../context/GetAndFilterEvents';
import { AppState } from '../../../../../state/allReducers';
import Button from '../../../../universalComponents/Button';

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
          <Button
            className="hoverRed"
            margin="0 5px"
            onClick={() => handleChangeFilters(filters.name, 'name')}
          >
            {filters.name}
            ...
          </Button>
        ) : null}

        {filters.province ? (
          <Button
            className="hoverRed"
            margin="0 5px"
            onClick={() => handleChangeFilters(filters.province, 'province')}
          >
            {filters.province}
          </Button>
        ) : null}

        {filters.timeFromTo[0] !== 7 * 24 * 2 || filters.timeFromTo[1] !== 38 * 24 * 2 ? (
          <Button
            className="hoverRed"
            margin="0 5px"
            onClick={() => handleChangeDate({}, [7 * 24 * 2, 38 * 24 * 2])}
          >
            data filter
          </Button>
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
            Ilość:
            {eventsFiltered.length}
          </Count>
        ) : null}

        <Button
          margin="0 5px"
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

const Count = styled.div`
  height: 35px;
  padding: 5px;
  color: ${(props) => props.theme.colors.textPrimary};
  margin: 0 5px;
  display: flex;
  align-items: center;
  letter-spacing: 1px;
`;

const LinkUser = styled(Link)`
  border: none;
  color: ${(props) => props.theme.colors.textSecondary};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  &:hover {
    color: ${(props) => props.theme.colors.hover};
  }
`;

const IoIosAddStyled = styled(IoIosAdd)`
  font-size: 30px;
`;
const Wraper = styled.div`
  display: flex;
  align-items: center;
`;
