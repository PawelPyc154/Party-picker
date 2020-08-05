import Tooltip from '@material-ui/core/Tooltip';
import React from 'react';
import { BsArrowsFullscreen } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export interface ViewEventProps {
  eventId: string;
}

const ViewEvent: React.FC<ViewEventProps> = ({ eventId }) => (
  <Tooltip title="Sprawdz szczegóły">
    <LinkUpdate to={`/events/${eventId}`}>
      <BsArrowsFullscreenIcone />
    </LinkUpdate>
  </Tooltip>
);
export default ViewEvent;

const LinkUpdate = styled(Link)`
  border: none;

  color: ${({ theme }) => theme.colors.textSecondary};
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 5px;
  left: 4px;
  height: 40px;
  width: 40px;
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.colors.hover};
  }
`;

const BsArrowsFullscreenIcone = styled(BsArrowsFullscreen)`
  font-size: 18px;
`;
