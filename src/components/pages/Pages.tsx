import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import Loading from '../universalComponents/Loading';
import PrivateRoute from '../universalComponents/PrivateRoute';
import Home from './home/Home';

const LoginSignup = React.lazy(() => import('./loginSignup/LoginSignup'));
const Contact = React.lazy(() => import('./contact/Contact'));
const AddEvent = React.lazy(() => import('./addEvent/AddEvent'));
const UpdateEvent = React.lazy(() => import('./updateEvent/UpdateEvent'));
const User = React.lazy(() => import('./user/User'));
const EventView = React.lazy(() => import('./eventView/EventView'));

export interface PagesProps {}

const Pages: React.FC<PagesProps> = () => (
  <Suspense fallback={<Loading />}>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login-signup" component={LoginSignup} />
      <Route path="/contact" component={Contact} />
      <Route path="/user" component={User} />
      <Route path="/events/:event" component={EventView} />
      <PrivateRoute path="/add-event" component={AddEvent} />
      <PrivateRoute path="/update-event/:eventID" component={UpdateEvent} />
    </Switch>
  </Suspense>
);

export default Pages;
