import React, { Suspense } from 'react';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';

import Map from './map/Map';
import Home from './pages/home/Home';
import media from '../../utils/MediaQueries';
import GetAndFilterEvent from './getAndFilterEvent/GetAndFilterEvents';
import Loading from '../universalComponents/Loading';
import PrivateRoute from '../universalComponents/PrivateRoute';

const LoginSignup = React.lazy(() => import('./pages/loginSignup/LoginSignup'));
const Contact = React.lazy(() => import('./pages/contact/Contact'));
const AddEvent = React.lazy(() => import('./pages/addEvent/AddEvent'));
const User = React.lazy(() => import('./pages/user/User'));

export interface ContentProps {}

const Content: React.SFC<ContentProps> = () => (
  <GetAndFilterEvent>
    <ContentContainer>
      <Map />
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login-signup" component={LoginSignup} />
          <Route path="/contact" component={Contact} />
          <Route path="/user" component={User} />
          <PrivateRoute path="/add-event" component={AddEvent} />
          {/* <Route path="/add-event" component={AddEvent} /> */}
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
  margin: 50px 6px 0px 5px;
  overflow: hidden;
  ${media.tablet} {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: calc(100vh - 50px);
    margin: 0;
    padding-top: 50px;
  }
`;
