import styled from 'styled-components';

interface ButtonProps {
  margin?: string;
}

const Button = styled.button<ButtonProps>`
  justify-self: flex-end;
  background-color: transparent;
  border: 1px solid ${(props) => props.theme.colors.layout};
  border-radius: 0;
  height: 35px;
  padding: 5px;
  color: ${(props) => props.theme.colors.textSecondary};
  margin: ${(props) => props.margin};
  display: flex;
  align-items: center;
  cursor: pointer;
  &:hover {
    border: 1px solid ${(props) => props.theme.colors.hover};
    color: ${(props) => props.theme.colors.hover};
  }
`;
export default Button;
