import Tooltip from '@material-ui/core/Tooltip';
import React from 'react';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export interface BackLinkProps {}

const BackLink: React.FC<BackLinkProps> = () => (
  <Tooltip title="Cofnij">
    <LinkBack to="/">
      <IoMdArrowRoundBackIcone />
    </LinkBack>
  </Tooltip>
);
export default BackLink;

const LinkBack = styled(Link)`
  z-index: ${({ theme }) => theme.zIndex.level1};
  border: none;
  color: ${({ theme }) => theme.colors.textSecondary};
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 5px;
  left: 5px;
  height: 40px;
  width: 40px;
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.colors.hover};
  }
`;
const IoMdArrowRoundBackIcone = styled(IoMdArrowRoundBack)`
  font-size: 22px;
`;
