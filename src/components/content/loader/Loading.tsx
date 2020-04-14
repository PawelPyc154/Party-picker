import React from 'react';
import Loader from 'react-loader-spinner';

import styled from 'styled-components';

export interface LoadingProps {}

const Loading: React.SFC<LoadingProps> = () => (
  <Container>
    <Loader type="Audio" color="#3498db" height={80} width={80} />
  </Container>
);

export default Loading;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;
