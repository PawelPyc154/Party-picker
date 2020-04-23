import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import Navigation from './navigation/Navigation';
import Content from './content/Content';
import { getEvents } from '../state/events/action';
import media from '../utils/MediaQueries';
import { loadUser } from '../state/auth/action';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEvents());
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <AppContainer>
        <Navigation />
        <Content />
      </AppContainer>
    </Router>
  );
}

export default App;

const AppContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #181818;
  ${media.tablet} {
    height: 100vh;
  }
`;
