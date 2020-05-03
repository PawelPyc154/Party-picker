import Tooltip from '@material-ui/core/Tooltip';
import React from 'react';
import { FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export interface UpdateProps {
  eventId: string;
}

const Update: React.FC<UpdateProps> = ({ eventId }) => (
  <Tooltip title="Edytuj wydarzenie">
    <LinkUpdate to={`/update-event/${eventId}`}>
      <FaEditStyled />
    </LinkUpdate>
  </Tooltip>
);
export default Update;

const LinkUpdate = styled(Link)`
  border: none;

  color: ${(props) => props.theme.colors.textSecondary};
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 5px;
  left: 6px;
  height: 40px;
  width: 40px;
  cursor: pointer;
  &:hover {
    color: ${(props) => props.theme.colors.hover};
  }
`;

const FaEditStyled = styled(FaEdit)`
  font-size: 18px;
`;