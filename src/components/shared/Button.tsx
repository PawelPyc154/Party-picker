import styled from 'styled-components';

interface ButtonProps {
  margin?: string;
}

const Button = styled.button<ButtonProps>`
  justify-self: flex-end;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.colors.layout};
  border-radius: 0;
  height: 35px;
  padding: 5px;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: ${({ margin }) => margin};
  display: flex;
  align-items: center;
  cursor: pointer;
  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.hover};
    color: ${({ theme }) => theme.colors.hover};
  }
  &.isOpen {
    border: 1px solid ${({ theme }) => theme.colors.hover};
    color: ${({ theme }) => theme.colors.hover};
  }
`;
export default Button;
