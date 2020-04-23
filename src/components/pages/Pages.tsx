import React, { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';

import Loading from '../../universalComponents/Loading';
import Home from './home/Home';
import PrivateRoute from '../../universalComponents/PrivateRoute';

const LoginSignup = React.lazy(() => import('./loginSignup/LoginSignup'));
const Contact = React.lazy(() => import('./contact/Contact'));
const AddEvent = React.lazy(() => import('./addEvent/AddEvent'));
const User = React.lazy(() => import('./user/User'));

export interface PagesProps {}

const Pages: React.SFC<PagesProps> = () => (
  <Suspense fallback={<Loading />}>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login-signup" component={LoginSignup} />
      <Route path="/contact" component={Contact} />
      <Route path="/user" component={User} />
      <PrivateRoute path="/add-event" component={AddEvent} />
    </Switch>
  </Suspense>
);

export default Pages;
