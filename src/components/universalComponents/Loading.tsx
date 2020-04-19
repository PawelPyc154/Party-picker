import React from 'react';
import Loader from 'react-loader-spinner';

import styled from 'styled-components';

export interface LoadingProps {
  height?: number;
  width?: number;
}

const Loading: React.SFC<LoadingProps> = ({ height = 80, width = 80 }) => (
  <Container>
    <Loader type="Audio" color="#3498db" height={height} width={width} />
  </Container>
);

export default Loading;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;
