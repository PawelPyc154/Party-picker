import Tooltip from '@material-ui/core/Tooltip';
import React, { useContext } from 'react';
import { IoIosAdd, IoMdOptions } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FilterContext } from '../../../../context/GetAndFilterEvents';
import { AppState } from '../../../../../state/allReducers';
import Button from '../../../../shared/Button';

export interface FiltersHeaderProps {
  openFilterOptions: boolean;
  handleOpenFilterOptions: () => void;
}

const FiltersHeader: React.FC<FiltersHeaderProps> = ({ openFilterOptions, handleOpenFilterOptions }) => {
  const { user } = useSelector((state: AppState) => state.AuthReducer);
  const { filters, handleChangeFilters, handleChangeDate } = useContext(FilterContext);

  const cropString = (string: string): string => {
    if (string.length <= 9) return string;
    return `${string.slice(0, 9)}...`;
  };
  return (
    <>
      <Wraper>
        {filters.name ? (
          <Tooltip title="Usuń filter">
            <Button className="hoverRed" margin="0 5px" onClick={() => handleChangeFilters(filters.name, 'name')}>
              {cropString(filters.name)}
            </Button>
          </Tooltip>
        ) : null}

        {filters.province ? (
          <Tooltip title="Usuń filter">
            <Button
              className="hoverRed"
              margin="0 5px"
              onClick={() => handleChangeFilters(filters.province, 'province')}
            >
              {cropString(filters.province)}
            </Button>
          </Tooltip>
        ) : null}

        {filters.timeFromTo[0] !== 7 * 24 * 2 || filters.timeFromTo[1] !== 38 * 24 * 2 ? (
          <Tooltip title="Usuń filter">
            <Button className="hoverRed" margin="0 5px" onClick={() => handleChangeDate({}, [7 * 24 * 2, 38 * 24 * 2])}>
              data
            </Button>
          </Tooltip>
        ) : null}
      </Wraper>
      <Wraper>
        {user ? (
          <Tooltip title="Dodaj wydarzenie" aria-label="add event">
            <LinkUser to="/add-event">
              <IoIosAddStyled />
            </LinkUser>
          </Tooltip>
        ) : null}

        <Button
          margin="0 5px 0 0"
          onClick={() => handleOpenFilterOptions()}
          className={openFilterOptions ? 'isOpen' : ''}
        >
          <IoMdOptionsStyled />
          Filtry
        </Button>
      </Wraper>
    </>
  );
};

export default FiltersHeader;

const Wraper = styled.div`
  display: flex;
  align-items: center;
`;
const IoMdOptionsStyled = styled(IoMdOptions)`
  font-size: 20px;
  margin-right: 5px;
`;
const LinkUser = styled(Link)`
  border: none;
  color: ${({ theme }) => theme.colors.textSecondary};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  &:hover {
    color: ${({ theme }) => theme.colors.hover};
  }
`;
const IoIosAddStyled = styled(IoIosAdd)`
  font-size: 30px;
`;
