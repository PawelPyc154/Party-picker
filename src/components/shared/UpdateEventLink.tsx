import Tooltip from '@material-ui/core/Tooltip';
import React from 'react';
import { FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export interface UpdateEventLinkProps {
  eventId: string;
}

const UpdateEventLink: React.FC<UpdateEventLinkProps> = ({ eventId }) => (
  <Tooltip title="Edytuj wydarzenie">
    <LinkUpdate to={`/update-event/${eventId}`}>
      <FaEditStyled />
    </LinkUpdate>
  </Tooltip>
);
export default UpdateEventLink;

const LinkUpdate = styled(Link)`
  z-index: ${({ theme }) => theme.zIndex.level1};
  border: none;
  color: ${({ theme }) => theme.colors.textSecondary};
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 36px;
  left: 6px;
  height: 40px;
  width: 40px;
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.colors.hover};
  }
`;

const FaEditStyled = styled(FaEdit)`
  font-size: 18px;
`;
