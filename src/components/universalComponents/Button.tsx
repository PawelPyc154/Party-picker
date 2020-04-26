import styled from 'styled-components';

interface ButtonProps {
  margin?: string;
}

const Button = styled.button<ButtonProps>`
  justify-self: flex-end;
  background-color: transparent;
  border: 1px solid #3498db;
  border-radius: 0;
  height: 35px;
  padding: 5px;
  color: #3498db;
  margin: ${(props) => props.margin};
  display: flex;
  align-items: center;
  cursor: pointer;
  &:hover {
    border: 1px solid white;
    color: white;
  }
`;
export default Button;
