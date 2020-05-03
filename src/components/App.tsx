import { SnackbarProvider } from 'notistack';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import styled from 'styled-components';
import GetAndFilterEventContext from '../context/GetAndFilterEvents';
import StyleVariableContext from '../context/StyleVariable';
import { AppState } from '../state/allReducers';
import { loadUser } from '../state/auth/action';
import { getEvents } from '../state/events/action';
import media from '../utils/MediaQueries';
import Chat from './layout/chat/Chat';
import Map from './layout/map/Map';
import Navigation from './layout/navigation/Navigation';
import Pages from './pages/Pages';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEvents());

    dispatch(loadUser());
  }, [dispatch]);
  const { user } = useSelector((state: AppState) => state.AuthReducer);

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <StyleVariableContext>
        <SnackbarProvider maxSnack={3}>
          <AppContainer>
            <Navigation />
            <GetAndFilterEventContext>
              <ContentWraper>
                <Map />
                <Pages />
                {user ? <Chat /> : null}
              </ContentWraper>
            </GetAndFilterEventContext>
          </AppContainer>
        </SnackbarProvider>
      </StyleVariableContext>
    </Router>
  );
}

export default App;

const AppContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: ${(props) => props.theme.colors.backgroundPrimary};
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
    grid-template-columns: repeat(2, 50vw);
    grid-template-rows: calc(100vh - 50px);
    margin: 0;
    padding-top: 50px;
  }
`;
