import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import GetAndFilterEventContext from '../context/GetAndFilterEvents';
import Navigation from './layout/navigation/Navigation';

import { getEvents } from '../state/events/action';
import media from '../utils/MediaQueries';
import { loadUser } from '../state/auth/action';
import Pages from './pages/Pages';
import Map from './layout/map/Map';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEvents());
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <GetAndFilterEventContext>
        <AppContainer>
          <Navigation />
          <ContentWraper>
            <Map />
            <Pages />
          </ContentWraper>
        </AppContainer>
      </GetAndFilterEventContext>
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

const ContentWraper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 50vh 1fr;
  margin: 50px 6px 0px 5px;
  overflow: hidden;
  ${media.tablet} {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: calc(100vh - 50px);
    margin: 0;
    padding-top: 50px;
  }
`;
