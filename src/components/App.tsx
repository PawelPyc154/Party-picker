import { SnackbarProvider } from 'notistack';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import GetAndFilterEventContext from './context/GetAndFilterEvents';
import StyleVariableContext from './context/StyleVariable';

import { loadUser } from '../state/auth/action';
import { getEvents } from '../state/events/action';

import Map from './layout/map/Map';
import Navigation from './layout/navigation/Navigation';
import Pages from './pages/Pages';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEvents());
    dispatch(loadUser());
  }, [dispatch]);


  return (
    <Router basename={process.env.PUBLIC_URL}>
      <StyleVariableContext>
        <GlobalStyle />
        <SnackbarProvider maxSnack={3}>
          <AppContainer>
            <Navigation />
            <GetAndFilterEventContext>
              <ContentWraper>
                <Map />
                <Pages />

              </ContentWraper>
            </GetAndFilterEventContext>
          </AppContainer>
        </SnackbarProvider>
      </StyleVariableContext>
    </Router>
  );
}

export default App;

const GlobalStyle = createGlobalStyle`
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html {
  font-size: 62.5%;
}
body {
  color:${({ theme }) => theme.colors.textPrimary};
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.colors.backgroundSecondary};
  font-size: 1.6rem;
}
input:focus,
select:focus,
textarea:focus,
button:focus {
  outline: none;
}
a {
  text-decoration: none;
}
span[data-index='1'] + .MuiSlider-markLabel {
  ${({ theme }) => theme.mq.md} {
    transform: translate(-50%, -12px);
  }
}
.hoverRed {
  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.hoverDelete} !important;
    color: ${({ theme }) => theme.colors.hoverDelete} !important;  
  }
}
.errorInput {
  border: 1px solid ${({ theme }) => theme.colors.error} !important;
}
`;
const AppContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.backgroundPrimary};
  ${({ theme }) => theme.mq.md} {
    height: 100vh;
  }
`;
const ContentWraper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 50vh 1fr;
  margin: 50px 6px 0px 5px;
  overflow: hidden;
  ${({ theme }) => theme.mq.md} {
    grid-template-columns: repeat(2, 50vw);
    grid-template-rows: calc(100vh - 50px);
    margin: 0;
    padding-top: 50px;
  }
`;
