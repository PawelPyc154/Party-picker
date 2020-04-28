import React, { useContext } from 'react';
import Loader from 'react-loader-spinner';
import styled, { ThemeContext } from 'styled-components';

export interface LoadingProps {
  height?: number;
  width?: number;
}

const Loading: React.SFC<LoadingProps> = ({ height = 80, width = 80 }) => {
  const themeContext = useContext(ThemeContext);

  return (
    <Container>
      <Loader type="Audio" color={themeContext.colors.layout} height={height} width={width} />
    </Container>
  );
};

export default Loading;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;
