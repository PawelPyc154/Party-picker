import React from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';
import styled from 'styled-components';

export interface LoaderProps {}

const Loader: React.SFC<LoaderProps> = () => (
  <Container>
    <CircularProgress />
  </Container>
);

export default Loader;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
