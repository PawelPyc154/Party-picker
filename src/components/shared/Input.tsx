import { motion } from 'framer-motion';
import styled from 'styled-components';

interface InputProps {
  margin?: string;
}
const Input = styled(motion.input)<InputProps>`
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  height: 35px;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: ${({ margin }) => margin || '0 0px 15px 0px'};
  border: none;
  border: 1px solid ${({ theme }) => theme.colors.layout};
  padding: 0 5px;
  font-size: 16px;
  width: 100%;
  &:hover,
  &:focus {
    outline: none;
    border: 1px solid ${({ theme }) => theme.colors.hover};
  }
`;

export default Input;
