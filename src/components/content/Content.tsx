import React, { Suspense } from 'react';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';

import Map from './map/Map';
import Home from './pages/home/Home';
import media from '../../utils/MediaQueries';
import GetAndFilterEvent from './getAndFilterEvent/GetAndFilterEvents';
import Loading from './loader/Loading';

const Login = React.lazy(() => import('./pages/login/Login'));
const Register = React.lazy(() => import('./pages/register/Register'));
const Contact = React.lazy(() => import('./pages/contact/Contact'));

export interface ContentProps {}

const Content: React.SFC<ContentProps> = () => (
  <GetAndFilterEvent>
    <ContentContainer>
      <Map />
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/add-event">
            <Home />
          </Route>
          <Route path="/contact">
            <Contact />
          </Route>
        </Switch>
      </Suspense>
    </ContentContainer>
  </GetAndFilterEvent>
);

export default Content;

const ContentContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 50vh auto;
  margin: 15px 6px 0px 5px;

  ${media.tablet} {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: calc(100vh - 50px);
    margin: 0;
  }
`;
